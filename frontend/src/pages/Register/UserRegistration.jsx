import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/Forms/Input";
import Button from "../../components/Buttons/Button";
import "../Login/Login.css";

function UserRegistration() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

    async function handleCadastro(event) {
        event.preventDefault();

        setErro("");

        if (senha !== confirmarSenha) {
            setErro("As senhas não são iguais!");
            return;
        }

        setCarregando(true);

        try {
            const resposta = await fetch(
                "http://localhost:8080/api/administradores",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nome: nome,
                        email: email,
                        senha: senha
                    })
                }
            );

            if (!resposta.ok) {
                let mensagem = "Não foi possível realizar o cadastro.";

                try {
                    const dadosErro = await resposta.json();

                    if (typeof dadosErro === "object") {
                        mensagem = Object.values(dadosErro).join(" ");
                    }
                } catch {
                    // Mantém a mensagem padrão caso a resposta não seja JSON
                }

                throw new Error(mensagem);
            }

            alert("Cadastro realizado com sucesso!");

            navigate("/login");

        } catch (erro) {
            setErro(erro.message);
        } finally {
            setCarregando(false);
        }
    }

    function voltarLogin() {
        navigate("/login");
    }

    return (
        <div className="login-container">
            <div className="login-card">

                <h1>Gerenciador de Eventos</h1>

                <h2>Cadastrar-se</h2>

                <form onSubmit={handleCadastro}>

                    <Input
                        label="Nome"
                        type="text"
                        id="nome"
                        placeholder="Digite seu nome"
                        value={nome}
                        onChange={(event) =>
                            setNome(event.target.value)
                        }
                        required
                    />

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

                    <Input
                        label="Confirmar senha"
                        type="password"
                        id="confirmarSenha"
                        placeholder="Digite a senha novamente"
                        value={confirmarSenha}
                        onChange={(event) =>
                            setConfirmarSenha(event.target.value)
                        }
                        required
                    />

                    {erro && (
                        <p className="campo-erro">
                            {erro}
                        </p>
                    )}

                    <Button
                        type="submit"
                        className="btn-primary"
                        disabled={carregando}
                    >
                        {carregando ? "Cadastrando..." : "Criar Conta"}
                    </Button>

                    <Button
                        type="button"
                        className="btn-register"
                        onClick={voltarLogin}
                    >
                        Voltar para Login
                    </Button>

                </form>

            </div>
        </div>
    );
}

export default UserRegistration;