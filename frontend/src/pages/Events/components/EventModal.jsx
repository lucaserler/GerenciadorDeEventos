
import Input from "../../../components/Forms/Input";
import Textarea from "../../../components/Forms/Textarea";
import Button from "../../../components/Buttons/Button";
import "./EventsModal.css";

function EventModal({
    formulario,
    setFormulario,
    eventoEditando,
    salvarEvento,
    fecharModal,
    erros,
    setErros
}) {
    return (
        <div
            className="modal-overlay"
            onClick={fecharModal}
        >
            <div
                className="evento-modal"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                <div className="modal-header">
                    <h2>
                        {eventoEditando !== null
                            ? "Editar Evento"
                            : "Novo Evento"}
                    </h2>

                    <button
                        type="button"
                        className="modal-close"
                        onClick={fecharModal}
                        aria-label="Fechar modal"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={salvarEvento}>
                    <Input
                        label="Nome do evento"
                        type="text"
                        id="nome"
                        placeholder="Digite o nome do evento"
                        value={formulario.nome}

                        onChange={(event) => {
                            setFormulario({
                                ...formulario,
                                nome: event.target.value
                            });

                            setErros((errosAnteriores) => {
                                const novosErros = {
                                    ...errosAnteriores
                                };

                                delete novosErros.nome;

                                return novosErros;
                            });
                        }}
                        required
                    />

                    {erros?.nome && (
                        <p className="campo-erro">
                            {erros.nome}
                        </p>
                    )}

                    <Textarea
                        label="Descrição"
                        id="descricao"
                        placeholder="Digite uma descrição"
                        rows={4}
                        value={formulario.descricao}
                        onChange={(event) =>
                            setFormulario({
                                ...formulario,
                                descricao: event.target.value
                            })
                        }
                    />

                    <div className="form-row">
                        <Input
                            label="Data"
                            type="date"
                            id="data"
                            value={formulario.data}
                            onChange={(event) =>
                                setFormulario({
                                    ...formulario,
                                    data: event.target.value
                                })
                            }
                            required
                        />

                        <Input
                            label="Horário"
                            type="time"
                            id="horario"
                            value={formulario.horario}
                            onChange={(event) =>
                                setFormulario({
                                    ...formulario,
                                    horario: event.target.value
                                })
                            }
                            required
                        />
                    </div>

                    <Input
                        label="Local"
                        type="text"
                        id="local"
                        placeholder="Digite o local do evento"
                        value={formulario.local}
                        onChange={(event) => {
                            setFormulario({
                                ...formulario,
                                local: event.target.value
                            });

                            setErros((errosAnteriores) => {
                                const novosErros = {
                                    ...errosAnteriores
                                };

                                delete novosErros.local;

                                return novosErros;
                            });
                        }}
                        required
                    />

                    {erros?.local && (
                        <p className="campo-erro">
                            {erros.local}
                        </p>
                    )}


                    <div className="form-group">
                        <label htmlFor="imagem">
                            Imagem do evento
                        </label>

                        <input
                            type="file"
                            id="imagem"
                            name="imagem"
                            accept="image/*"
                            onChange={(event) => {
                                const arquivo = event.target.files[0];

                                if (!arquivo) {
                                    return;
                                }

                                const leitor = new FileReader();

                                leitor.onloadend = () => {
                                    setFormulario({
                                        ...formulario,
                                        imagem: leitor.result
                                    });
                                };

                                leitor.readAsDataURL(arquivo);
                            }}
                        />

                        {formulario.imagem && (
                            <div className="imagem-preview">
                                <p>Prévia da imagem:</p>

                                <img
                                    src={formulario.imagem}
                                    alt="Prévia do evento"
                                />
                            </div>
                        )}
                    </div>

                    <div className="form-buttons">
                        <Button
                            type="button"
                            className="btn-cancel"
                            onClick={fecharModal}
                        >
                            Cancelar
                        </Button>

                        <Button
                            type="submit"
                            className="btn-primary"
                        >
                            Salvar Evento
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EventModal;