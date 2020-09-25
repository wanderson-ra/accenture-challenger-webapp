import { encryptionApiKey, encryptionPassword } from "../../../src/gateways/encryption/encryption-gateway";

const token = "token";
jest.mock("crypto-js", () => {
    return {
        AES: {
            encrypt: jest.fn().mockImplementation(() => {
                return token;
            }),
        },
    };
});

describe("Tests of encryptionToken/encryptionToken", () => {
    it("Test with success", async () => {
        const encrypted = await encryptionApiKey();
        expect(encrypted).toEqual(token);
    });
});

describe("Tests of encryptionToken/encryptionPassword", () => {
    it("Test with success", async () => {
        const password = "anyPassword";
        const encrypted = await encryptionPassword(password);
        expect(encrypted).toEqual(token);
    });
});
