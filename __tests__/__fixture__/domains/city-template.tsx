import * as factory from "factory.ts";

import { City } from "../../../src/domains/city";

export const cityTemplate = factory.Sync.makeFactory<City>({
    name: factory.each((i) => `nome${i}`),
    id: factory.each((i) => i),
});
