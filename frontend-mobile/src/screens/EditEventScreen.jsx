import { useState } from "react";

import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    ScrollView,
    Alert
} from "react-native";

import { atualizarEvento } from "../services/eventService";

function converterDataParaExibicao(data) {

    if (!data) {
        return "";
    }

    const partes = data.split("-");

    if (partes.length !== 3) {
        return data;
    }

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function converterDataParaAPI(data) {

    if (!data) {
        return "";
    }

    // Se já estiver no formato AAAA-MM-DD
    if (data.includes("-")) {
        return data;
    }

    // Converte DD/MM/AAAA para AAAA-MM-DD
    const partes = data.split("/");

    if (partes.length !== 3) {
        return data;
    }

    const dia = partes[0];
    const mes = partes[1];
    const ano = partes[2];

    return `${ano}-${mes}-${dia}`;
}

function EditEventScreen({ navigation, route }) {

    const { evento } = route.params;

    const [nome, setNome] = useState(evento.nome || "");

    const [descricao, setDescricao] = useState(
        evento.descricao || ""
    );

    const [data, setData] = useState(
        converterDataParaExibicao(evento.data)
    );

    const [horario, setHorario] = useState(
        evento.horario
            ? evento.horario.substring(0, 5)
            : ""
    );

    const [local, setLocal] = useState(evento.local || "");

    const [carregando, setCarregando] = useState(false);

    const [erro, setErro] = useState("");

    async function handleAtualizarEvento() {
        console.log("Botão Salvar Alterações clicado");
        setErro("");

        if (!nome.trim()) {
            setErro("Informe o nome do evento.");
            return;
        }

        if (!data.trim()) {
            setErro("Informe a data do evento.");
            return;
        }

        if (!horario.trim()) {
            setErro("Informe o horário do evento.");
            return;
        }

        if (!local.trim()) {
            setErro("Informe o local do evento.");
            return;
        }

        const eventoAtualizado = {

            nome: nome.trim(),

            descricao: descricao.trim(),

            data: converterDataParaAPI(data.trim()),

            horario: horario.trim(),

            local: local.trim()

        };

        setCarregando(true);

        console.log("Dados enviados para atualização:", eventoAtualizado);

        console.log("ID do evento:", evento.id);

        try {

            await atualizarEvento(
                evento.id,
                eventoAtualizado
            );

            console.log("Evento atualizado com sucesso!");

            navigation.goBack();

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
                Editar Evento
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

            <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                value={data}
                onChangeText={setData}
                keyboardType="numbers-and-punctuation"
            />

            <Text style={styles.hint}>
                Exemplo: 25/10/2026
            </Text>

            <Text style={styles.label}>
                Horário *
            </Text>

            <TextInput
                style={styles.input}
                placeholder="HH:MM"
                value={horario}
                onChangeText={setHorario}
                keyboardType="numbers-and-punctuation"
            />

            <Text style={styles.hint}>
                Exemplo: 19:30
            </Text>

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
                onPress={handleAtualizarEvento}
                disabled={carregando}
            >

                <Text style={styles.buttonText}>
                    {carregando
                        ? "Salvando..."
                        : "Salvar Alterações"}
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
        backgroundColor: "#2563eb",
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
    }

});

export default EditEventScreen;