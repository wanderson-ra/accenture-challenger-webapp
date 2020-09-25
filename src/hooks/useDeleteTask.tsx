import { useState } from "react";

import * as DeleteTaskUseCase from "../useCases/deleteTaskUseCase";
import { BaseGatewayException } from "../gateways/exceptions/baseGatewayException";

export interface UseDeleteTaskProps {
    successDeleteTask: boolean;
    errorMessageDeleteTask: string;
    resetDeleteTask: () => void;
    deleteTask: (taskId: number) => Promise<void>;
    isLoadingDeleteTask: boolean;
}

export const useDeleteTask = (): UseDeleteTaskProps => {
    const [isLoadingDeleteTask, setIsLoadingDeleteTask] = useState(false);
    const [successDeleteTask, setSuccessDeleteTask] = useState(false);
    const [errorMessageDeleteTask, setErrorMessageDeleteTask] = useState<string | null>(null);

    const resetDeleteTask = (): void => {
        setSuccessDeleteTask(false);
        setErrorMessageDeleteTask(null);
    };

    const deleteTask = async (taskId: number): Promise<void> => {
        try {
            resetDeleteTask();
            setIsLoadingDeleteTask(true);
            await DeleteTaskUseCase.deleteTask(taskId);
            setSuccessDeleteTask(true);
        } catch (error) {
            handlerError(error);
        } finally {
            setIsLoadingDeleteTask(false);
        }
    };

    const handlerError = (error: Error): void => {
        if (error instanceof BaseGatewayException) {
            setErrorMessageDeleteTask(error.message);
        }
    };

    return { errorMessageDeleteTask, successDeleteTask, resetDeleteTask, isLoadingDeleteTask, deleteTask };
};
