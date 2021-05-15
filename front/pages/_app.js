import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    // Deixa branco no começo
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body {
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const theme = {
  colors: {
    primary: "#1da1f2",
    secondary: "#14171A",
    darkGray: "#202327",
    lightGray: "#AAB8C2",
    extraLightGray: "#E1E8ED",
    hiperLightGray: "#F5F8FA"
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
