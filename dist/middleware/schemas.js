import { z } from 'zod';
import { NotificationSettings, Roles } from '../../generated/prisma/index.js';
const userLazy = z.lazy(() => User);
const postLazy = z.lazy(() => Post);
const replyLazy = z.lazy(() => Reply);
export const User = z.object({
    id: z.number().int().nonnegative().optional(),
    email: z.email(),
    name: z.string().max(50, 'at most 50 chars'),
    username: z.string().min(5, 'at least 5 chars').max(50, 'at most 50 chars'),
    password: z.string(),
    verified: z.boolean().optional(),
    roles: z.enum(Roles).array().optional(),
    notificationSettings: z.enum(NotificationSettings).array().optional(),
    posts: z.array(postLazy).optional(),
    postsLiked: z.array(postLazy).optional(),
    postReplies: z.array(replyLazy).optional(),
});
export const Account = User.pick({
    name: true,
    username: true,
    email: true,
    password: true,
})
    .extend({
    password: z
        .string()
        .min(8, 'at least 8 chars')
        .max(24, 'at most 24 chars')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
        .regex(/[0-9]/, 'Password must contain at least one number'),
})
    .strict();
export const Login = User.pick({
    username: true,
    password: true,
}).strict();
export const UserUpdate = User.partial().omit({ roles: true }).strict();
export const Post = z.object({
    id: z.number().int().nonnegative().optional(),
    title: z.string().min(7),
    body: z.string().min(10),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    userId: z.number().int().nonnegative().optional(),
    published: z.boolean().default(false),
    tags: z.string().array().optional(),
    likes: z.array(userLazy).optional(),
    author: userLazy.optional(),
    replies: z.array(replyLazy).optional(),
});
export const PostUpdate = Post.pick({
    body: true,
    title: true,
    tags: true,
    published: true,
}).strict();
export const Reply = z.object({
    id: z.number().int().nonnegative().optional(),
    body: z.string().min(1),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    userId: z.number().int().nonnegative().optional(),
    postId: z.number().int().nonnegative(),
    author: userLazy.optional(),
    post: postLazy.optional(),
});
