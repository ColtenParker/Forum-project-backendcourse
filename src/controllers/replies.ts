import express, {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from 'express';
import prisma from '../prisma.js';

export const getReply: RequestHandler = (req, res) => {
    res.json({ message: 'hit' });
};

export const updateReply: RequestHandler = (req, res) => {
    res.json({ message: 'hit' });
};

export const deleteReply: RequestHandler = (req, res) => {
    res.json({ message: 'hit' });
};
