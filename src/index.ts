import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { resolvers } from './graphql/resolvers.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const moduleUrl = import.meta.url;
const __filename = fileURLToPath(moduleUrl);
const __dirname = path.dirname(__filename);

const typeDefs = readFileSync(
  path.join(__dirname, './graphql/schema.graphql'),
  {
    encoding: 'utf-8',
  }
);

const server = new ApolloServer({
  typeDefs, // GraphQL 스키마 정의 (문자열)
  resolvers, // Resolver 함수들
  // playground: true, // Apollo Server v4부터 playground는 Apollo Sandbox로 대체되며 별도 설정 필요
  // 아래 설정은 Apollo Sandbox를 활성화합니다.
  introspection: true, // 스키마 인트로스펙션 허용
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }, // 서버 포트 설정
    // context 함수를 통해 resolver에서 접근할 수 있는 context 객체를 설정할 수 있습니다.
    // 여기서는 간단히 생략하지만, 인증 정보 등을 전달할 때 사용합니다.
    // context: async ({ req, res }) => ({ token: req.headers.token }),
  });

  console.log(`🚀 Server ready at: ${url}`);
  console.log(`📚 GraphQL endpoint: ${url}`); // playground 대신 Sandbox가 해당 주소에서 제공됩니다.
}

startServer();
