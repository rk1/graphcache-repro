// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createSchema, createYoga } from "graphql-yoga";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

const schema = createSchema({
  typeDefs: `
    type Product {
      id: String!
      name: String!
      price: Int!
    }
    type Cart {
      id: String!
      total: Int!
      products: [Product]!
    }
    type Query {
      greetings: String
      cart: Cart
    }
  `,
  resolvers: {
    Query: {
      greetings: () => "This is the `greetings` field of the root `Query` type",
      cart: () => {
        if (Math.random() > 0.5) {
          throw new Error("aa");
        }

        return {
          id: "1",
          total: Math.floor(Math.random() * 20),
          products: [
            { id: 1, name: "Shoes", price: 16 },
            { id: 2, name: "Socks", price: 4 },
          ],
        };
      },
    },
  },
});

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
});
