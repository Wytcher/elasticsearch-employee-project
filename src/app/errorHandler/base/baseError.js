import { httpStatusCodes } from "./httpStatusCodes.js";

export class BaseError extends Error {

    constructor(name, statusCode, isOperational, description) {
        super(description);

        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.timestamp = Date.now();
        Error.captureStackTrace(this);
    }

}