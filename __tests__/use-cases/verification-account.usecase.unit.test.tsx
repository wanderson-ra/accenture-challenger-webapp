import { when } from "jest-when";

import * as UserGateway from "../../src/gateways/http/rest/user/user-geteway";
import * as VerificationAccountUseCase from "../../src/use-cases/verification-account.usecase";

describe("Tests of VerificationAccountUseCase", () => {
    it("Test with success", async () => {
        const verificationId = "anyVerificationId";
        const userId = "anyUserId";

        const userGatewayMocked = jest.spyOn(UserGateway, "accountVerification");
        when(userGatewayMocked).calledWith(verificationId).mockResolvedValue(userId);

        const userIdResponse = await VerificationAccountUseCase.accountVerification(verificationId);
        expect(userIdResponse).toEqual(userId);
    });
});
