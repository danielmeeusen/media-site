import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Link from '../components/Link';

import { Container, Typography, Button, CssBaseline, TextField, Grid, Box, IconButton } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';


import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import CloseIcon from '@material-ui/icons/Close';

import { useCurrentUser } from '@/lib/user/hooks';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },

}));


export default function Login() {
  const classes = useStyles();
  const [errorMsg, setErrorMsg] = useState('');
  const [user, { mutate }] = useCurrentUser();
  
  useEffect(() => {
    // redirect to home if user is authenticated
    if (user)  Router.push('/')
  }, [user]);

  async function onSubmit(e) {
    e.preventDefault();
    const body = {
      login: e.currentTarget.login.value,
      password: e.currentTarget.password.value,
    };
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      const userObj = await res.json();
      mutate(userObj);
      Router.back();
    } else {
      setErrorMsg('Incorrect username or password. Try again!');
    }
  }

  return (
    <>
    <Head>
    <title>Login</title>
    </Head>
    <Container component="main" maxWidth="xs">
        <CssBaseline />        
      <Grid container justifyContent="flex-end">
        <Grid item>
          <IconButton fontSize="large" onClick={() => Router.back()} >
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>

    <div className={classes.paper}>
        <LockOpenOutlinedIcon  fontSize="large" style={{ marginBottom: 10 }} />

      <Typography component="h1" variant="h5" style={{ marginBottom: 10 }}>
        Log In
      </Typography>

      <Box style={{ marginTop: 10, marginBottom: 5 }} >
        {errorMsg ?
        <span style={{ color: "MediumVioletRed"}}>{errorMsg}</span>
        :
        <span style={{color: "black", cursor: "default"}} >login</span>}
      </Box>

      <form className={classes.form} onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="login"
          label="Username or Email"
          name="login"
          autoComplete="login"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Log In
        </Button>
        <Grid container direction="column" alignItems="center">
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item style={{ paddingTop: 10 }}>
            <Link href="/signup" variant="body2">
             Sign up for an account for free!
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
    <Box mt={8}>
    </Box>
  </Container>
  </>
  );
}