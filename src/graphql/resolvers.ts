import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    // 유저의 게시글과 게시글의 댓글 조회
    getUserPostsAndComments: async (_: any, args: { userId: string }) => {
      // string으로 받아서 int로 변환
      const parsedUserId = parseInt(args.userId, 10);

      const userWithPostsAndComments = await prisma.user.findUnique({
        where: { id: parsedUserId },
        include: {
          posts: {
            where: {
              published: true,
              content: {
                contains: 'graphql',
              },
            },
            include: {
              comments: true,
            },
          },
        },
      });

      if (!userWithPostsAndComments) {
        throw new Error('User not found');
      }

      const result = {
        user: userWithPostsAndComments,
        posts: userWithPostsAndComments.posts,
        comments: userWithPostsAndComments.posts.flatMap(
          (post) => post.comments
        ), // posts에 포함된 모든 댓글을 flat하게 합침
      };

      return result;
    },
  },
  Mutation: {
    // 유저 생성
    createUser: async (
      _: any,
      args: { name: string; password: string; email: string }
    ) => {
      return prisma.user.create({
        data: {
          name: args.name,
          password: args.password,
          email: args.email,
        },
      });
    },
    // 게시글 작성
    createPost: async (
      _: any,
      args: {
        title: string;
        content: string;
        published: boolean;
        authorId: string;
      }
    ) => {
      // string으로 받아서 int로 변환
      const parsedAuthorId = parseInt(args.authorId, 10);

      return prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
          published: args.published,
          author: {
            connect: { id: parsedAuthorId },
          },
        },
      });
    },
    // 댓글 작성
    createComment: async (
      _: any,
      args: { content: string; postId: string }
    ) => {
      // string으로 받아서 int로 변환
      const parsedPostId = parseInt(args.postId, 10);

      return prisma.comment.create({
        data: {
          content: args.content,
          post: {
            connect: { id: parsedPostId },
          },
        },
      });
    },
  },
};
