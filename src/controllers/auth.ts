import { RequestHandler } from 'express';
import env from 'dotenv';
import prisma from '../prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

env.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export const login: RequestHandler = async (req, res) => {
    const { username } = req.body;

    const user = await prisma.user.findUnique({
        where: { username },
    });

    if (!user) {
        return res.status(401).json({ message: 'Invalid username' });
    }

    const passwordValid = await bcrypt.compare(
        req.body.password,
        user.password,
    );

    if (!passwordValid) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        {
            expiresIn: '6h',
        },
    );

    res.json({ token });
};
