import { RequestHandler } from 'express';
import z, { ZodType } from 'zod';
import * as schemas from './schemas.js';
import { ValidationError } from './errors.js';

//returns a function
export const validateBody =
    (schema: ZodType<any>): RequestHandler =>
    (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return next(new ValidationError(result.error.issues)); //error case
        }

        next();
    };

export const createUser = validateBody(schemas.User);
export const updateUser = validateBody(schemas.UserUpdate);
