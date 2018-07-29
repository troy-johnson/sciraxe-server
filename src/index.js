const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "test"
  },
  {
    id: "link-1",
    url: "www.troy-johnson.com",
    description: "its-a-me"
  }
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `Sciraxe API`,
    feed: () => links,
    link: args => {
      for (let i; i < links.length; i++) {
        console.log(links[i]);
        if (links[i].id === args.id) {
          return links[i];
        } 
      }
    }
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    delete: (root, args) => {
      for (let i; i < links.length; i++) {
        if (links[i].id === args.id) {
          links.splice(i, 1);
        }
      }
      return links;
    },
    put: (root, args) => {
      for (let i; i < links.length; i++) {
        if (links[i].id === id) {
          (links[i].url = args.url), (links[i].description = args.description);
        }
      }
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "src/schema.graphql",
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
