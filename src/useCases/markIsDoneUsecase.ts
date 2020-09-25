import * as TaskGateway from "../gateways/http/rest/task/taskRestGateway";

export const markIsDone = async (taskId: number): Promise<void> => {
    await TaskGateway.markIsDone(taskId);
};
