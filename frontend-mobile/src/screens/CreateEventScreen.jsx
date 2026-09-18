import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    ScrollView,
    Alert,
    Platform
} from "react-native";

import { criarEvento } from "../services/eventService";

function CreateEventScreen({ navigation }) {

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");

    const [data, setData] = useState(null);
    const [horario, setHorario] = useState(null);
    const [mostrarCalendario, setMostrarCalendario] = useState(false);
    const [mostrarRelogio, setMostrarRelogio] = useState(false);

    const [local, setLocal] = useState("");

    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

    function formatarDataExibicao(valor) {

        if (!valor) {
            return "Selecionar data";
        }

        const dia = String(valor.getDate()).padStart(2, "0");
        const mes = String(valor.getMonth() + 1).padStart(2, "0");
        const ano = valor.getFullYear();

        return `${dia}/${mes}/${ano}`;
    }

    function formatarDataAPI(valor) {

        if (!valor) {
            return "";
        }

        const ano = valor.getFullYear();
        const mes = String(valor.getMonth() + 1).padStart(2, "0");
        const dia = String(valor.getDate()).padStart(2, "0");

        return `${ano}-${mes}-${dia}`;
    }

    function formatarHorario(valor) {

        if (!valor) {
            return "Selecionar horário";
        }

        const horas = String(valor.getHours()).padStart(2, "0");

        const minutos = String(valor.getMinutes()).padStart(2, "0");

        return `${horas}:${minutos}`;
    }

    async function handleCriarEvento() {

        setErro("");

        if (!nome.trim()) {
            setErro("Informe o nome do evento.");
            return;
        }

        if (!data) {
            setErro("Selecione a data do evento.");
            return;
        }

        if (!horario) {
            setErro("Selecione o horário do evento.");
            return;
        }

        if (!local.trim()) {
            setErro("Informe o local do evento.");
            return;
        }

        const novoEvento = {
            nome: nome.trim(),
            descricao: descricao.trim(),
            data: formatarDataAPI(data),
            horario: formatarHorario(horario),
            local: local.trim()
        };

        setCarregando(true);

        try {

            await criarEvento(novoEvento);

            Alert.alert(
                "Sucesso",
                "Evento criado com sucesso!",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.goBack()
                    }
                ]
            );

        } catch (erro) {

            setErro(erro.message);

        } finally {

            setCarregando(false);

        }
    }

    return (
        <ScrollView
            contentContainerStyle={styles.container}
        >

            <Text style={styles.title}>
                Novo Evento
            </Text>

            <Text style={styles.label}>
                Nome do evento *
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Digite o nome do evento"
                value={nome}
                onChangeText={setNome}
            />

            <Text style={styles.label}>
                Descrição
            </Text>

            <TextInput
                style={[
                    styles.input,
                    styles.descriptionInput
                ]}
                placeholder="Digite a descrição"
                value={descricao}
                onChangeText={setDescricao}
                multiline
                numberOfLines={4}
            />

            <Text style={styles.label}>
                Data *
            </Text>

            <Pressable
                style={styles.dateButton}
                onPress={() => setMostrarCalendario(true)}
            >
                <Text style={data ? styles.dateText : styles.placeholderText}>
                    {formatarDataExibicao(data)}
                </Text>

                <Text style={styles.iconText}>
                    📅
                </Text>
            </Pressable>

            {mostrarCalendario && (
                <DateTimePicker
                    value={data || new Date()}
                    mode="date"
                    display="default"
                    onChange={(evento, dataSelecionada) => {

                        setMostrarCalendario(false);

                        if (dataSelecionada) {
                            setData(dataSelecionada);
                        }

                    }}
                />
            )}

            <Text style={styles.label}>
                Horário *
            </Text>

            <Pressable
                style={styles.dateButton}
                onPress={() => setMostrarRelogio(true)}
            >
                <Text style={horario ? styles.dateText : styles.placeholderText}>
                    {formatarHorario(horario)}
                </Text>

                <Text style={styles.iconText}>
                    H
                </Text>
            </Pressable>

            {mostrarRelogio && (
                <DateTimePicker
                    value={horario || new Date()}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={(evento, horarioSelecionado) => {

                        setMostrarRelogio(false);

                        if (horarioSelecionado) {
                            setHorario(horarioSelecionado);
                        }

                    }}
                />
            )}

            <Text style={styles.label}>
                Local *
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Digite o local"
                value={local}
                onChangeText={setLocal}
            />

            {erro !== "" && (
                <Text style={styles.error}>
                    {erro}
                </Text>
            )}

            <Pressable
                style={[
                    styles.button,
                    carregando && styles.disabledButton
                ]}
                onPress={handleCriarEvento}
                disabled={carregando}
            >

                <Text style={styles.buttonText}>
                    {carregando
                        ? "Salvando..."
                        : "Salvar Evento"}
                </Text>

            </Pressable>

            <Pressable
                style={styles.cancelButton}
                onPress={() => navigation.goBack()}
                disabled={carregando}
            >

                <Text style={styles.cancelButtonText}>
                    Cancelar
                </Text>

            </Pressable>

        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        padding: 24,
        backgroundColor: "#f5f6fa",
        flexGrow: 1
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 24
    },

    label: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 6,
        marginTop: 12
    },

    input: {
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#cbd5e1",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 16
    },

    descriptionInput: {
        minHeight: 100,
        textAlignVertical: "top"
    },

    hint: {
        color: "#64748b",
        fontSize: 12,
        marginTop: 4
    },

    error: {
        color: "#dc2626",
        fontSize: 15,
        marginTop: 16,
        textAlign: "center"
    },

    button: {
        backgroundColor: "#16a34a",
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 24
    },

    disabledButton: {
        opacity: 0.6
    },

    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold"
    },

    cancelButton: {
        borderWidth: 1,
        borderColor: "#64748b",
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 12
    },

    cancelButtonText: {
        color: "#334155",
        fontSize: 16,
        fontWeight: "bold"
    },
    dateButton: {
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#cbd5e1",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    dateText: {
        fontSize: 16,
        color: "#1e293b"
    },

    placeholderText: {
        fontSize: 16,
        color: "#64748b"
    },

    iconText: {
        fontSize: 20
    },

});

export default CreateEventScreen;