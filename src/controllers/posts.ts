import express, {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from 'express';
import prisma from '../prisma.js';

export const getPosts: RequestHandler = async (req, res) => {
    const posts = await prisma.post.findMany();
    res.json({ posts });
};
export const createPost: RequestHandler = (req, res) => {
    res.json({ message: 'hit' });
};

export const getPost: RequestHandler = async (req, res, next) => {
    const postId = Number.parseInt(req.params.id as string);
    const post = await prisma.post.findUnique({
        where: { id: postId },
        include: {
            replies: true,
            _count: true,
        },
    });

    if (!post) {
        return next(new Error('404'));
    }
    res.json({ post });
};

export const updatePost: RequestHandler = async (req, res) => {
    const postId = parseInt(req.params.id as string);
    const post = await prisma.post.update({
        where: { id: postId },
        data: req.body,
    });

    res.send({ post });
};

export const deletePost: RequestHandler = async (req, res) => {
    const postId = parseInt(req.params.id as string);
    const result = await prisma.post.delete({
        where: { id: postId },
    });

    res.sendStatus(200);
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

export const getReplies: RequestHandler = async (req, res, next) => {
    const postId = Number.parseInt(req.params.id as string);
    const post = await prisma.post.findUnique({
        where: { id: postId },
        include: {
            replies: true,
            _count: true,
        },
    });

    if (!post) {
        return next(new Error('404'));
    }
    res.json({ replies: post.replies });
};

export const createReply: RequestHandler = (req, res) => {
    res.json({ message: 'hit' });
};
