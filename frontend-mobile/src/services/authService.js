import AsyncStorage from "@react-native-async-storage/async-storage";

// Altere este endereço conforme o ambiente de execução.
const API_URL = "http://192.168.1.110:8080/api";

export async function realizarLogin(email, senha) {
    const resposta = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            senha: senha
        })
    });

    if (!resposta.ok) {
        let mensagem = "Não foi possível realizar o login.";

        try {
            const dadosErro = await resposta.json();

            if (dadosErro.mensagem) {
                mensagem = dadosErro.mensagem;
            }
        } catch {
            // Mantém a mensagem padrão.
        }

        throw new Error(mensagem);
    }

    const dados = await resposta.json();

    await AsyncStorage.setItem("token", dados.token);

    await AsyncStorage.setItem(
        "usuarioLogado",
        JSON.stringify({
            administradorId: dados.administradorId,
            nome: dados.nome,
            email: dados.email
        })
    );

    return dados;
}