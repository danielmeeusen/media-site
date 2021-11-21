import React, { useState, useEffect} from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useCurrentUser } from '@/lib/user/hooks';
import Link from '../components/Link';

import { Box, Button, CssBaseline, TextField, Grid, Typography, Container, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CloseIcon from '@material-ui/icons/Close';

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
    margin: theme.spacing(5, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [user, { mutate }] = useCurrentUser();
  const [errorMsg, setErrorMsg] = useState('');
  const [msg, setMsg] = useState();

  async function sendVerificationEmail() {
    const res = await fetch('/api/user/email/verify', {
      method: 'POST',
    });
    if (res.status !== 200) {
      setMsg({ message: await res.text(), isError: true });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      username: e.currentTarget.username.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.status === 201) {
      const userObj = await res.json();
      mutate(userObj);
      sendVerificationEmail();
      Router.push(`/send-verification/${body.username}`);
    } else {
      setErrorMsg(await res.text());
    }
  };

  if(user) {
    return (
      <Container component="main" maxWidth="xs">
          <Box
          sx={{
            mt: 15,
            fontSize: 18
          }}>
          You are already logged in as <Box fontWeight='fontWeightBold' display='inline'>{user?.username}</Box>.
          <Box mt={3} >
          Please logout if you'd like to make a new account.
          </Box>
          </Box> 
        </Container>
    )
  }
  return (
    <>
    <Head>
    <title>Join</title>
    </Head>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Grid container justifyContent="flex-end">
        <Grid item>
          <IconButton onClick={() => Router.back()} >
            <CloseIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
      
      <div className={classes.paper}>
          <LockOutlinedIcon fontSize="large" style={{marginBottom: 10}} />

        <Typography component="h1" variant="h5" style={{ marginBottom: 10 }}>
          Sign Up
        </Typography>
        
        <Box my={2}>
        {errorMsg ?
        <span style={{ color: "MediumVioletRed"}} >{errorMsg}</span>
        :
        <span style={{color: "black", cursor: "default"}} >sign up </span>}
        </Box>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={4}   justifyContent="center">

          <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                type="username"
                name="username"
                autoComplete="username"
                autoFocus
              />
            </Grid>

          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                type="email"
                name="email"
                autoComplete="email"
              />
            </Grid>   
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                type="password"
                name="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Join
          </Button>
          <Grid container justifyContent="center" style={{ marginTop: 10 }}>
            <Grid item>
              <Link href="/login" variant="body1">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </>
  );
}