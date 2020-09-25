export class BaseGatewayException extends Error {
    constructor(message?: string) {
        super();
        this.message = message ? message : "";
    }
}
