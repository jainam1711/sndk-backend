export default class HttpException extends Error {
    public readonly message: any;

    constructor(
        private readonly response: string | any,
        private readonly status: number,
    ) {
        super();
        this.message = response;
    }

    /**
     * When `response` is an object:
     * - object will be stringified and returned to the user as a JSON response,
     * When `response` is a string:
     * - It will create a response with two properties:
     */
    public getResponse(): string | any {
        return this.response;
    }

    public getStatus(): number {
        return this.status;
    }
}