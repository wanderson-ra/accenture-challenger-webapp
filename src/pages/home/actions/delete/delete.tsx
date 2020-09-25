import React, { useCallback, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { useDeleteTask } from "../../../../hooks/useDeleteTask";
import { Task } from "../../../../domains/task";
import { ModalLoading } from "../../../../components/modalLoading/modalLoading";
import { ResponsiveDialog } from "../../../../components/dialog/dialog";
import { colorsLight } from "../../../../config/styles/colors";

interface DeleteProps {
    task: Task;
    handlerGetAllTasks: () => void;
}
export const Delete: React.FC<DeleteProps> = ({ task, handlerGetAllTasks }) => {
    const {
        deleteTask,
        errorMessageDeleteTask,
        isLoadingDeleteTask,
        resetDeleteTask,
        successDeleteTask,
    } = useDeleteTask();

    const handlerDeleteTask = useCallback(
        (taskId: number) => {
            deleteTask(taskId);
        },
        [deleteTask]
    );

    const handlerDismissModal = useCallback(() => {
        resetDeleteTask();
    }, [resetDeleteTask]);

    useEffect(() => {
        if (successDeleteTask) {
            resetDeleteTask();
            handlerGetAllTasks();
        }
    }, [successDeleteTask]);

    return (
        <div>
            <IconButton onClick={() => handlerDeleteTask(task.id)}>
                <DeleteIcon style={{ color: colorsLight.primary }} />
            </IconButton>
            <ModalLoading isSuccess={false} open={isLoadingDeleteTask} />

            <ResponsiveDialog
                okButtonTitle={"Ok"}
                onClose={handlerDismissModal}
                okButtonHandler={handlerDismissModal}
                title={"Ops, ocorreu um erro"}
                message={errorMessageDeleteTask}
                open={!!errorMessageDeleteTask}
            />
        </div>
    );
};
