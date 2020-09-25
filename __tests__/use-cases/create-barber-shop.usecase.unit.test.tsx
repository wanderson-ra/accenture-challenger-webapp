import { when } from "jest-when";

import * as BarberShopGatewayGateway from "../../src/gateways/http/rest/barber-shop/barber-shop-geteway";
import * as CreateUserUseCase from "../../src/use-cases/create-barber-shop.usecase";

import { barberShopTemplate } from "../__fixture__/domains/barber-shop.template";

jest.mock("crypto-js", () => {
    return false;
});

describe("Test of CreateUserUseCase", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Test with success", async () => {
        const barberShopId = "anyId";
        const barberShop = barberShopTemplate.build();

        const barberShopGatewayGatewayMocked = jest.spyOn(BarberShopGatewayGateway, "create");
        when(barberShopGatewayGatewayMocked).calledWith(barberShop, null).mockResolvedValue(barberShopId);

        const barberShopIdResponse = await CreateUserUseCase.create(barberShop, null);

        expect(barberShopIdResponse).toEqual(barberShopId);
    });
});
