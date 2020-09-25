import axios from "axios";
import { properties } from "../../../config/properties";

export const baseRest = axios.create({
    baseURL: properties.http.rest.challengeApi.baseUrl,
    timeout: 60000,
});
