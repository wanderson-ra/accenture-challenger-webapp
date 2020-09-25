import * as TaskGateway from "../gateways/http/rest/task/taskRestGateway";
import { Task } from "../domains/task";

export const create = async (task: Task): Promise<Task> => {
    return await TaskGateway.create(task);
};
