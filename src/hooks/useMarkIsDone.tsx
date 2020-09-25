import { useState } from "react";

import * as MarkIsDoneUsecase from "../useCases/markIsDoneUsecase";
import { BaseGatewayException } from "../gateways/exceptions/baseGatewayException";

export interface useMarkIsDoneProps {
    successMarkIsDone: boolean;
    errorMessageMarkIsDone: string;
    resetMarkIsDone: () => void;
    markIsDone: (taskId: number) => Promise<void>;
    isLoadingMarkIsDone: boolean;
}

export const useMarkIsDone = (): useMarkIsDoneProps => {
    const [isLoadingMarkIsDone, setIsLoadingMarkIsDone] = useState(false);
    const [successMarkIsDone, setSuccessMarkIsDone] = useState(false);
    const [errorMessageMarkIsDone, setErrorMessageMarkIsDone] = useState<string | null>(null);

    const resetMarkIsDone = (): void => {
        setSuccessMarkIsDone(false);
        setErrorMessageMarkIsDone(null);
    };

    const markIsDone = async (taskId: number): Promise<void> => {
        try {
            resetMarkIsDone();
            setIsLoadingMarkIsDone(true);
            await MarkIsDoneUsecase.markIsDone(taskId);
            setSuccessMarkIsDone(true);
        } catch (error) {
            handlerError(error);
        } finally {
            setIsLoadingMarkIsDone(false);
        }
    };

    const handlerError = (error: Error): void => {
        if (error instanceof BaseGatewayException) {
            setErrorMessageMarkIsDone(error.message);
        }
    };

    return { errorMessageMarkIsDone, successMarkIsDone, markIsDone, isLoadingMarkIsDone, resetMarkIsDone };
};
