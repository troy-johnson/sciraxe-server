// const { GraphQLServer } = require("graphql-yoga");
import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from 'prisma-binding';
// const { Prisma } = require('prisma-binding')

const resolvers = {
  Query: {
    info: () => `Sciraxe API`,
    feed: (root, args, context, info) => {
      return context.db.query.links({}, info)
    },
  },
  Mutation: {
    post: (root, args, context, info) => {
      return context.db.mutation.createLink({
        data: {
          url: args.url,
          description: args.description,
        },
      }, info)
    },
  },
}

const server = new GraphQLServer({
  typeDefs: "src/schema.graphql",
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://us1.prisma.sh/troy-johnson-4e96b5/sciraxe-database/dev',
      secret: 'greenIce4',
      debug: true
    })
  })
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
