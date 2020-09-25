import * as factory from "factory.ts";

import { User } from "../../../src/domains/user";
import { UserStatus } from "../../../src/domains/enums/user-status";
import { UserRole } from "../../../src/domains/enums/user-role";

export const userTemplateFull = factory.Sync.makeFactory<User>({
    email: factory.each((i) => `email_${i}`),
    firstName: factory.each((i) => `firstName${i}`),
    lastName: factory.each((i) => `lastName${i}`),
    password: factory.each((i) => `anyPass${i}`),
    status: UserStatus.VERIFIED,
    role: UserRole.ADMINISTRATOR,
    id: "5db6b24830f133b65dbbe457",
    created: new Date(),
});
