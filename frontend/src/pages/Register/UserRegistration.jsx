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

    function handleCadastro(event) {
        event.preventDefault();

        if (senha !== confirmarSenha) {
            alert("As senhas não são iguais!");
            return;
        }

        const usuariosSalvos =
            JSON.parse(localStorage.getItem("usuarios")) || [];

        const usuarioExistente = usuariosSalvos.find(
            (usuario) => usuario.email === email
        );

        if (usuarioExistente) {
            alert("Este e-mail já está cadastrado!");
            return;
        }

        const novoUsuario = {
            nome,
            email,
            senha
        };

        const novosUsuarios = [
            ...usuariosSalvos,
            novoUsuario
        ];

        localStorage.setItem(
            "usuarios",
            JSON.stringify(novosUsuarios)
        );

        alert("Cadastro realizado com sucesso!");

        navigate("/login");
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

                    <Button
                        type="submit"
                        className="btn-primary"
                    >
                        Criar Conta
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