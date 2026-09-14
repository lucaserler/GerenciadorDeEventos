import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  // function handleLogin(event) {
  //   event.preventDefault();

  //   console.log("E-mail:", email);
  //   console.log("Senha:", senha);
  // }

  function handleLogin(event) {
    event.preventDefault();

    const emailCorreto = "admin@email.com";
    const senhaCorreta = "123456";

    if (email === emailCorreto && senha === senhaCorreta) {
      navigate("/dashboard");
    } else {
      alert("E-mail ou senha inválidos!");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Gerenciador de Eventos</h1>
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>

            <input
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>

            <input
              type="password"
              id="senha"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              required
            />
          </div>

          <button type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;