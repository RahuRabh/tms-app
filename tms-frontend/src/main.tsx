import { createRoot } from "react-dom/client";
import { SnackbarProvider } from "notistack";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./apollo/apolloClient.ts";
import App from "./App.tsx";

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
