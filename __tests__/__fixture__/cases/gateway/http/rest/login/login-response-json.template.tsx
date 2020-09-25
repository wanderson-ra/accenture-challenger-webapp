import * as factory from "factory.ts";

import { LoginResponseJson } from "../../../../../../../src/gateways/http/rest/login/json/login-response-json";
import { UserStatus } from "../../../../../../../src/domains/enums/user-status";
import { UserRole } from "../../../../../../../src/domains/enums/user-role";

export const loingResponseJsonTemplate = factory.Sync.makeFactory<LoginResponseJson>({
    email: factory.each((i) => `email_${i}`),
    firstName: factory.each((i) => `firstName${i}`),
    lastName: factory.each((i) => `lastName${i}`),
    status: UserStatus.VERIFIED,
    role: UserRole.USER,
    id: factory.each((i) => `anyId${i}`),
    created: new Date(),
    token: factory.each((i) => `token${i}`),
});
