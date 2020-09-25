import React, { useEffect, useCallback, useState } from "react";
import { Header } from "../../components/header/header";
import { Container, CssBaseline } from "@material-ui/core";
import MaterialTable from "material-table";

import { styles } from "./styles";
import { useGetAllTasks } from "../../hooks/useGetAllTasks";
import { ModalLoading } from "../../components/modalLoading/modalLoading";
import { colorsLight } from "../../config/styles/colors";

import { Delete } from "./actions/delete/delete";
import { Check } from "./actions/check/check";
import { ResponsiveDialog } from "../../components/dialog/dialog";

export const Home: React.FC = () => {
    const { errorMessageGetAll, getTasks, isLoadingGetAll, resetGetAll, tasks } = useGetAllTasks();

    const classes = styles();

    const handlerGetAllTasks = useCallback(() => {
        getTasks();
    }, [getTasks]);

    const handlerDismissModal = useCallback(() => {
        resetGetAll();
    }, [resetGetAll]);

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div>
            <Header />
            <Container component="main" maxWidth="xl">
                <CssBaseline />
                <div className={classes.container}>
                    <MaterialTable
                        columns={[
                            {
                                title: "Data",
                                field: "date",
                                type: "date",
                            },
                            { title: "Descrição", field: "description" },
                        ]}
                        data={tasks ? tasks : []}
                        title="Tarefas"
                        actions={[
                            {
                                icon: "add",
                                tooltip: "Nova tarefa",
                                isFreeAction: true,
                                onClick: () => alert("You want to add a new row"),
                            },
                            (task) => ({
                                icon: () => <Delete handlerGetAllTasks={handlerGetAllTasks} task={task} />,
                                tooltip: "Remover tarefa",
                                onClick: () => false,
                            }),

                            (task) => ({
                                icon: () => <Check handlerGetAllTasks={handlerGetAllTasks} task={task} />,
                                tooltip: task.isDone ? "Concluída" : "Marcar concluída",
                                onClick: () => false,
                                disabled: task.isDone,
                            }),
                        ]}
                        options={{
                            sorting: true,
                            rowStyle: {
                                backgroundColor: colorsLight.rowStyle.backgroundColor,
                            },
                        }}
                    />
                </div>
                <ModalLoading isSuccess={false} open={isLoadingGetAll} />
                <ResponsiveDialog
                    okButtonTitle={"Ok"}
                    onClose={handlerDismissModal}
                    okButtonHandler={handlerDismissModal}
                    title={"Ops, ocorreu um erro"}
                    message={errorMessageGetAll}
                    open={!!errorMessageGetAll}
                />
            </Container>
        </div>
    );
};
