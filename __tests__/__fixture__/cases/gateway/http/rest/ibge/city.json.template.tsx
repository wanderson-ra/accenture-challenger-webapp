import * as factory from "factory.ts";

import { CityJson } from "../../../../../../../src/gateways/http/rest/ibge/json/city.json";

export const cityJsonTemplate = factory.Sync.makeFactory<CityJson>({
    nome: factory.each((i) => `nome${i}`),
    id: factory.each((i) => 1),
});
