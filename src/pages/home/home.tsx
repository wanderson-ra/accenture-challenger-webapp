import React, { useEffect, useCallback, useState } from "react";
import { Header } from "../../components/header/header";
import { Container, CssBaseline } from "@material-ui/core";
import MaterialTable from "material-table";
import Grid from "@material-ui/core/Grid";

import { styles } from "./styles";
import { useGetAllTasks } from "../../hooks/useGetAllTasks";
import { ModalLoading } from "../../components/modalLoading/modalLoading";
import { colorsLight } from "../../config/styles/colors";

import { Delete } from "./actions/delete/delete";
import { Check } from "./actions/check/check";

import { ResponsiveDialog } from "../../components/dialog/dialog";
import { useCreateTask } from "../../hooks/useCreateTask";
import { localization, columns } from "../../config/styles/table";

import { Task } from "../../domains/task";

export const Home: React.FC = () => {
    const [tasksTable, setTasksTable] = useState<Array<Task> | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { errorMessageGetAll, getTasks, isLoadingGetAll, resetGetAll, tasks } = useGetAllTasks();
    const { create, errorMessageCreate, isLoadingCreate, resetCreate, taskCreated } = useCreateTask();

    const classes = styles();

    const handlerGetAllTasks = useCallback(() => {
        getTasks();
    }, [getTasks]);

    const handlerDismissModal = useCallback(() => {
        resetGetAll();
        resetCreate();
        setErrorMessage(null);
    }, [resetGetAll]);

    const handlerCreateTask = useCallback(
        (task: Task) => {
            console.log(task.date);
            if (!task.date) {
                setErrorMessage("Por favor preencha data para realização da tarefa.");
                return;
            }

            if (!task.description) {
                setErrorMessage("Por favor preencha a descrição da tarefa.");
                return;
            }
            create(task);
        },
        [create]
    );

    const handlerFinishCreateAccount = (): void => {
        resetCreate();
    };

    useEffect(() => {
        getTasks();
    }, []);

    useEffect(() => {
        if (tasks) {
            setTasksTable(tasks);
        }
    }, [tasks]);

    useEffect(() => {
        if (taskCreated) {
            setTasksTable([...tasksTable, taskCreated]);
        }
    }, [taskCreated]);

    useEffect(() => {
        setIsLoading(isLoadingCreate);
    }, [isLoadingCreate]);

    useEffect(() => {
        setIsLoading(isLoadingGetAll);
    }, [isLoadingGetAll]);

    useEffect(() => {
        setErrorMessage(errorMessageCreate);
    }, [errorMessageCreate]);

    useEffect(() => {
        setErrorMessage(errorMessageGetAll);
    }, [errorMessageGetAll]);

    return (
        <div>
            <Header />
            <Container component="main" maxWidth="xl">
                <CssBaseline />
                <div className={classes.container}>
                    <Grid spacing={2} xs={10} alignItems={"center"} justify={"center"}>
                        <MaterialTable
                            localization={localization}
                            columns={columns}
                            data={tasksTable ? tasksTable : []}
                            title="Tarefas"
                            actions={[
                                {
                                    icon: "refresh",
                                    tooltip: "Atualizar",
                                    isFreeAction: true,
                                    onClick: () => handlerGetAllTasks(),
                                },
                                (task) => ({
                                    icon: () => (
                                        <Delete tasksTable={tasksTable} setTasksTable={setTasksTable} task={task} />
                                    ),
                                    tooltip: "Remover tarefa",
                                    onClick: () => false,
                                }),

                                (task) => ({
                                    icon: () => (
                                        <Check setTasksTable={setTasksTable} tasksTable={tasksTable} task={task} />
                                    ),
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
                            editable={{
                                onRowAdd: async (task) => {
                                    handlerCreateTask(task);
                                },
                            }}
                        />
                    </Grid>
                </div>

                <ModalLoading
                    onAnimationSuccessFinish={handlerFinishCreateAccount}
                    isSuccess={!!taskCreated}
                    open={isLoading}
                />

                <ResponsiveDialog
                    okButtonTitle={"Ok"}
                    onClose={handlerDismissModal}
                    okButtonHandler={handlerDismissModal}
                    title={"Ops, ocorreu um erro"}
                    message={errorMessage}
                    open={!!errorMessage}
                />
            </Container>
        </div>
    );
};
