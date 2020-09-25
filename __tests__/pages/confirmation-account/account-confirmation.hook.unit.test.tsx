import { when } from "jest-when";
import lodash from "lodash";
import { renderHook, act } from "@testing-library/react-hooks";

import * as VerificationAccountUseCaseUseCase from "../../../src/use-cases/verification-account.usecase";
import { useVerificationAccount } from "../../../src/pages/account-confirmation/account-confirmation.hook";
import { strings } from "../../../src/utils/strings";
import { BaseGatewayException } from "../../../src/gateways/exceptions/base-gateway.exception";

describe("Tests of useVerificationAccount", () => {
    it("Test with success", async () => {
        const verificationId = "anyVericationId";
        const userId = "anyUserId";

        const verificationAccountUseCaseUseCaseMocked = jest.spyOn(
            VerificationAccountUseCaseUseCase,
            "accountVerification"
        );

        when(verificationAccountUseCaseUseCaseMocked).calledWith(verificationId).mockResolvedValue(userId);

        const { result } = renderHook(() => useVerificationAccount());
        await act(async () => {
            await result.current.verification(verificationId);
        });

        expect(result.current.errorMessage).toEqual(null);
        expect(result.current.isLoading).toEqual(false);
        expect(result.current.userId).toEqual(userId);
    });

    it("Test with any error", async () => {
        const verificationId = "anyVericationId";

        const verificationAccountUseCaseUseCaseMocked = jest.spyOn(
            VerificationAccountUseCaseUseCase,
            "accountVerification"
        );

        when(verificationAccountUseCaseUseCaseMocked).calledWith(verificationId).mockRejectedValue(new Error());

        const { result } = renderHook(() => useVerificationAccount());
        await act(async () => {
            await result.current.verification(verificationId);
        });

        expect(result.current.errorMessage).toEqual(strings.error.defaultError);
        expect(result.current.isLoading).toEqual(false);
        expect(result.current.userId).toEqual(null);
    });

    it("Test with BaseGatewayException", async () => {
        const verificationId = "anyVericationId";

        const verificationAccountUseCaseUseCaseMocked = jest.spyOn(
            VerificationAccountUseCaseUseCase,
            "accountVerification"
        );

        when(verificationAccountUseCaseUseCaseMocked)
            .calledWith(verificationId)
            .mockRejectedValue(new BaseGatewayException());

        const { result } = renderHook(() => useVerificationAccount());
        await act(async () => {
            await result.current.verification(verificationId);
        });

        expect(result.current.errorMessage).toEqual(strings.error.defaultError);
        expect(result.current.isLoading).toEqual(false);
        expect(result.current.userId).toEqual(null);
    });
});
