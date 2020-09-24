import { getAuth } from '../../utils/common';
import App from 'next/app';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import NavBar from '../../components/NavBar';
import PropTypes from 'prop-types';
import React from 'react';
import theme from '../../utils/theme';
import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    paddingTop: 56,
    paddingBottom: 52
  },
}));

export default function MyApp(props) {
  const classes = useStyles();

  const { Component, pageProps, user } = props;

  // React.useEffect(() => {
  //   // Remove the server-side injected CSS.
  //   const jssStyles = document.querySelector('#jss-server-side');
  //   if (jssStyles) {
  //     jssStyles.parentElement.removeChild(jssStyles);
  //   }
  // }, []);

  return (
    <React.Fragment>
      <Head>
        <title>myInventory</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <NavBar {...pageProps} />
        <Container fixed className={classes.rootContainer}>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
};
