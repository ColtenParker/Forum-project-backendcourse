import { RequestHandler } from 'express';
import prisma from '../prisma.js';
import bcrypt from 'bcrypt';

export const getUsers: RequestHandler = async (req, res) => {
    const users = await prisma.user.findMany();
    res.json({ users });
};

export const createUser: RequestHandler = async (req, res) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const userDb = await prisma.user.create({
        data: { ...req.body, password: hashedPassword },
    });

    const { password, ...user } = userDb;

    res.status(201).json({ user });
};

export const getUser: RequestHandler = async (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id: id },
        include: {
            posts: true,
        },
    });

    if (!user) {
        return next(new Error('404'));
    }

    res.send({ user });
};

export const updateUser: RequestHandler = async (req, res) => {
    const userId = req.user.userId;
    const user = await prisma.user.update({
        where: { id: userId },
        data: req.body,
    });

    res.send({ user });
};

export const deleteUser: RequestHandler = async (req, res) => {
    const userId = req.user.userId;
    const result = await prisma.user.delete({
        where: { id: userId },
    });

    res.sendStatus(200);
};

export const getUserPosts: RequestHandler = async (req, res, next) => {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            posts: true,
        },
    });
    if (!user) {
        return next(new Error('404'));
    }

    res.send({ posts: user.posts });
};

export const getUserLikedPosts: RequestHandler = async (req, res, next) => {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            likedPosts: true,
        },
    });
    if (!user) {
        return next(new Error('404'));
    }

    res.send({ posts: user.likedPosts });
};

export const getUserFollowedPosts: RequestHandler = async (req, res, next) => {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            followedPosts: true,
        },
    });
    if (!user) {
        return next(new Error('404'));
    }

    res.send({ posts: user.followedPosts });
};
