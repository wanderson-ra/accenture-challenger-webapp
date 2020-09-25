import React from "react";
import moment from "moment-timezone";
import { Task } from "../../domains/task";
import { Column } from "material-table";

export const localization = {
    pagination: {
        labelRowsSelect: "Linha",
        labelRowsPerPage: "Linhas por página:",
        labelDisplayedRows: "{count} de {from}-{to}",
        firstTooltip: "Primeira página",
        previousTooltip: "Página anterior",
        nextTooltip: "Próxima página",
        lastTooltip: "Última página",
    },
    toolbar: {
        nRowsSelected: "{0} linha(s) selecionadas",
        searchTooltip: "Pesquisar",
        searchPlaceholder: "Pesquisar",
    },
    header: {
        actions: "Ações",
    },
    body: {
        addTooltip: "Adicionar Nova",
        emptyDataSourceMessage: "Não existem registros a serem mostrados",
        filterRow: {
            filterTooltip: "Filtro",
        },
        editRow: {
            cancelTooltip: "Cancelar",
            saveTooltip: "Salvar",
        },
    },
};

export const columns: Column<Task>[] = [
    {
        title: "Data",
        field: "date",
        type: "date",
        render: (row: Task) => <span>{moment(row.date).format("DD/MM/YYYY")}</span>,
    },
    { title: "Descrição", field: "description" },
];
