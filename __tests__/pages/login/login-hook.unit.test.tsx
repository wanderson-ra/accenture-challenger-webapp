import { when, resetAllWhenMocks } from "jest-when";
import lodash from "lodash";
import { renderHook, act } from "@testing-library/react-hooks";

import * as LoginUseCase from "../../../src/use-cases/login.usecase";

import { useLogin } from "../../../src/pages/login/login-hook";
import { BaseGatewayException } from "../../../src/gateways/exceptions/base-gateway.exception";
import { strings } from "../../../src/utils/strings";

import { userTemplateFull } from "../../__fixture__/domains/user-template";

describe("Tests of useCreateUser", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        resetAllWhenMocks();
    });

    const email = "anyEmail";
    const password = "anyPassword";

    const user = userTemplateFull.build();
    const userCloneDeep = lodash.cloneDeep(user);

    it("Test with success", async () => {
        const loginUseCaseMocked = jest.spyOn(LoginUseCase, "login");
        when(loginUseCaseMocked).calledWith(email, password).mockResolvedValue(user);

        const { result } = renderHook(() => useLogin());
        await act(async () => {
            await result.current.login(email, password);
        });

        expect(result.current.user).toEqual(userCloneDeep);
        expect(result.current.errorMessage).toEqual("");
        expect(result.current.isError).toEqual(false);
        expect(result.current.isLoading).toEqual(false);
    });

    it("Test with error BaseGatewayException", async () => {
        const messageError = "anyMessageError";

        const loginUseCaseMocked = jest.spyOn(LoginUseCase, "login");
        when(loginUseCaseMocked).calledWith(email, password).mockRejectedValue(new BaseGatewayException(messageError));

        const { result } = renderHook(() => useLogin());
        await act(async () => {
            await result.current.login(email, password);
        });

        expect(result.current.user).toEqual(null);
        expect(result.current.errorMessage).toEqual(messageError);
        expect(result.current.isError).toEqual(true);
        expect(result.current.isLoading).toEqual(false);
    });

    it("Test with error any error", async () => {
        const loginUseCaseMocked = jest.spyOn(LoginUseCase, "login");
        when(loginUseCaseMocked).calledWith(email, password).mockRejectedValue(new Error());

        const { result } = renderHook(() => useLogin());
        await act(async () => {
            await result.current.login(email, password);
        });

        expect(result.current.user).toEqual(null);
        expect(result.current.errorMessage).toEqual(strings.error.defaultError);
        expect(result.current.isError).toEqual(true);
        expect(result.current.isLoading).toEqual(false);

        await act(async () => {
            result.current.onReset();
        });

        expect(result.current.user).toEqual(null);
        expect(result.current.errorMessage).toEqual("");
        expect(result.current.isError).toEqual(false);
        expect(result.current.isLoading).toEqual(false);
    });
});
