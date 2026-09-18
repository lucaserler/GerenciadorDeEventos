
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/Forms/Input";
import Button from "../../components/Buttons/Button";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [gravarEmail, setGravarEmail] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  // Carrega o email salvo quando a tela abrir
  useEffect(() => {
    const emailSalvo = localStorage.getItem("emailLogin");

    if (emailSalvo) {
      setEmail(emailSalvo);
      setGravarEmail(true);
    }
  }, []);

  async function handleLogin(event) {
    event.preventDefault();

    setCarregando(true);

    try {
      const resposta = await fetch(
        "http://localhost:8080/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            senha: senha
          })
        }
      );

      if (!resposta.ok) {
        throw new Error("E-mail ou senha inválidos.");
      }

      const dados = await resposta.json();

      // Salva ou remove somente o email
      if (gravarEmail) {
        localStorage.setItem("emailLogin", email);
      } else {
        localStorage.removeItem("emailLogin");
      }

      // Armazena o token JWT
      localStorage.setItem("token", dados.token);

      // Armazena os dados públicos do administrador
      const usuarioLogado = {
        administradorId: dados.administradorId,
        nome: dados.nome,
        email: dados.email
      };

      localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(usuarioLogado)
      );

      // Redireciona para a página de eventos
      navigate("/events");

    } catch (erro) {
      alert(erro.message);
    } finally {
      setCarregando(false);
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
              id="gravarEmail"
              checked={gravarEmail}
              onChange={(event) =>
                setGravarEmail(event.target.checked)
              }
            />

            <label htmlFor="gravarEmail">
              Lembrar e-mail
            </label>
          </div>

          <div className="login-buttons">

            <Button
              type="submit"
              className="btn-primary"
              disabled={carregando}
            >
              {carregando ? "Entrando..." : "Entrar"}
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