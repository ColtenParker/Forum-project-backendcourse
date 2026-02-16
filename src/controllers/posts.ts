import express, {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from 'express';
import prisma from '../prisma.js';
import { tr } from 'zod/locales';

export const getPosts: RequestHandler = async (req, res) => {
    const posts = await prisma.post.findMany();
    res.json({ posts });
};
export const createPost: RequestHandler = async (req, res) => {
    const body = req.body;
    body.userId = req.user.id;
    const post = await prisma.post.create({
        data: body,
    });
    res.status(201).json(post);
};

export const getPost: RequestHandler = async (req, res, next) => {
    const postId = Number.parseInt(req.params.id);
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
    const postId = Number.parseInt(req.params.id);
    const post = await prisma.post.update({
        where: { id: postId },
        data: req.body,
    });

    res.send({ post });
};

export const deletePost: RequestHandler = async (req, res) => {
    const postId = parseInt(req.params.id);
    const result = await prisma.post.delete({
        where: { id: postId },
    });

    res.sendStatus(200);
};

export const createLike: RequestHandler = async (req, res) => {
    const postId = Number.parseInt(req.params.id);
    const userId = req.user.id;

    console.log(userId);

    const post = await prisma.post.update({
        where: { id: postId },
        data: {
            likes: {
                connect: {
                    id: userId,
                },
            },
        },
        include: {
            _count: true,
        },
    });

    res.status(201).json({ postLikeCount: post._count.likes });
};

export const deleteLike: RequestHandler = async (req, res) => {
    const userId = req.user.id;
    const postId = parseInt(req.params.id);
    const post = await prisma.post.update({
        where: { id: postId },
        data: {
            likes: {
                disconnect: {
                    id: userId,
                },
            },
        },
        include: {
            _count: true,
        },
    });

    res.status(201).json({ postLikeCount: post._count.likes });
};

export const createFollow: RequestHandler = async (req, res) => {
    const postId = Number.parseInt(req.params.id);
    const userId = req.user.id;

    console.log(userId);

    const post = await prisma.post.update({
        where: { id: postId },
        data: {
            follows: {
                connect: {
                    id: userId,
                },
            },
        },
        include: {
            _count: true,
        },
    });

    res.status(201).json({ postLikeCount: post._count.likes });
};

export const deleteFollow: RequestHandler = async (req, res) => {
    const userId = req.user.id;
    const postId = parseInt(req.params.id);
    const post = await prisma.post.update({
        where: { id: postId },
        data: {
            follows: {
                disconnect: {
                    id: userId,
                },
            },
        },
        include: {
            _count: true,
        },
    });

    res.status(201).json({ postLikeCount: post._count.likes });
};

export const getReplies: RequestHandler = async (req, res, next) => {
    const postId = Number.parseInt(req.params.id);
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

export const createReply: RequestHandler = async (req, res) => {
    const postId = parseInt(req.body.id);
    const body = req.body;
    body.userId = req.user.id;

    const reply = await prisma.reply.create({
        data: body
    })
    res.status(201).json({reply});
};


