import * as factory from "factory.ts";

import { StateJson } from "../../../../../../../src/gateways/http/rest/ibge/json/state.json";

export const stateJsonTemplate = factory.Sync.makeFactory<StateJson>({
    sigla: factory.each((i) => `sigla${i}`),
    nome: factory.each((i) => `nome${i}`),
    id: factory.each((i) => 1),
});
