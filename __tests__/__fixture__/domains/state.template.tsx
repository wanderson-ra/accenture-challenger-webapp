import * as factory from "factory.ts";

import { State } from "../../../src/domains/state";

export const stateTemplate = factory.Sync.makeFactory<State>({
    initial: factory.each((i) => `sigla${i}`),
    name: factory.each((i) => `nome${i}`),
    id: factory.each((i) => i),
});
