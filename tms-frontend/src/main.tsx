import App from "./App.tsx";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

import { SetContextLink } from "@apollo/client/link/context";

import { SnackbarProvider } from "notistack";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = new SetContextLink(({ headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <SnackbarProvider
    maxSnack={3}
    autoHideDuration={1000}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
  >
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </SnackbarProvider>,
);
