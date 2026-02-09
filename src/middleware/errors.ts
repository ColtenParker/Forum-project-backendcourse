import { NextFunction, Request, Response } from 'express';

const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (err.message === '404' || err.code === 'P2025') {
        return res.status(404).json({ error: 'resource not found' });
    }

    console.log('Error message', err.message);
    console.log('Error code', err.code);
    console.log('Error stack', err.stack);

    next(err);
};

export default { errorHandler };
