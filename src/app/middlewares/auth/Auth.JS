import * as dotenv from "dotenv";
import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../../errorHandlers/errors";

dotenv.config();

exports.jwtMiddleware = (req, res, next) => {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
        throw new UnauthorizedError("No token provided");
    }

    const parts = authHeader.split(' ');

    if (!parts.length === 2) {
        throw new UnauthorizedError("Token error");
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        throw new UnauthorizedError("Token malformatted");
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            throw new UnauthorizedError("Token invalid");
        }

        req.params.userId = decoded.id;

        return next();
    });
};