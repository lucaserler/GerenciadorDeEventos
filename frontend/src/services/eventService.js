const API_URL = "http://localhost:8080/api/eventos";

export async function listarEventos() {
    const resposta = await fetch(API_URL);

    if (!resposta.ok) {
        throw new Error("Erro ao buscar eventos.");
    }

    return await resposta.json();
}


export async function criarEvento(evento) {
    const resposta = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(evento)
    });

    if (!resposta.ok) {
        const erros = await resposta.json();

        const erro = new Error("Erro ao criar evento.");

        erro.detalhes = erros;

        throw erro;
    }

    return await resposta.json();
}

export async function atualizarEvento(id, evento) {
    const resposta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(evento)
    });

    if (!resposta.ok) {
        throw new Error("Erro ao atualizar evento.");
    }

    return await resposta.json();
}

export async function excluirEvento(id) {
    const resposta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!resposta.ok) {
        throw new Error("Erro ao excluir evento.");
    }
}