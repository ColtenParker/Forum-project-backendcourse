import { email, z } from 'zod';
import { NotificationSettings } from '../../generated/prisma/index.js';

export const User = z.object({
    id: z.number().int().nonnegative().optional(),
    email: z.email(),
    username: z.string().min(5, 'at least 5 chars').max(50, 'at most 50 chars'),
    verified: z.boolean().optional(),
    NotificationSettings: z.enum(NotificationSettings).array().optional(),
    posts: z.array(z.lazy(() => Post)).optional(),
    postsLiked: z.array(z.lazy(() => Post)).optional(),
    postReplies: z.array(z.lazy(() => Reply)).optional(),
});

export const UserUpdate = User.partial();

export const Post = z.object({
    id: z.number().int().nonnegative().optional(),
});

export const Reply = z.object({
    id: z.number().int().nonnegative().optional(),
});
