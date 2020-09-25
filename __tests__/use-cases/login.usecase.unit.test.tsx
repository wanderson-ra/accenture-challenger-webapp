import { when } from "jest-when";
import lodash from "lodash";

import * as LoginGateway from "../../src/gateways/http/rest/login/login-gateway";
import * as EncryptPasswordUseCase from "../../src/use-cases/encrypt-password.usecase";
import * as LoginUseCase from "../../src/use-cases/login.usecase";

import { userTemplateFull } from "../__fixture__/domains/user-template";

describe("Test of LoginUseCase", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const user = userTemplateFull.build();
    const userCloneDeep = lodash.cloneDeep(user);

    it("Test with success", async () => {
        const email = "anyEmail";
        const password = "anyPassword";

        const passwordEncrypted = "anyPasswordEncrypted";

        const encryptPasswordUseCaseMocked = jest.spyOn(EncryptPasswordUseCase, "encrypt");
        when(encryptPasswordUseCaseMocked).calledWith(password).mockResolvedValue(passwordEncrypted);

        const loginMocked = jest.spyOn(LoginGateway, "login");
        when(loginMocked).calledWith(email, passwordEncrypted).mockResolvedValue(user);

        const response = await LoginUseCase.login(email, password);
        expect(new Date(response.created ? response.created : "")).toEqual(userCloneDeep.created);
        expect(response.email).toEqual(userCloneDeep.email);
        expect(response.firstName).toEqual(userCloneDeep.firstName);
        expect(response.id).toEqual(userCloneDeep.id);
        expect(response.lastName).toEqual(userCloneDeep.lastName);
        expect(response.role).toEqual(userCloneDeep.role);
        expect(response.status).toEqual(userCloneDeep.status);
        expect(response.token).toEqual(userCloneDeep.token);
    });
});
