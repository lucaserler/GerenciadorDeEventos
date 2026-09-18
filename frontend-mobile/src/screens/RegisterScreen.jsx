import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet
} from "react-native";

import { useState } from "react";

function RegisterScreen({ navigation }) {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function handleCadastro() {

    console.log("Botão Criar Conta pressionado!");

    setErro("");

    if (
        nome.trim() === "" ||
        email.trim() === "" ||
        senha.trim() === "" ||
        confirmarSenha.trim() === ""
    ) {
        setErro("Preencha todos os campos.");
        return;
    }

    if (senha !== confirmarSenha) {
        setErro("As senhas não são iguais.");
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
                    nome: nome.trim(),
                    email: email.trim(),
                    senha: senha
                })
            }
        );

        if (!resposta.ok) {

            let mensagem =
                "Não foi possível realizar o cadastro.";

            try {

                const dadosErro = await resposta.json();

                if (
                    dadosErro &&
                    typeof dadosErro === "object"
                ) {
                    mensagem = Object.values(dadosErro)
                        .join(" ");
                }

            } catch {
                // Mantém a mensagem padrão
            }

            throw new Error(mensagem);
        }

        setNome("");
        setEmail("");
        setSenha("");
        setConfirmarSenha("");

        alert("Cadastro realizado com sucesso!");

        navigation.navigate("Login");

    } catch (erro) {

        setErro(erro.message);

    } finally {

        setCarregando(false);

    }
}

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Gerenciador de Eventos
            </Text>

            <Text style={styles.subtitle}>
                Criar Conta
            </Text>

            <View style={styles.form}>

                <Text style={styles.label}>
                    Nome
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Digite seu nome"
                    value={nome}
                    onChangeText={setNome}
                />

                <Text style={styles.label}>
                    E-mail
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Digite seu e-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>
                    Senha
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Digite sua senha"
                    secureTextEntry
                    value={senha}
                    onChangeText={setSenha}
                />

                <Text style={styles.label}>
                    Confirmar senha
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Digite a senha novamente"
                    secureTextEntry
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                />

                {erro !== "" && (
                    <Text style={styles.error}>
                        {erro}
                    </Text>
                )}

                <Pressable
                    style={styles.primaryButton}
                    onPress={handleCadastro}
                    disabled={carregando}
                >
                    <Text style={styles.primaryButtonText}>
                        {carregando ? "Cadastrando..." : "Criar Conta"}
                    </Text>
                </Pressable>

                <Pressable
                    style={styles.secondaryButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.secondaryButtonText}>
                        Voltar para Login
                    </Text>
                </Pressable>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
        backgroundColor: "#f5f6fa"
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10
    },

    subtitle: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 28
    },

    form: {
        width: "100%",
        maxWidth: 400,
        alignSelf: "center"
    },

    label: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 6,
        marginTop: 12
    },

    input: {
        height: 48,
        borderWidth: 1,
        borderColor: "#cbd5e1",
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: "#ffffff",
        fontSize: 15
    },

    error: {
        color: "#dc2626",
        marginTop: 16,
        textAlign: "center"
    },

    primaryButton: {
        backgroundColor: "#2563eb",
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 24,
        alignItems: "center"
    },

    primaryButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold"
    },

    secondaryButton: {
        borderWidth: 1,
        borderColor: "#2563eb",
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 12,
        alignItems: "center"
    },

    secondaryButtonText: {
        color: "#2563eb",
        fontSize: 16,
        fontWeight: "bold"
    }

});

export default RegisterScreen;