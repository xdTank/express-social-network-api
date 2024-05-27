import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { HTTP_STATUSES } from "../routes/users";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(HTTP_STATUSES.BAD_REQUEST).json({ errors: errors.array() })
    } else {
        next()
    }
}