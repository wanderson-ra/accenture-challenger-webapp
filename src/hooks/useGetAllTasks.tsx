import { useState } from "react";

import * as GetAllTasksUseCase from "../useCases/getAllTasksUsecase";
import { Task } from "../domains/task";
import { BaseGatewayException } from "../gateways/exceptions/baseGatewayException";

export interface UseGetAllTasksProps {
    tasks: Array<Task> | null;
    errorMessageGetAll: string;
    resetGetAll: () => void;
    getTasks: () => Promise<void>;
    isLoadingGetAll: boolean;
}

export const useGetAllTasks = (): UseGetAllTasksProps => {
    const [isLoadingGetAll, setIsLoadingGetAll] = useState(false);
    const [tasks, setTasks] = useState<Array<Task> | null>(null);
    const [errorMessageGetAll, setErrorMessageGetAll] = useState<string | null>(null);

    const resetGetAll = (): void => {
        setTasks(null);
        setErrorMessageGetAll(null);
    };

    const getTasks = async (): Promise<void> => {
        try {
            resetGetAll();
            setIsLoadingGetAll(true);
            const tasksResponse = await GetAllTasksUseCase.getAll();
            setTasks(tasksResponse);
        } catch (error) {
            handlerError(error);
        } finally {
            setIsLoadingGetAll(false);
        }
    };

    const handlerError = (error: Error): void => {
        if (error instanceof BaseGatewayException) {
            setErrorMessageGetAll(error.message);
        }
    };

    return { errorMessageGetAll, tasks, resetGetAll, isLoadingGetAll, getTasks };
};
