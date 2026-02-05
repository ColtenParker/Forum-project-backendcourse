import express, {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from 'express';
import prisma from '../prisma.js';

export const getPosts: RequestHandler = (req, res) => {
    res.json({ message: 'hit' });
};
export const createPost: RequestHandler = (req, res) => {
    res.json({ message: 'hit' });
};

export const getPost: RequestHandler = (req, res) => {
    res.json({ message: 'hit' });
};

export const updatePost: RequestHandler = (req, res) => {
    res.json({ message: 'hit' });
};

export const deletePost: RequestHandler = (req, res) => {
    res.json({ message: 'hit' });
};

export const createLike: RequestHandler = (req, res) => {
    res.json({ message: 'hit' });
};

export const deleteLike: RequestHandler = (req, res) => {
    res.json({ message: 'hit' });
};

export const createFollow: RequestHandler = (req, res) => {
    res.json({ message: 'hit' });
};

export const deleteFollow: RequestHandler = (req, res) => {
    res.json({ message: 'hit' });
};

export const getReplies: RequestHandler = (req, res) => {
    res.json({ message: 'hit' });
};

export const createReply: RequestHandler = (req, res) => {
    res.json({ message: 'hit' });
};
