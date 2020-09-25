import { useState } from "react";

import * as CreateTaskUseCase from "../useCases/createTaskUseCase";
import { Task } from "../domains/task";
import { BaseGatewayException } from "../gateways/exceptions/baseGatewayException";

export interface UseCreateTaskProps {
    taskCreated: Task | null;
    errorMessageCreate: string;
    resetCreate: () => void;
    create: (task: Task) => Promise<void>;
    isLoadingCreate: boolean;
}

export const useCreateTask = (): UseCreateTaskProps => {
    const [isLoadingCreate, setIsLoadingCreate] = useState(false);
    const [taskCreated, setTaskCreated] = useState<Task | null>(null);
    const [errorMessageCreate, setErrorMessageCreate] = useState<string | null>(null);

    const resetCreate = (): void => {
        setTaskCreated(null);
        setErrorMessageCreate(null);
        setIsLoadingCreate(false);
    };

    const create = async (task: Task): Promise<void> => {
        try {
            resetCreate();
            setIsLoadingCreate(true);
            const taskResponse = await CreateTaskUseCase.create(task);
            setTaskCreated(taskResponse);
        } catch (error) {
            setIsLoadingCreate(false);
            handlerError(error);
        }
    };

    const handlerError = (error: Error): void => {
        if (error instanceof BaseGatewayException) {
            setErrorMessageCreate(error.message);
        }
    };

    return { errorMessageCreate, taskCreated, resetCreate, isLoadingCreate, create };
};
