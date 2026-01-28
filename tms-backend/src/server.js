require("dotenv").config();
const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

const http = require("http");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");

const connectDB = require("./config/db");
const schema = require("./graphql/schema");

const jwt = require("jsonwebtoken");
const User = require("./models/user");

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB();

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
  });

  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || "";
        if (!token) return {};

        try {
          const decoded = jwt.verify(
            token.replace("Bearer ", ""),
            process.env.JWT_SECRET,
          );
          const user = await User.findById(decoded.id);
          return { user };
        } catch {
          return {};
        }
      },
    }),
  );

  await new Promise((resolve) => httpServer.listen(PORT, resolve));

  console.log(`Server ready at http://localhost:${PORT}/graphql`);
};

startServer();
