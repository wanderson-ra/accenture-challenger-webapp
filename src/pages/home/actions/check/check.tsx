import React, { useCallback, useEffect } from "react";
import CheckBoxOutlineBlank from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBox from "@material-ui/icons/CheckBox";
import IconButton from "@material-ui/core/IconButton";

import { Task } from "../../../../domains/task";
import { useMarkIsDone } from "../../../../hooks/useMarkIsDone";
import { ModalLoading } from "../../../../components/modalLoading/modalLoading";
import { ResponsiveDialog } from "../../../../components/dialog/dialog";

interface CheckProps {
    task: Task;
    handlerGetAllTasks: () => void;
}

export const Check: React.FC<CheckProps> = ({ task, handlerGetAllTasks }) => {
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

    useEffect(() => {
        if (successMarkIsDone) {
            resetMarkIsDone();
            handlerGetAllTasks();
        }
    }, [successMarkIsDone]);

    return (
        <div>
            <IconButton onClick={() => handlerMarkIsDone(task.id)}>
                {task.isDone ? <CheckBox /> : <CheckBoxOutlineBlank />}
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
