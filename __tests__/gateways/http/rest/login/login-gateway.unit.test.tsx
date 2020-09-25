import { when } from "jest-when";
import lodash from "lodash";

import * as LoginRestClient from "../../../../../src/gateways/http/rest/login/login-rest-client";
import * as LoginGateway from "../../../../../src/gateways/http/rest/login/login-gateway";

import { userTemplateFull } from "../../../../__fixture__/domains/user-template";

describe("Tests of LoginGateway", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Test with success", async () => {
        const email = "anyEmail";
        const password = "anyPassword";
        const user = userTemplateFull.build();
        const userCloenDeep = lodash.cloneDeep(user);

        const loginRestClientMocked = jest.spyOn(LoginRestClient, "login");
        when(loginRestClientMocked).calledWith(email, password).mockResolvedValue(user);

        const response = await LoginGateway.login(email, password);

        expect(new Date(response.created ? response.created : new Date())).toEqual(userCloenDeep.created);
        expect(response.email).toEqual(userCloenDeep.email);
        expect(response.firstName).toEqual(userCloenDeep.firstName);
        expect(response.id).toEqual(userCloenDeep.id);
        expect(response.lastName).toEqual(userCloenDeep.lastName);
        expect(response.role).toEqual(userCloenDeep.role);
        expect(response.status).toEqual(userCloenDeep.status);
        expect(response.token).toEqual(userCloenDeep.token);
    });
});
