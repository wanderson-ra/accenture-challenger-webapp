import * as factory from "factory.ts";
import { Guid } from "guid-typescript";

import { BarberShop } from "../../../src/domains/barber-shop";
import { userTemplateFull } from "../../__fixture__/domains/user-template";

export const barberShopTemplate = factory.Sync.makeFactory<BarberShop>({
    whatsApp: factory.each((i) => `whatsApp_${i}`),
    image: factory.each((i) => `image_${i}`),
    latitude: factory.each((i) => i),
    longitude: factory.each((i) => i),
    city: factory.each((i) => `cidade_${i}`),
    initials: factory.each((i) => `cidade_${i}`),
    user: userTemplateFull.build(),
});
