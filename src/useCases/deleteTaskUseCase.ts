import * as TaskGateway from "../gateways/http/rest/task/taskRestGateway";

export const deleteTask = async (taskId: number): Promise<void> => {
    await TaskGateway.deleteTask(taskId);
};
