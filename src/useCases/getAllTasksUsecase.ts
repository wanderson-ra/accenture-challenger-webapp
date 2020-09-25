import { Task } from "../domains/task";

import * as TaskGateway from "../gateways/http/rest/task/taskRestGateway";

export const getAll = async (): Promise<Array<Task>> => {
    const tasks = await TaskGateway.getAll();
    return tasks;
};
