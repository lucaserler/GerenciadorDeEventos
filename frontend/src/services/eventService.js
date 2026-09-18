const API_URL = "http://localhost:8080/api/eventos";

// Retorna os cabeçalhos com o token JWT
function obterCabecalhosAutenticacao() {

    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}

// Lista os eventos do administrador autenticado
export async function listarEventos() {

    const resposta = await fetch(API_URL, {
        method: "GET",
        headers: obterCabecalhosAutenticacao()
    });

    if (!resposta.ok) {
        throw new Error("Erro ao buscar eventos.");
    }

    return await resposta.json();
}

// Cria um novo evento
export async function criarEvento(evento) {

    const resposta = await fetch(API_URL, {
        method: "POST",
        headers: obterCabecalhosAutenticacao(),
        body: JSON.stringify(evento)
    });

    if (!resposta.ok) {

        let erros;

        try {
            erros = await resposta.json();
        } catch {
            erros = null;
        }

        const erro = new Error("Erro ao criar evento.");

        erro.detalhes = erros;

        throw erro;
    }

    return await resposta.json();
}

// Atualiza um evento
export async function atualizarEvento(id, evento) {

    const resposta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: obterCabecalhosAutenticacao(),
        body: JSON.stringify(evento)
    });

    if (!resposta.ok) {
        throw new Error("Erro ao atualizar evento.");
    }

    return await resposta.json();
}

// Exclui um evento
export async function excluirEvento(id) {

    const resposta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: obterCabecalhosAutenticacao()
    });

    if (!resposta.ok) {
        throw new Error("Erro ao excluir evento.");
    }
}