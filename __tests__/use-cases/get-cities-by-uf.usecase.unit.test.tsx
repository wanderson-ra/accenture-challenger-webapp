import { when } from "jest-when";
import lodash from "lodash";

import * as IBGEGateway from "../../src/gateways/http/rest/ibge/ibge-gateway";
import * as GetCitiesByUfUseCase from "../../src/use-cases/get-cities-by-uf.usecase";
import { cityTemplate } from "../__fixture__/domains/city-template";

describe("Tests of GetStatesUseCase", () => {
    it("Test with success", async () => {
        const cities = cityTemplate.buildList(1);
        const citiesCloneDeep = lodash.cloneDeep(cities);
        const stateId = 1;

        const IBGEGatewayMocked = jest.spyOn(IBGEGateway, "getCitiesByUF");
        when(IBGEGatewayMocked).calledWith(stateId).mockResolvedValue(cities);

        const statesResponse = await GetCitiesByUfUseCase.get(stateId);

        expect(statesResponse[0].id).toEqual(citiesCloneDeep[0].id);
        expect(statesResponse[0].name).toEqual(citiesCloneDeep[0].name);
    });
});
