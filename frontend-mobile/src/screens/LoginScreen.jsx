import { useState } from "react";

import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Alert
} from "react-native";

import { realizarLogin } from "../services/authService";

function LoginScreen({ navigation }) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

    async function handleLogin() {

        setErro("");

        if (!email || !senha) {
            setErro("Informe o e-mail e a senha.");
            return;
        }

        setCarregando(true);

        try {

            await realizarLogin(email, senha);

            navigation.replace("Events");

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
                Login
            </Text>

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

            {erro !== "" && (
                <Text style={styles.error}>
                    {erro}
                </Text>
            )}

            <Pressable
                style={styles.button}
                onPress={handleLogin}
                disabled={carregando}
            >
                <Text style={styles.buttonText}>
                    {carregando ? "Entrando..." : "Entrar"}
                </Text>
            </Pressable>

            <Pressable
                style={styles.secondaryButton}
                onPress={() => navigation.navigate("Register")}
            >
                <Text style={styles.secondaryButtonText}>
                    Criar Conta
                </Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        padding: 24
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 12
    },

    subtitle: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 32
    },

    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
        marginTop: 12
    },

    input: {
        borderWidth: 1,
        borderColor: "#cbd5e1",
        borderRadius: 8,
        padding: 14,
        fontSize: 16
    },

    error: {
        color: "#dc2626",
        marginTop: 16,
        fontSize: 14
    },

    button: {
        backgroundColor: "#2563eb",
        borderRadius: 8,
        padding: 16,
        alignItems: "center",
        marginTop: 24
    },

    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold"
    },

    secondaryButton: {
        borderWidth: 1,
        borderColor: "#2563eb",
        borderRadius: 8,
        padding: 16,
        alignItems: "center",
        marginTop: 12
    },

    secondaryButtonText: {
        color: "#2563eb",
        fontSize: 16,
        fontWeight: "bold"
    }

});

export default LoginScreen;