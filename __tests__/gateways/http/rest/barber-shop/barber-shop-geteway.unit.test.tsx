import "jest";
import nock from "nock";
import { when } from "jest-when";
import lodash from "lodash";

import * as EncryptionGateway from "../../../../../src/gateways/encryption/encryption-gateway";
import * as BarberShopGateway from "../../../../../src/gateways/http/rest/barber-shop/barber-shop-geteway";

import { barberShopTemplate } from "../../../../__fixture__/domains/barber-shop.template";
import { CreateBarberShopResponseJson } from "../../../../../src/gateways/http/rest/barber-shop/json/create-barber-shop-response.json";
import { DatabaseRestGatewayException } from "../../../../../src/gateways/exceptions/database-rest-gateway.exception";
import { EncryptionRestGatewayException } from "../../../../../src/gateways/exceptions/encryption-rest-gateway.exception";
import { UserAlreadyExistsRestGatewayException } from "../../../../../src/gateways/exceptions/user-already-exists-rest-gateway.exception";
import { DefaultRestGatewayException } from "../../../../../src/gateways/exceptions/default-rest-gateway.exception";

import { properties } from "../../../../../src/config/properties";
import { strings } from "../../../../../src/utils/strings";

describe("Tests of BarberShopGateway", () => {
    beforeEach(() => {
        nock.cleanAll();
        jest.clearAllMocks();
    });

    const barberShop = barberShopTemplate.build();
    const barberShopCloneDeep = lodash.cloneDeep(barberShop);
    const token = "anyToken";
    const barberShopId = "anyId";

    it("Test with success", async () => {
        const CreateBarberShopResponseJson: CreateBarberShopResponseJson = {
            barberShopId,
        };

        nock(properties.http.rest.barberShop.baseUrl, {
            reqheaders: {
                Authorization: token,
            },
        })
            .post("/barber-shops/create")
            .reply(201, CreateBarberShopResponseJson);

        const passwordEncrypted = "anyPasswordEncrypted";

        const encryptGatewayPasswordMocked = jest.spyOn(EncryptionGateway, "encryptionPassword");
        when(encryptGatewayPasswordMocked)
            .calledWith(barberShop.user.password ? barberShop.user.password : "")
            .mockResolvedValue(passwordEncrypted);

        const encryptionGatewayApiKeyMocked = jest.spyOn(EncryptionGateway, "encryptionApiKey");
        when(encryptionGatewayApiKeyMocked).calledWith().mockResolvedValue(token);

        const response = await BarberShopGateway.create(barberShop, null);
        expect(response).toEqual(barberShopId);
        expect(encryptGatewayPasswordMocked).toBeCalledWith(barberShopCloneDeep.user.password);
    });

    it("Test with error access database", async () => {
        const error = {
            code: "sba.database.user.error",
            message: "any",
        };

        nock(properties.http.rest.barberShop.baseUrl, {
            reqheaders: {
                Authorization: token,
            },
        })
            .post("/barber-shops/create")
            .reply(500, error);

        const passwordEncrypted = "anyPasswordEncrypted";

        const encryptGatewayPasswordMocked = jest.spyOn(EncryptionGateway, "encryptionPassword");
        when(encryptGatewayPasswordMocked)
            .calledWith(barberShop.user.password ? barberShop.user.password : "")
            .mockResolvedValue(passwordEncrypted);

        const encryptionGatewayApiKeyMocked = jest.spyOn(EncryptionGateway, "encryptionApiKey");
        when(encryptionGatewayApiKeyMocked).calledWith().mockResolvedValue(token);

        try {
            await BarberShopGateway.create(barberShop, null);
        } catch (error) {
            expect(error.message).toEqual(strings.error.databaseGateway);
        }
    });

    it("Test with error encryption", async () => {
        const error = {
            code: "sba.encryption.user.error",
            message: "any",
        };

        nock(properties.http.rest.barberShop.baseUrl, {
            reqheaders: {
                Authorization: token,
            },
        })
            .post("/barber-shops/create")
            .reply(500, error);

        const passwordEncrypted = "anyPasswordEncrypted";

        const encryptGatewayPasswordMocked = jest.spyOn(EncryptionGateway, "encryptionPassword");
        when(encryptGatewayPasswordMocked)
            .calledWith(barberShop.user.password ? barberShop.user.password : "")
            .mockResolvedValue(passwordEncrypted);

        const encryptionGatewayApiKeyMocked = jest.spyOn(EncryptionGateway, "encryptionApiKey");
        when(encryptionGatewayApiKeyMocked).calledWith().mockResolvedValue(token);

        try {
            await BarberShopGateway.create(barberShop, null);
        } catch (error) {
            expect(error.message).toEqual(strings.error.defaultError);
        }
    });

    it("Test with user already exists", async () => {
        const error = {
            code: "sba.business.user.error.userAlreadyExists",
            message: "any",
        };

        nock(properties.http.rest.barberShop.baseUrl, {
            reqheaders: {
                Authorization: token,
            },
        })
            .post("/barber-shops/create")
            .reply(500, error);

        const passwordEncrypted = "anyPasswordEncrypted";

        const encryptGatewayPasswordMocked = jest.spyOn(EncryptionGateway, "encryptionPassword");
        when(encryptGatewayPasswordMocked)
            .calledWith(barberShop.user.password ? barberShop.user.password : "")
            .mockResolvedValue(passwordEncrypted);

        const encryptionGatewayApiKeyMocked = jest.spyOn(EncryptionGateway, "encryptionApiKey");
        when(encryptionGatewayApiKeyMocked).calledWith().mockResolvedValue(token);

        try {
            await BarberShopGateway.create(barberShop, null);
        } catch (error) {
            expect(error.message).toEqual(strings.error.userAlreadyExists);
        }
    });
});
