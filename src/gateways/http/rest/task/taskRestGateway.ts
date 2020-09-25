import { AxiosResponse } from "axios";

import { handlerError } from "./handlerError";
import { Task } from "../../../../domains/task";
import { baseRest } from "../baseRest";

export const getAll = async (): Promise<Array<Task>> => {
    try {
        const response: AxiosResponse<Array<Task>> = await baseRest.get("tasks");
        return response.data;
    } catch (error) {
        throw handlerError(error);
    }
};

export const deleteTask = async (taskId: number): Promise<void> => {
    try {
        await baseRest.delete(`tasks/${taskId}`);
    } catch (error) {
        throw handlerError(error);
    }
};

export const markIsDone = async (taskId: number): Promise<void> => {
    try {
        await baseRest.put(`tasks/${taskId}`);
    } catch (error) {
        throw handlerError(error);
    }
};

export const create = async (task: Task): Promise<Task> => {
    try {
        const taskResponse = await baseRest.post("tasks", task);
        return taskResponse.data;
    } catch (error) {
        throw handlerError(error);
    }
};
