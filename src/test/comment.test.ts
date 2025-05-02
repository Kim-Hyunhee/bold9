import { resolvers } from '../graphql/resolvers';

test('createComment creates a comment with correct input', async () => {
  const comment = await resolvers.Mutation.createComment(
    {},
    {
      content: 'graphql',
      postId: '1',
    }
  );
  expect(comment.content).toBe('graphql');
  expect(comment.postId).toBe(1);
});
