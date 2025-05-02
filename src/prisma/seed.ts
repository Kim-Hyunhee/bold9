import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const postWithComments = {
    title: 'GraphQL Intro',
    content: 'Learn graphql basics',
    published: true,
    comments: {
      create: [{ content: 'Great post!' }, { content: 'Thanks for sharing.' }],
    },
  };

  const hiddenPost = {
    title: 'Hidden Post',
    content: 'This is not published',
    published: false,
  };

  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      password: 'password',
      email: 'alice@prisma.io',
      posts: {
        create: [postWithComments, hiddenPost],
      },
    },
  });

  console.log({ user });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
