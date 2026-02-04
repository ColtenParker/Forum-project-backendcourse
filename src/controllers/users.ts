import express, { Request, Response } from 'express';
import User from '../models/users.js';



const getMany = async (req: Request, res: Response) => {
    const users = await User.getMany();
    res.render('users', { users });
};

const get = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const user = await User.get(Number.parseInt(id))
    res.render('user', { user });
};

export default {get, getMany};