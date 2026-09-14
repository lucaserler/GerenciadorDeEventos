import { useState } from "react";
import Sidebar from "./sidebar";

function Eventos() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [eventos, setEventos] = useState([]);
    const [eventoEditando, setEventoEditando] = useState(null);
    const [formulario, setFormulario] = useState({
        nome: "",
        descricao: "",
        data: "",
        horario: "",
        local: ""
    });


    function salvarEvento(event) {
        event.preventDefault();

        if (eventoEditando !== null) {
            const novosEventos = [...eventos];

            novosEventos[eventoEditando] = formulario;

            setEventos(novosEventos);

            setEventoEditando(null);
        } else {
            setEventos([
                ...eventos,
                formulario
            ]);
        }

        setFormulario({
            nome: "",
            descricao: "",
            data: "",
            horario: "",
            local: ""
        });

        setMostrarFormulario(false);
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

    return (
        <div className="dashboard">
            <Sidebar />

            <main className="dashboard-content">
                <div className="page-header">
                    <div>
                        <h1>Eventos</h1>
                        <p>Gerencie os eventos cadastrados no sistema.</p>
                    </div>

                    <button
                        className="btn-primary"
                        onClick={() => setMostrarFormulario(true)}
                    >
                        + Novo Evento
                    </button>
                </div>

                {mostrarFormulario && (
                    <div className="evento-form">
                        <h2>
                            {eventoEditando !== null
                                ? "Editar Evento"
                                : "Novo Evento"}
                        </h2>

                        <form onSubmit={salvarEvento}>
                            <div className="form-group">
                                <label htmlFor="nome">Nome do evento</label>

                                <input
                                    type="text"
                                    id="nome"
                                    placeholder="Digite o nome do evento"
                                    value={formulario.nome}
                                    onChange={(event) =>
                                        setFormulario({
                                            ...formulario,
                                            nome: event.target.value
                                        })}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="descricao">Descrição</label>

                                <textarea
                                    id="descricao"
                                    placeholder="Digite uma descrição"
                                    rows="4"
                                    value={formulario.descricao}
                                    onChange={(event) =>
                                        setFormulario({
                                            ...formulario,
                                            descricao: event.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="data">Data</label>

                                    <input
                                        type="date"
                                        id="data"
                                        value={formulario.data}
                                        onChange={(event) =>
                                            setFormulario({
                                                ...formulario,
                                                data: event.target.value
                                            })
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="horario">Horário</label>

                                    <input
                                        type="time"
                                        id="horario"
                                        value={formulario.horario}
                                        onChange={(event) =>
                                            setFormulario({
                                                ...formulario,
                                                horario: event.target.value
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="local">Local</label>

                                <input
                                    type="text"
                                    id="local"
                                    placeholder="Digite o local do evento"
                                    value={formulario.local}
                                    onChange={(event) =>
                                        setFormulario({
                                            ...formulario,
                                            local: event.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="form-buttons">
                                <button
                                    type="button"
                                    className="btn-cancel"
                                    onClick={() => setMostrarFormulario(false)}
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className="btn-primary"
                                >
                                    Salvar Evento
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {!mostrarFormulario && (
                    <div className="eventos-lista">
                        {eventos.length === 0 ? (
                            <p>Nenhum evento cadastrado.</p>
                        ) : (
                            eventos.map((evento, index) => (
                                <div className="evento-card" key={index}>
                                    <h2>{evento.nome}</h2>

                                    <p>{evento.descricao}</p>

                                    <p>
                                        <strong>Data:</strong> {evento.data}
                                    </p>

                                    <p>
                                        <strong>Horário:</strong> {evento.horario}
                                    </p>

                                    <p>
                                        <strong>Local:</strong> {evento.local}
                                    </p>
                                    <div className="evento-actions">
                                        <button
                                            className="btn-edit"
                                            onClick={() => editarEvento(index)}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className="btn-delete"
                                            onClick={() => excluirEvento(index)}
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Eventos;