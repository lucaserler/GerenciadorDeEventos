
import { useEffect, useState } from "react";
import {
    listarEventos,
    criarEvento,
    atualizarEvento,
    excluirEvento as apiExcluirEvento
} from "../../services/eventService";

import Sidebar from "../../components/Sidebar/sidebar";
import Button from "../../components/Buttons/Button";
import EventModal from "./components/EventModal";
import "./Events.css";

function Eventos() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [eventoEditando, setEventoEditando] = useState(null);

    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        async function carregarEventos() {
            try {
                const eventosDoBackend = await listarEventos();

                setEventos(eventosDoBackend);
            } catch (erro) {
                console.error("Erro ao carregar eventos:", erro);
            }
        }

        carregarEventos();
    }, []);

    const [formulario, setFormulario] = useState({
        nome: "",
        descricao: "",
        data: "",
        horario: "",
        local: "",
        imagem: ""
    });

    function limparFormulario() {
        setFormulario({
            nome: "",
            descricao: "",
            data: "",
            horario: "",
            local: "",
            imagem: ""
        });

        setEventoEditando(null);
    }

    function fecharModal() {
        setMostrarFormulario(false);
        limparFormulario();
    }

    async function salvarEvento(event) {
        event.preventDefault();

        try {
            const eventoParaEnviar = {
                nome: formulario.nome,
                descricao: formulario.descricao,
                data: formulario.data,
                horario: formulario.horario,
                local: formulario.local
            };

            if (eventoEditando !== null) {
                const eventoAtual = eventos[eventoEditando];

                const eventoAtualizado = await atualizarEvento(
                    eventoAtual.id,
                    eventoParaEnviar
                );

                const novosEventos = [...eventos];

                novosEventos[eventoEditando] = eventoAtualizado;

                setEventos(novosEventos);
            } else {
                const novoEvento = await criarEvento(eventoParaEnviar);

                setEventos([
                    ...eventos,
                    novoEvento
                ]);
            }

            fecharModal();
        } catch (erro) {
            console.error("Erro ao salvar evento:", erro);

            alert("Não foi possível salvar o evento.");
        }
    }

    function editarEvento(index) {
        setEventoEditando(index);
        setFormulario(eventos[index]);
        setMostrarFormulario(true);
    }

async function excluirEvento(index) {
    const evento = eventos[index];

    if (!evento || !evento.id) {
        alert("Não foi possível identificar o evento.");
        return;
    }

    const confirmar = window.confirm(
        `Deseja realmente excluir o evento "${evento.nome}"?`
    );

    if (!confirmar) {
        return;
    }

    try {
        await apiExcluirEvento(evento.id);

        setEventos(
            eventos.filter((_, indice) => indice !== index)
        );
    } catch (erro) {
        console.error("Erro ao excluir evento:", erro);

        alert("Não foi possível excluir o evento.");
    }
}

    function abrirNovoEvento() {
        limparFormulario();
        setMostrarFormulario(true);
    }

    return (
        <div className="dashboard">
            <Sidebar />

            <main className="dashboard-content">
                <div className="page-header">
                    <div>
                        <h1>Eventos</h1>
                        <p>
                            Gerencie os eventos cadastrados no sistema.
                        </p>
                    </div>

                    <Button
                        className="btn-primary"
                        onClick={abrirNovoEvento}
                    >
                        + Novo Evento
                    </Button>
                </div>

                {mostrarFormulario && (
                    <EventModal
                        formulario={formulario}
                        setFormulario={setFormulario}
                        eventoEditando={eventoEditando}
                        salvarEvento={salvarEvento}
                        fecharModal={fecharModal}
                    />
                )}

                <div className="eventos-lista">
                    {eventos.length === 0 ? (
                        <p>Nenhum evento cadastrado.</p>
                    ) : (
                        eventos.map((evento, index) => (
                            <div className="evento-card" key={index}>
                                {evento.imagem && (
                                    <img
                                        className="evento-imagem"
                                        src={evento.imagem}
                                        alt={`Imagem do evento ${evento.nome}`}
                                    />
                                )}
                                <h2>{evento.nome}</h2>

                                <p>{evento.descricao}</p>

                                <p>
                                    <strong>Data:</strong>{" "}
                                    {evento.data}
                                </p>

                                <p>
                                    <strong>Horário:</strong>{" "}
                                    {evento.horario}
                                </p>

                                <p>
                                    <strong>Local:</strong>{" "}
                                    {evento.local}
                                </p>

                                <div className="evento-actions">
                                    <Button
                                        type="button"
                                        className="btn-edit"
                                        onClick={() =>
                                            editarEvento(index)
                                        }
                                    >
                                        Editar
                                    </Button>

                                    <Button
                                        type="button"
                                        className="btn-delete"
                                        onClick={() =>
                                            excluirEvento(index)
                                        }
                                    >
                                        Excluir
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}

export default Eventos;