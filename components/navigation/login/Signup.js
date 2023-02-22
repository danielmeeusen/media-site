import React, { useState, useContext } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { setCookie } from 'cookies-next';

import { Box, Button, TextField, Typography, Container, FormControlLabel, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOutlined';

import { useCurrentUser } from '@/lib/user/hooks';
import { loadingContext, loginDialogContext } from '@/lib/AppContext';
import Msg from '@/components/shared/Msg';
import PasswordInput from '@/components/shared/PasswordInput';
import { subscribeLink } from '@/lib/user/utils';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '72vh',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    cursor: 'pointer',
    color: '#dc00ff',
    marginTop: 15,
    '&:hover': {
      color: '#f3a8ff',
      textDecoration: 'none',
    }
  }
}));

export default function SignUp({ ip, ua, displayMode, handleChange }) {
  const classes = useStyles();
  const [ user, { mutate } ] = useCurrentUser();
  const [ msg, setMsg ] = useState({ message: '', isError: false });
  const [ checked, setChecked ] = useState(false);
  const [ loading, setLoading ] = useContext(loadingContext);
  const [ loginDialog, setLoginDialog ] = useContext(loginDialogContext);
  
  async function sendVerification() {
    const res = await fetch('/api/user/email/verify', { method: 'POST' });
    if (res.status === 200) {
      setMsg({ message: 'A verification email has been sent your inbox', isError: false });
    } else {
      setMsg({ message: await res.text(), isError: true });
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);    
    const body = {
      username: e.currentTarget.username.value,
      email: e.currentTarget.email.value,
      confirmEmail: e.currentTarget.confirmEmail.value,
      password: e.currentTarget.password.value,
      confirmPassword: e.currentTarget.confirmPassword.value,
      displayMode,
      ua,
      ip,
    };
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.status === 201) {
      const userObj = await res.json();
      setCookie('cid', userObj.user.cid);
      mutate(userObj);
      if(checked == true) {
        window.open(subscribeLink(userObj.user), '_newtab');
      }
      await sendVerification();
      Router.push(`/send-verification/${userObj.user.username}`);
      setLoading(false);
      setLoginDialog({...loginDialog, open: false});
    } else {
      setMsg({ message: await res.text(), isError: true });
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      
      <Container component="main" maxWidth="sm" align="center">
        <div className={classes.paper}>
          <LockOpenOutlinedIcon fontSize="large" style={{marginBottom: 10 }} />

          <Typography component="h1" variant="h5" style={{ marginBottom: 10 }}>
            Sign Up
          </Typography>

          <Typography variant="body1">
            Please login as normal if you were a member of the previous site.
          </Typography>
          
          <Box my={1}>
            <Msg msg={msg} />
          </Box>

          <form onSubmit={handleSignUp}>
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
            />     
            <Box my={2}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email"
                type="email"
                name="email"
                autoComplete="email"
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Confirm Email"
                type="email"
                name="confirmEmail"
                autoComplete="email"
              />
            </Box>

            <PasswordInput label="Password" id="password" />

            <PasswordInput label="Confirm Password" id="confirmPassword" />

            <Box mt={2}>
              <FormControlLabel
                name="checked"
                control={
                  <Switch 
                    color="primary"
                    checked={checked} 
                    onChange={() => {setChecked(!checked)}} 
                  />}
                label="Purchase Subscritpion"
                />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create Account
            </Button>
            <Typography 
              align="center" 
              onClick={ () => handleChange(null, 0) } 
              textalign='center'
              className={classes.link}
            >
              Already have an account? Login
            </Typography>
          </form>
        </div>
      </Container>
    </>  
)
}

