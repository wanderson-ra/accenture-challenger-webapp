import { AxiosError } from "axios";
import { BaseGatewayException } from "../../../exceptions/baseGatewayException";
import { ErrorToAccessDatabaseGatewayException } from "../../../exceptions/errorToAccessDatabaseGatewayException";
import { TaskNotFountBusinessException } from "../../../exceptions/taskNotFountBusinessException";
import { DefaultRestGatewayException } from "../../../exceptions/defaultRestGatewayException";

const CODE_DATABASE_ERROR = "challenger.error.database.access";
const CODE_TASK_NOTFOUND = "challenger.error.taskNotFound";

export const handlerError = (axiosError: AxiosError): BaseGatewayException => {
    switch (axiosError?.response?.data?.code) {
        case CODE_DATABASE_ERROR:
            return new ErrorToAccessDatabaseGatewayException("Ocorreu um ao recuperar os dados.");

        case CODE_TASK_NOTFOUND:
            return new TaskNotFountBusinessException("A tarefa não foi encontrada.");

        default:
            return new DefaultRestGatewayException("Ocorreu um erro inesperado ao tentar realizar a operação.");
    }
};
