import { NextFunction, Request, Response } from 'express';


const validateUsername = (req: Request, res: Response, next: NextFunction) => {
    const username = req?.body?.username;

    if (!username) {
        res.status(400).json({ error: 'Username must exist' });
    }
    if (username.length < 5 || username.length > 30) {
        res.status(400).json({ error: 'Username must be between 5 and 30 characters' });
    }

    next();
}

export default { validateUsername }