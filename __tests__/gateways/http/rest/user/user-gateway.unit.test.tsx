import "jest";
import nock from "nock";
import { when } from "jest-when";

import * as EncryptionGateway from "../../../../../src/gateways/encryption/encryption-gateway";
import * as UserGateway from "../../../../../src/gateways/http/rest/user/user-geteway";

import { EmailVerificationResponseJson } from "../../../../../src/gateways/http/rest/user/json/email-verification-response-json";

import { properties } from "../../../../../src/config/properties";
import { strings } from "../../../../../src/utils/strings";

describe("Tests of UserGateway", () => {
    beforeEach(() => {
        nock.cleanAll();
        jest.clearAllMocks();
    });

    const verificationId = "anyVerificarionId";
    const token = "anyToken";

    it("Test with success", async () => {
        const emailVerificationResponseJson: EmailVerificationResponseJson = {
            userId: "anyUserId",
        };

        const encryptionGatewayMocked = jest.spyOn(EncryptionGateway, "encryptionApiKey");
        when(encryptionGatewayMocked).calledWith().mockResolvedValue(token);

        nock(properties.http.rest.user.baseUrl, {
            reqheaders: {
                Authorization: token,
            },
        })
            .post(`/verification/email/${verificationId}`, {})
            .reply(201, emailVerificationResponseJson);

        const response = await UserGateway.accountVerification(verificationId);
        expect(response).toEqual(emailVerificationResponseJson.userId);
    });

    it("Test with error expiration token", async () => {
        const error = {
            code: "sba.business.user.error.expiredToken",
            message: "any",
        };

        const encryptionGatewayMocked = jest.spyOn(EncryptionGateway, "encryptionApiKey");
        when(encryptionGatewayMocked).calledWith().mockResolvedValue(token);

        nock(properties.http.rest.user.baseUrl, {
            reqheaders: {
                Authorization: token,
            },
        })
            .post(`/verification/email/${verificationId}`, {})
            .reply(422, error);

        try {
            await UserGateway.accountVerification(verificationId);
        } catch (error) {
            expect(error.message).toEqual(strings.error.expiredToken);
        }
    });

    it("Test with error user not found", async () => {
        const error = {
            code: "sba.business.user.error.userNotFound",
            message: "any",
        };

        const encryptionGatewayMocked = jest.spyOn(EncryptionGateway, "encryptionApiKey");
        when(encryptionGatewayMocked).calledWith().mockResolvedValue(token);

        nock(properties.http.rest.user.baseUrl, {
            reqheaders: {
                Authorization: token,
            },
        })
            .post(`/verification/email/${verificationId}`, {})
            .reply(422, error);

        try {
            await UserGateway.accountVerification(verificationId);
        } catch (error) {
            expect(error.message).toEqual(strings.error.userNotFound);
        }
    });

    it("Test with error account already verified", async () => {
        const error = {
            code: "sba.business.user.error.userAlreadyVerified",
            message: "any",
        };

        const encryptionGatewayMocked = jest.spyOn(EncryptionGateway, "encryptionApiKey");
        when(encryptionGatewayMocked).calledWith().mockResolvedValue(token);

        nock(properties.http.rest.user.baseUrl, {
            reqheaders: {
                Authorization: token,
            },
        })
            .post(`/verification/email/${verificationId}`, {})
            .reply(422, error);

        try {
            await UserGateway.accountVerification(verificationId);
        } catch (error) {
            expect(error.message).toEqual(strings.error.accountAlreadyVerified);
        }
    });

    it("Test with any error", async () => {
        const error = {
            code: "any",
            message: "any",
        };

        const encryptionGatewayMocked = jest.spyOn(EncryptionGateway, "encryptionApiKey");
        when(encryptionGatewayMocked).calledWith().mockResolvedValue(token);

        nock(properties.http.rest.user.baseUrl, {
            reqheaders: {
                Authorization: token,
            },
        })
            .post(`/verification/email/${verificationId}`, {})
            .reply(422, error);

        try {
            await UserGateway.accountVerification(verificationId);
        } catch (error) {
            expect(error.message).toEqual(strings.error.defaultError);
        }
    });
});
