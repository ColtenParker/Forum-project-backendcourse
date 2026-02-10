import { email, z } from 'zod';
import { NotificationSettings } from '../../generated/prisma/index.js';

const userLazy: z.ZodLazy<any> = z.lazy(() => User);
const postLazy: z.ZodLazy<any> = z.lazy(() => Post);
const replyLazy: z.ZodLazy<any> = z.lazy(() => Reply);

export const User = z.object({
    id: z.number().int().nonnegative().optional(),
    email: z.email(),
    username: z.string().min(5, 'at least 5 chars').max(50, 'at most 50 chars'),
    verified: z.boolean().default(false),
    NotificationSettings: z.enum(NotificationSettings).array().optional(),
    posts: z.array(postLazy).optional(),
    postsLiked: z.array(postLazy).optional(),
    postReplies: z.array(replyLazy).optional(),
});

export const UserUpdate = User.partial();

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
