import { resolvers } from '../graphql/resolvers';

describe('Resolvers', () => {
  it('should return user, posts and comments correctly', async () => {
    // GraphQL 쿼리 실행
    const result = await resolvers.Query.getUserPostsAndComments(null, {
      userId: '1',
    });

    // 결과 검증
    expect(result.user.id).toBe(1);
    expect(result.posts.length).toBe(36);
    expect(result.comments.length).toBe(36);
    expect(result.comments[0].content).toBe('Great post!');
  });

  it('should throw error if user is not found', async () => {
    await expect(
      resolvers.Query.getUserPostsAndComments(null, { userId: '999' })
    ).rejects.toThrow('User not found');
  });
});

test('createUser creates a user with correct input', async () => {
  const user = await resolvers.Mutation.createUser(
    {},
    { email: 'test2@example.com', name: 'Test', password: '1234' }
  );
  expect(user.email).toBe('test2@example.com');
  expect(user.name).toBe('Test');
  expect(user.password).toBe('1234');
});
