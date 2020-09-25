import "jest";
import nock from "nock";

import { properties } from "../../../../../src/config/properties";
import { stateJsonTemplate } from "../../../../__fixture__/cases/gateway/http/rest/ibge/state.json.template";
import { cityJsonTemplate } from "../../../../__fixture__/cases/gateway/http/rest/ibge/city.json.template";
import * as IBGEGateway from "../../../../../src/gateways/http/rest/ibge/ibge-gateway";
import { strings } from "../../../../../src/utils/strings";

describe("Tests of IBGEGateway/getStates", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        nock.cleanAll();
    });
    const statesJson = stateJsonTemplate.buildList(1);

    it("Test with success", async () => {
        nock(properties.http.rest.ibge.baseUrl, {}).get("/estados?orderBy=nome").reply(200, statesJson);

        const statesResponse = await IBGEGateway.getStates();

        expect(statesResponse[0].initial).toEqual(statesJson[0].sigla);
        expect(statesResponse[0].name).toEqual(statesJson[0].nome);
        expect(statesResponse[0].id).toEqual(statesJson[0].id);
    });

    it("Test with erros", async () => {
        nock(properties.http.rest.ibge.baseUrl, {}).get("/estados?orderBy=nome").reply(500);

        try {
            await IBGEGateway.getStates();
        } catch (error) {
            expect(error.message).toEqual(strings.error.errorToAccessIBGE);
        }
    });
});

describe("Tests of IBGEGateway/getCitiesByUF", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        nock.cleanAll();
    });
    const citiesJson = cityJsonTemplate.buildList(1);
    const cityId = 1;

    it("Test with success", async () => {
        nock(properties.http.rest.ibge.baseUrl, {})
            .get(`/estados/${cityId}/municipios?orderBy=nome`)
            .reply(200, citiesJson);

        const citiesResponse = await IBGEGateway.getCitiesByUF(cityId);

        expect(citiesResponse[0].name).toEqual(citiesJson[0].nome);
        expect(citiesResponse[0].id).toEqual(citiesJson[0].id);
    });

    it("Test with erros", async () => {
        nock(properties.http.rest.ibge.baseUrl, {}).get(`/estados/${cityId}/municipios?orderBy=nome`).reply(500);

        try {
            await IBGEGateway.getCitiesByUF(cityId);
        } catch (error) {
            expect(error.message).toEqual(strings.error.errorToAccessIBGE);
        }
    });
});
