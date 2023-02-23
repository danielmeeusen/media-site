import React, { useState, useContext } from 'react';
import { setCookie } from 'cookies-next';
import Head from 'next/head';

import { Container, Typography, Button, TextField, Box } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';

import { mobileBottomContext, loginDialogContext } from '@/lib/AppContext';
import { useCurrentUser } from '@/lib/user/hooks';
import { loadingContext } from '@/lib/AppContext';

import Link from '@/components/shared/Link';
import Msg from '@/components/shared/Msg';
import PasswordInput from '@/components/shared/PasswordInput';

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

export default function Login({ ua, displayMode, handleChange }) {
  const classes = useStyles();
  const [ mobileBottom, setMobileBottom ] = useContext(mobileBottomContext);
  const [ loginDialog, setLoginDialog ] = useContext(loginDialogContext);
  const [ msg, setMsg ] = useState({ message: '', isError: false });
  const [ user, { mutate } ] = useCurrentUser();
  const [ loading, setLoading ] = useContext(loadingContext);
  const [ locked, setLocked ] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const body = {
      login: e.currentTarget.login.value,
      password: e.currentTarget.password.value,
      displayMode,
      ua,
    };
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if(res.status === 200) {
      const userObj = await res.json();
      setCookie('cid', userObj.user.cid);
      mutate(userObj);
      setLoading(false);
      setMobileBottom('Home');
      setLoginDialog({...loginDialog, open: false});
    } else if (res.status === 429) {
      setLoading(false);
      setLocked(true);
    } else{
      setLoading(false);
      setMsg({ message: await res.text(), isError: true })
    }
  }
  
  const handleLink = () => {
    setLoginDialog({ ...loginDialog, open: false });
    setMobileBottom('Home');
  }

  return (
    <>
      <Head>
      <title>Login</title>
      </Head>
      
      <Container component="main" maxWidth="sm">

      <div className={classes.paper}>
        <LockOpenOutlinedIcon  fontSize="large" style={{ marginBottom: 10 }} />

      <Typography variant="h5" style={{ marginBottom: 10 }}>
        Log In
      </Typography>

      {locked ? 
        <Box my={3}>
        <Typography variant="h6" style={{ marginBottom: 20 }} >
          Sorry but you are only allowed 20 login attempts per day 😥
        </Typography>

        <Typography variant="body1" style={{ marginBottom: 20 }} >
          Either you forgot your password or someone is trying to break into your account, either way you should probably reset your password:
        </Typography>        

        <Link href="/recover-password" >
          <Button
            onClick={() => setLoginDialog({ ...loginDialog, open: false })}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Reset Password
          </Button>
          </Link>
        </Box>
        :
          <>
        <Box>
          <Msg msg={msg} />
        </Box>

        <form onSubmit={handleLogin}  >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label="Username or Email"
            name="login"
            autoComplete="login"
          />

          <PasswordInput label="Password" id="password" />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
        </form>

          <Typography 
            align="center" 
            onClick={handleLink} 
            textalign='center' 
            style={{ marginTop: 15 }}   
            >
            <Link href="/recover-password">
              Forgot password?
            </Link>
          </Typography>

          <Typography 
            align="center" 
            onClick={ () => handleChange(null, 1) } 
            textalign='center'
            className={classes.link}
            >
              Sign up for an account for free!
          </Typography>
        </>
      }
    </div>
  </Container>
  </>
  );
}