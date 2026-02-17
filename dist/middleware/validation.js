import z from 'zod';
import * as schemas from './schemas.js';
import { ValidationError } from './errors.js';
export const validateParamId = (req, res, next) => {
    const result = z
        .number()
        .int()
        .nonnegative()
        .safeParse(parseInt(req.params.id));
    if (!result.success) {
        return next(new ValidationError(result.error.issues));
    }
    next();
};
export const validateBody = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        return next(new ValidationError(result.error.issues));
    }
    next();
};
//user validation
export const login = validateBody(schemas.Login);
export const createUser = validateBody(schemas.Account);
export const updateUser = validateBody(schemas.UserUpdate);
//post validation
export const createPost = validateBody(schemas.Post);
export const updatePost = [validateParamId, validateBody(schemas.PostUpdate)];
//reply validation
