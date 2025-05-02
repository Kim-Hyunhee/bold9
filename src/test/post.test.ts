import { resolvers } from '../graphql/resolvers';

test('createPost creates a post with correct input', async () => {
  const post = await resolvers.Mutation.createPost(
    {},
    {
      title: 'test2',
      content: 'graphql',
      authorId: '1',
      published: true,
    }
  );
  expect(post.title).toBe('test2');
  expect(post.content).toBe('graphql');
  expect(post.authorId).toBe(1);
  expect(post.published).toBe(true);
});
