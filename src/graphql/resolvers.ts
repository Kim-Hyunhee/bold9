import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    users: () => {
      return prisma.user.findMany();
    },
    user: (_: any, args: { id: string }) => {
      return prisma.user.findUnique({
        where: { id: parseInt(args.id) },
        include: { posts: { include: { comments: true } } },
      });
    },
  },
  Mutation: {
    createUser: (
      _: any,
      args: { email: string; password: string; name?: string }
    ) => {
      const data: any = {
        email: args.email,
        password: args.password, // 비밀번호 해싱 필요
      };
      if (args.name !== undefined) {
        // name 인자가 제공된 경우에만 추가
        data.name = args.name;
      }
      return prisma.user.create({ data });
    },
    createPost: (
      _: any,
      args: { title: string; content?: string; authorId: string }
    ) => {
      const data: any = {
        title: args.title,
        authorId: parseInt(args.authorId),
      };
      if (args.content !== undefined) {
        // content 인자가 제공된 경우에만 추가
        data.content = args.content;
      }
      return prisma.post.create({ data });
    },
    createComment: (_: any, args: { content: string; postId: string }) => {
      return prisma.comment.create({
        data: {
          content: args.content,
          postId: parseInt(args.postId),
        },
      });
    },
  },
};
