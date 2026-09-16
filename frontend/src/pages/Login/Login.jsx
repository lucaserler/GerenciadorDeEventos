import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/Forms/Input";
import Button from "../../components/Buttons/Button";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [gravarSenha, setGravarSenha] = useState(false);

  const navigate = useNavigate();

  // Carrega os dados salvos quando a tela abrir
  useEffect(() => {
    const dadosSalvos = localStorage.getItem("loginSalvo");

    if (dadosSalvos) {
      const dados = JSON.parse(dadosSalvos);

      setEmail(dados.email);
      setSenha(dados.senha);
      setGravarSenha(true);
    }
  }, []);

  function handleLogin(event) {
    event.preventDefault();

    const usuariosSalvos =
      JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuariosSalvos.find(
      (usuario) =>
        usuario.email === email &&
        usuario.senha === senha
    );

    if (usuario) {

      if (gravarSenha) {
        const dadosLogin = {
          email: email,
          senha: senha
        };

        localStorage.setItem(
          "loginSalvo",
          JSON.stringify(dadosLogin)
        );
      } else {
        localStorage.removeItem("loginSalvo");
      }

      localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(usuario)
      );

      navigate("/events");

    } else {
      alert("E-mail ou senha inválidos!");
    }
  }

  function handleCadastro() {
    navigate("/cadastro");
  }

  return (
    <div className="login-container">
      <div className="login-card">

        <h1>Gerenciador de Eventos</h1>
        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          <Input
            label="E-mail"
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />

          <Input
            label="Senha"
            type="password"
            id="senha"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(event) =>
              setSenha(event.target.value)
            }
            required
          />


          <div className="remember-password">
            <input
              type="checkbox"
              id="gravarSenha"
              checked={gravarSenha}
              onChange={(event) =>
                setGravarSenha(event.target.checked)
              }
            />

            <label htmlFor="gravarSenha">
              Gravar Senha
            </label>
          </div>

          <div className="login-buttons">

            <Button
              type="submit"
              className="btn-primary"
            >
              Entrar
            </Button>

            <Button
              type="button"
              className="btn-register"
              onClick={handleCadastro}
            >
              Cadastrar-se
            </Button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default Login;