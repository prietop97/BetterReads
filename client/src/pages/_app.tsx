import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import theme from "../theme";
import { ApolloProvider } from "@apollo/client";
import withApollo from "../lib/withApollo";

function MyApp({ Component, pageProps, apolloClient }: any) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default withApollo(MyApp);
