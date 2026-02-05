import { NextFunction, Request, Response } from 'express';
import xss, { whiteList } from 'xss';

const options = {
    whiteList: {},
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script']
};

const sanitize = (obj: any): any => {
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = xss(obj[key], options);
        } else if (typeof obj[key] === 'object') {
            obj[key] = sanitize(obj[key]);
        }
    }
    return obj;
};

const xssMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    if (req.body) {
        req.body = sanitize(req.body);
    };
    next();
};

export default xssMiddleWare;