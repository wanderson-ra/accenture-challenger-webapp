import { when } from "jest-when";
import nock from "nock";
import lodash from "lodash";

import { properties } from "../../../../../src/config/properties";

import * as LoginRestClient from "../../../../../src/gateways/http/rest/login/login-rest-client";
import * as EncryptionGateway from "../../../../../src/gateways/encryption/encryption-gateway";
import { loingResponseJsonTemplate } from "../../../../__fixture__/cases/gateway/http/rest/login/login-response-json.template";

import { strings } from "../../../../../src/utils/strings";

import { DatabaseRestGatewayException } from "../../../../../src/gateways/exceptions/database-rest-gateway.exception";
import { EncryptionRestGatewayException } from "../../../../../src/gateways/exceptions/encryption-rest-gateway.exception";
import { InvalidEmailOrPasswordGatewayException } from "../../../../../src/gateways/exceptions/invalid-email-or-password-business-gateway-exception";
import { UserNotVerifiedGatewayException } from "../../../../../src/gateways/exceptions/user-not-verified-gateway-exception";
import { DefaultRestGatewayException } from "../../../../../src/gateways/exceptions/default-rest-gateway.exception";
import { UserNotAuthorizedRestGatewayException } from "../../../../../src/gateways/exceptions/user-notauthorized-rest-gateway-exception";

describe("Tests of LoginRestClient", () => {
    beforeEach(() => {
        nock.cleanAll();
    });

    const token = "anyToken";
    const encryptionGatewayMocked = jest.spyOn(EncryptionGateway, "encryptionApiKey");
    when(encryptionGatewayMocked).calledWith().mockResolvedValue(token);

    const email = "amyEmail";
    const password = "anyPassword";

    const loingResponseJson = loingResponseJsonTemplate.build();
    const loingResponseJsonCloneDeep = lodash.cloneDeep(loingResponseJson);

    const loginRequestJson = {
        email,
        password,
    };

    it("Test with success", async () => {
        nock(properties.http.rest.user.baseUrl, {
            reqheaders: {
                Authorization: token,
            },
        })
            .post("/login/barbershop", loginRequestJson)
            .reply(201, loingResponseJson);

        const response = await LoginRestClient.login(email, password);
        expect(new Date(response.created ? response.created : new Date())).toEqual(loingResponseJsonCloneDeep.created);
        expect(response.email).toEqual(loingResponseJsonCloneDeep.email);
        expect(response.firstName).toEqual(loingResponseJsonCloneDeep.firstName);
        expect(response.id).toEqual(loingResponseJsonCloneDeep.id);
        expect(response.lastName).toEqual(loingResponseJsonCloneDeep.lastName);
        expect(response.role).toEqual(loingResponseJsonCloneDeep.role);
        expect(response.status).toEqual(loingResponseJsonCloneDeep.status);
        expect(response.token).toEqual(loingResponseJsonCloneDeep.token);

        expect(encryptionGatewayMocked).toBeCalled();
    });

    it("Test with database error", async () => {
        const error = {
            code: "sba.database.user.error",
            message: "anyMessage",
        };

        nock(properties.http.rest.user.baseUrl, {
            reqheaders: {
                Authorization: token,
            },
        })
            .post("/login/barbershop", loginRequestJson)
            .reply(500, error);

        try {
            await LoginRestClient.login(email, password);
        } catch (error) {
            expect(error.message).toEqual(strings.error.databaseGateway);
        }
    });

    it("Test with encryption error", async () => {
        const error = {
            code: "sba.encryption.user.error",
            message: "anyMessage",
        };

        nock(properties.http.rest.user.baseUrl, {
            reqheaders: {
                Authorization: token,
            },
        })
            .post("/login/barbershop", loginRequestJson)
            .reply(500, error);

        try {
            await LoginRestClient.login(email, password);
        } catch (error) {
            expect(error.message).toEqual(strings.error.defaultError);
        }
    });

    it("Test with invalid email or password error", async () => {
        const error = {
            code: "sba.user.error.invalidEmailOrPassword",
            message: "anyMessage",
        };

        nock(properties.http.rest.user.baseUrl, {
            reqheaders: {
                Authorization: token,
            },
        })
            .post("/login/barbershop", loginRequestJson)
            .reply(422, error);

        try {
            await LoginRestClient.login(email, password);
        } catch (error) {
            expect(error.message).toEqual(strings.error.invalidEmailOrPassword);
        }
    });

    it("Test with user not verified", async () => {
        const error = {
            code: "sba.business.user.error.userNotVerified",
            message: "anyMessage",
        };

        nock(properties.http.rest.user.baseUrl, {
            reqheaders: {
                Authorization: token,
            },
        })
            .post("/login/barbershop", loginRequestJson)
            .reply(422, error);

        try {
            await LoginRestClient.login(email, password);
        } catch (error) {
            expect(error.message).toEqual(strings.error.userNotVerified);
        }
    });

    it("Test with error user not authorized", async () => {
        const error = {
            code: "sba.user.notAuthorized",
            message: "anyMessage",
        };

        nock(properties.http.rest.user.baseUrl, {
            reqheaders: {
                Authorization: token,
            },
        })
            .post("/login/barbershop", loginRequestJson)
            .reply(422, error);

        try {
            await LoginRestClient.login(email, password);
        } catch (error) {
            expect(error.message).toEqual(strings.error.userNotAuthorized);
        }
    });

    it("Test with default error", async () => {
        const error = {
            code: "anyCode",
            message: "anyMessage",
        };

        nock(properties.http.rest.user.baseUrl, {
            reqheaders: {
                Authorization: token,
            },
        })
            .post("/login/barbershop", loginRequestJson)
            .reply(500, error);

        try {
            await LoginRestClient.login(email, password);
        } catch (error) {
            expect(error.message).toEqual(strings.error.defaultError);
        }
    });
});
