
import { useState } from "react";

import Sidebar from "../../components/Sidebar/sidebar";
import Button from "../../components/Buttons/Button";
import EventModal from "./components/EventModal";
import "./Events.css";

function Eventos() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [eventos, setEventos] = useState([]);
    const [eventoEditando, setEventoEditando] = useState(null);

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

    function salvarEvento(event) {
        event.preventDefault();

        if (eventoEditando !== null) {
            const novosEventos = [...eventos];

            novosEventos[eventoEditando] = formulario;

            setEventos(novosEventos);
        } else {
            setEventos([
                ...eventos,
                formulario
            ]);
        }

        fecharModal();
    }

    function editarEvento(index) {
        setEventoEditando(index);
        setFormulario(eventos[index]);
        setMostrarFormulario(true);
    }

    function excluirEvento(index) {
        const novosEventos = eventos.filter(
            (_, i) => i !== index
        );

        setEventos(novosEventos);
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