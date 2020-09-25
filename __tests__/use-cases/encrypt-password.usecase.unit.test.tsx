import { when } from "jest-when";

import * as EncryptionGateway from "../../src/gateways/encryption/encryption-gateway";
import * as EncryptPasswordUseCase from "../../src/use-cases/encrypt-password.usecase";

describe("Tests of EncryptPasswordUseCase", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Test with success", async () => {
        const password = "anyPassword";
        const passwordEncrypted = "anyPasswordEncryted";

        const encryptionGatewayMocked = jest.spyOn(EncryptionGateway, "encryptionPassword");
        when(encryptionGatewayMocked).calledWith(password).mockResolvedValue(passwordEncrypted);

        const passwordEncryptedResponse = await EncryptPasswordUseCase.encrypt(password);
        expect(passwordEncryptedResponse).toEqual(passwordEncrypted);
    });
});
