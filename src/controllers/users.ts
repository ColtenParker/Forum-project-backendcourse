import { RequestHandler } from 'express';
import prisma from '../prisma.js';

export const getUsers: RequestHandler = async (req, res) => {
    const users = await prisma.user.findMany();
    res.json({ users });
};

export const createUser: RequestHandler = async (req, res) => {
    const user = await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
        },
    });
    res.status(201).json({ user });
};

export const getUser: RequestHandler = async (req, res, next) => {
    const id = Number.parseInt(req.params.id as string);
    const user = await prisma.user.findFirst({
        where: { id: id },
        include: {
            posts: true,
        },
    });

    if (!user) {
        return next(new Error('404'));
    }

    res.json({ user });
};

export const updateUser: RequestHandler = (req, res) => {
    res.json({ message: 'hit' });
};

export const deleteUser: RequestHandler = (req, res) => {
    res.json({ message: 'hit' });
};

export const getUserPosts: RequestHandler = (req, res) => {
    res.json({ message: 'hit' });
};

export const getUserLikedPosts: RequestHandler = (req, res) => {
    res.json({ message: 'hit' });
};

export const getUserFollowedPosts: RequestHandler = (req, res) => {
    res.json({ message: 'hit' });
};
