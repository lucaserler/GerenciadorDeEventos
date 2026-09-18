import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
    View,
    Text,
    Pressable,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Alert,
    Modal
} from "react-native";

import {
    listarEventos,
    excluirEvento
} from "../services/eventService";

function EventsScreen({ navigation }) {

    const [eventos, setEventos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    const [eventoParaExcluir, setEventoParaExcluir] = useState(null);
    const [excluindo, setExcluindo] = useState(false);

    useFocusEffect(
        useCallback(() => {

            let telaAtiva = true;

            async function carregarEventos() {

                try {

                    setCarregando(true);

                    setErro("");

                    const eventosRecebidos =
                        await listarEventos();

                    if (telaAtiva) {
                        setEventos(eventosRecebidos);
                    }

                } catch (erro) {

                    if (telaAtiva) {
                        setErro(erro.message);
                    }

                } finally {

                    if (telaAtiva) {
                        setCarregando(false);
                    }

                }
            }

            carregarEventos();

            return () => {
                telaAtiva = false;
            };

        }, [])
    );

    function handleExcluirEvento(evento) {

        setEventoParaExcluir(evento);

    }

    async function confirmarExclusao() {

        if (!eventoParaExcluir) {
            return;
        }

        setExcluindo(true);

        try {

            await excluirEvento(eventoParaExcluir.id);

            setEventos((eventosAtuais) =>
                eventosAtuais.filter(
                    (evento) =>
                        evento.id !== eventoParaExcluir.id
                )
            );

            setEventoParaExcluir(null);

        } catch (erro) {

            setErro(erro.message);

        } finally {

            setExcluindo(false);

        }
    }

    function renderizarEvento({ item }) {

        return (
            <View style={styles.eventCard}>

                <Text style={styles.eventName}>
                    {item.nome}
                </Text>

                <Text style={styles.eventDescription}>
                    {item.descricao || "Sem descrição"}
                </Text>

                <Text style={styles.eventInfo}>
                    Data: {item.data}
                </Text>

                <Text style={styles.eventInfo}>
                    Horário: {item.horario}
                </Text>

                <Text style={styles.eventInfo}>
                    Local: {item.local}
                </Text>

                <View style={styles.actionsContainer}>

                    <Pressable
                        style={styles.editButton}
                        onPress={() => navigation.navigate(
                            "EditEvent",
                            { evento: item }
                        )}
                    >
                        <Text style={styles.actionButtonText}>
                            Editar
                        </Text>
                    </Pressable>

                    <Pressable
                        style={styles.deleteButton}
                        onPress={() => handleExcluirEvento(item)}
                    >
                        <Text style={styles.actionButtonText}>
                            Excluir
                        </Text>
                    </Pressable>

                </View>

            </View>
        );
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Eventos
            </Text>

            {carregando && (
                <ActivityIndicator
                    size="large"
                    color="#2563eb"
                />
            )}

            {!carregando && erro !== "" && (
                <Text style={styles.error}>
                    {erro}
                </Text>
            )}

            {!carregando &&
                erro === "" &&
                eventos.length === 0 && (
                    <Text style={styles.emptyMessage}>
                        Você ainda não possui eventos.
                    </Text>
                )}

            {!carregando && erro === "" && (
                <FlatList
                    style={styles.list}
                    data={eventos}
                    keyExtractor={(item) =>
                        String(item.id)
                    }
                    renderItem={renderizarEvento}
                />
            )}

            <Modal
                visible={eventoParaExcluir !== null}
                transparent
                animationType="fade"
                onRequestClose={() => {

                    if (!excluindo) {
                        setEventoParaExcluir(null);
                    }

                }}
            >

                <View style={styles.modalOverlay}>

                    <View style={styles.modalContainer}>

                        <Text style={styles.modalTitle}>
                            Excluir evento
                        </Text>

                        <Text style={styles.modalMessage}>
                            Tem certeza de que deseja excluir este evento?
                        </Text>

                        {eventoParaExcluir && (
                            <Text style={styles.modalEventName}>
                                {eventoParaExcluir.nome}
                            </Text>
                        )}

                        <View style={styles.modalActions}>

                            <Pressable
                                style={styles.cancelModalButton}
                                onPress={() => setEventoParaExcluir(null)}
                                disabled={excluindo}
                            >
                                <Text style={styles.cancelModalText}>
                                    Cancelar
                                </Text>
                            </Pressable>

                            <Pressable
                                style={styles.confirmDeleteButton}
                                onPress={confirmarExclusao}
                                disabled={excluindo}
                            >
                                <Text style={styles.confirmDeleteText}>
                                    {excluindo
                                        ? "Excluindo..."
                                        : "Excluir"}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <Pressable
                style={styles.newEventButton}
                onPress={() => navigation.navigate("CreateEvent")}
            >
                <Text style={styles.buttonText}>
                    + Novo Evento
                </Text>
            </Pressable>

            <Pressable
                style={styles.button}
                onPress={() => navigation.replace("Login")}
            >
                <Text style={styles.buttonText}>
                    Sair
                </Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#f5f6fa"
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 24
    },

    list: {
        flex: 1,
        width: "100%"
    },

    eventCard: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#e2e8f0"
    },

    eventName: {
        fontSize: 19,
        fontWeight: "bold",
        marginBottom: 8
    },

    eventDescription: {
        fontSize: 15,
        color: "#475569",
        marginBottom: 12
    },

    eventInfo: {
        fontSize: 14,
        marginTop: 4,
        color: "#334155"
    },

    error: {
        color: "#dc2626",
        fontSize: 15,
        textAlign: "center",
        marginBottom: 16
    },

    emptyMessage: {
        textAlign: "center",
        fontSize: 16,
        color: "#64748b",
        marginTop: 24
    },

    button: {
        backgroundColor: "#2563eb",
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 16
    },

    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold"
    },

    newEventButton: {
        backgroundColor: "#2563eb",
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 16
    },

    actionsContainer: {
        flexDirection: "row",
        gap: 10,
        marginTop: 16
    },

    editButton: {
        flex: 1,
        backgroundColor: "#2563eb",
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center"
    },

    deleteButton: {
        flex: 1,
        backgroundColor: "#dc2626",
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center"
    },

    actionButtonText: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "bold"
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 24
    },

    modalContainer: {
        width: "100%",
        maxWidth: 400,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 24
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "center"
    },

    modalMessage: {
        fontSize: 15,
        color: "#475569",
        textAlign: "center",
        marginBottom: 12
    },

    modalEventName: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 24
    },

    modalActions: {
        flexDirection: "row",
        gap: 10
    },

    cancelModalButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#94a3b8",
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center"
    },

    cancelModalText: {
        color: "#334155",
        fontWeight: "bold"
    },

    confirmDeleteButton: {
        flex: 1,
        backgroundColor: "#dc2626",
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center"
    },

    confirmDeleteText: {
        color: "#ffffff",
        fontWeight: "bold"
    },
});

export default EventsScreen;