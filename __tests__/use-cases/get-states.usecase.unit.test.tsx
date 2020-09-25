import { when } from "jest-when";
import lodash from "lodash";

import * as IBGEGateway from "../../src/gateways/http/rest/ibge/ibge-gateway";
import * as GetStatesUseCase from "../../src/use-cases/get-states.usecase";
import { stateTemplate } from "../__fixture__/domains/state.template";

describe("Tests of GetStatesUseCase", () => {
    it("Test with success", async () => {
        const states = stateTemplate.buildList(1);
        const statesCloneDeep = lodash.cloneDeep(states);

        const IBGEGatewayMocked = jest.spyOn(IBGEGateway, "getStates");
        when(IBGEGatewayMocked).calledWith().mockResolvedValue(states);

        const statesResponse = await GetStatesUseCase.getStates();

        expect(statesResponse[0].initial).toEqual(statesCloneDeep[0].initial);
        expect(statesResponse[0].name).toEqual(statesCloneDeep[0].name);
        expect(statesResponse[0].id).toEqual(statesCloneDeep[0].id);
    });
});
