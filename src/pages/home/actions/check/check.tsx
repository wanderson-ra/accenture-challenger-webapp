import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import CheckBoxOutlineBlank from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBox from "@material-ui/icons/CheckBox";
import IconButton from "@material-ui/core/IconButton";

import { Task } from "../../../../domains/task";
import { useMarkIsDone } from "../../../../hooks/useMarkIsDone";
import { ModalLoading } from "../../../../components/modalLoading/modalLoading";
import { ResponsiveDialog } from "../../../../components/dialog/dialog";
import { colorsLight } from "../../../../config/styles/colors";

interface CheckProps {
    task: Task;
    tasksTable: Array<Task>;
    setTasksTable: Dispatch<SetStateAction<Task[]>>;
}

export const Check: React.FC<CheckProps> = ({ task, setTasksTable, tasksTable }) => {
    const {
        errorMessageMarkIsDone,
        isLoadingMarkIsDone,
        markIsDone,
        resetMarkIsDone,
        successMarkIsDone,
    } = useMarkIsDone();

    const handlerMarkIsDone = useCallback(
        (taskId: number) => {
            markIsDone(taskId);
        },
        [markIsDone]
    );

    const handlerDismissModal = useCallback(() => {
        resetMarkIsDone();
    }, [resetMarkIsDone]);

    const handlerMarkIsDoneItem = useCallback(
        (taskId: number) => {
            const taskIsDonedIndex = tasksTable.findIndex((taskTable) => taskTable.id === taskId);
            tasksTable[taskIsDonedIndex].isDone = true;
            setTasksTable(tasksTable);
        },
        [tasksTable, setTasksTable]
    );

    useEffect(() => {
        if (successMarkIsDone) {
            resetMarkIsDone();
            handlerMarkIsDoneItem(task.id);
        }
    }, [successMarkIsDone]);

    return (
        <div>
            <IconButton onClick={() => handlerMarkIsDone(task.id)}>
                {task.isDone ? (
                    <CheckBox style={{ opacity: 0.5, color: colorsLight.primary }} />
                ) : (
                    <CheckBoxOutlineBlank style={{ color: colorsLight.primary }} />
                )}
            </IconButton>

            <ModalLoading isSuccess={false} open={isLoadingMarkIsDone} />

            <ResponsiveDialog
                okButtonTitle={"Ok"}
                onClose={handlerDismissModal}
                okButtonHandler={handlerDismissModal}
                title={"Ops, ocorreu um erro"}
                message={errorMessageMarkIsDone}
                open={!!errorMessageMarkIsDone}
            />
        </div>
    );
};
