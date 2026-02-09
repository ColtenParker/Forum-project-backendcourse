import prisma from './prisma.js';

await prisma.post.deleteMany();
await prisma.user.deleteMany();

await prisma.user.createMany({
    data: [
        {
            name: 'Colten Parker',
            email: 'coltenparker00@gmail.com',
            username: 'Options',
        },
        {
            name: 'DJ Wallace',
            email: 'dj8694@yahoo.com',
            username: 'DJ8694',
        },
        {
            name: 'May Parker',
            email: 'mariaparker.mdp@gmail.com',
            username: 'minimushroomms',
        },
    ],
});

const user = await prisma.user.findFirst();

await prisma.post.createMany({
    data: [
        { title: 'first post!', body: 'My first post!!!', userId: user?.id! },
        {
            title: 'follow up post!',
            body: 'My first post, cont',
            userId: user?.id!,
        },
    ],
});
