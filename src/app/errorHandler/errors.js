import { BaseError } from "./base/baseError.js";
import { httpStatusCodes } from "./base/httpStatusCodes.js";

export class ValidatorError extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.BAD_REQUEST,
        description = 'Bad Request.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

export class UnauthorizedError extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.UNAUTHORIZED,
        description = 'Unauthorized.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

export class ForbiddenError extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.FORBIDDEN,
        description = 'Forbidden.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

export class ObjectNotFoundError extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.NOT_FOUND,
        description = 'Not found.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

export class BusinessError extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.CONFLICT,
        description = 'Conflict.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

export class InternalServerError extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.INTERNAL_SERVER,
        description = 'Internal server error.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}