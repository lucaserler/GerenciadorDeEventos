import AsyncStorage from "@react-native-async-storage/async-storage";

// Endereço do backend
const API_URL = "http://192.168.1.110:8080/api";

// Lista os eventos do administrador autenticado
export async function listarEventos() {

    const token = await AsyncStorage.getItem("token");

    const resposta = await fetch(`${API_URL}/eventos`, {
        method: "GET",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!resposta.ok) {

        if (resposta.status === 401 || resposta.status === 403) {
            throw new Error(
                "Sua sessão expirou ou não é válida."
            );
        }

        throw new Error(
            "Não foi possível carregar os eventos."
        );
    }

    return await resposta.json();
}

// Cria um novo evento
export async function criarEvento(evento) {

    const token = await AsyncStorage.getItem("token");

    if (!token) {
        throw new Error(
            "Token de autenticação não encontrado."
        );
    }

    const resposta = await fetch(`${API_URL}/eventos`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify(evento)
    });

    if (!resposta.ok) {

        let mensagem = "Não foi possível criar o evento.";

        try {
            const dadosErro = await resposta.json();

            if (dadosErro.mensagem) {
                mensagem = dadosErro.mensagem;
            }

        } catch {
            // Mantém a mensagem padrão.
        }

        if (resposta.status === 401 || resposta.status === 403) {
            mensagem = "Sua sessão expirou ou não é válida.";
        }

        throw new Error(mensagem);
    }

    return await resposta.json();
}

// Atualiza um evento existente
export async function atualizarEvento(id, evento) {

    const token = await AsyncStorage.getItem("token");

    if (!token) {
        throw new Error(
            "Token de autenticação não encontrado."
        );
    }

    console.log("Iniciando PUT do evento:", id);

    console.log("URL:", `${API_URL}/eventos/${id}`);

    const resposta = await fetch(`${API_URL}/eventos/${id}`, {
        method: "PUT",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify(evento)
    });

    console.log("Resposta recebida da API.");

    console.log("Status HTTP:", resposta.status);

    console.log("Status OK:", resposta.ok);

    if (!resposta.ok) {

        let mensagem = "Não foi possível atualizar o evento.";

        try {

            const dadosErro = await resposta.json();

            console.log("Dados do erro:", dadosErro);

            if (dadosErro.mensagem) {
                mensagem = dadosErro.mensagem;
            }

        } catch {
            console.log(
                "A API não retornou um JSON de erro."
            );
        }

        if (resposta.status === 401 || resposta.status === 403) {
            mensagem = "Sua sessão expirou ou não é válida.";
        }

        throw new Error(mensagem);
    }

    if (resposta.status === 204) {

        console.log(
            "Evento atualizado. API retornou 204."
        );

        return null;
    }

    const textoResposta = await resposta.text();

    console.log("Corpo da resposta:", textoResposta);

    if (!textoResposta) {
        return null;
    }

    return JSON.parse(textoResposta);
}

// Exclui um evento existente
export async function excluirEvento(id) {

    const token = await AsyncStorage.getItem("token");

    if (!token) {
        throw new Error(
            "Token de autenticação não encontrado."
        );
    }

    const resposta = await fetch(`${API_URL}/eventos/${id}`, {
        method: "DELETE",

        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!resposta.ok) {

        let mensagem = "Não foi possível excluir o evento.";

        try {
            const dadosErro = await resposta.json();

            if (dadosErro.mensagem) {
                mensagem = dadosErro.mensagem;
            }

        } catch {
            // Mantém a mensagem padrão.
        }

        if (resposta.status === 401 || resposta.status === 403) {
            mensagem = "Sua sessão expirou ou não é válida.";
        }

        throw new Error(mensagem);
    }

    return true;
}