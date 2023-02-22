import React, { useState, useContext } from 'react';
import Head from 'next/head';

import { Container, Typography, Button, TextField, Box } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import { loadingContext } from '@/lib/AppContext';
import Msg from '@/components/shared/Msg';

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

export default function recoverPassword() {
  const classes = useStyles();
  const [msg, setMsg] = useState({ message: '', isError: false });
  const [loading, setLoading] = useContext(loadingContext);


  async function resetPassword(e) {
    e.preventDefault(e);
    setLoading(true);

    const body = { email: e.currentTarget.email.value };
    
    const res = await fetch('/api/user/password/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      setLoading(false);
      setMsg({ message: `An email has been sent to: ${body.email}` });
    } else {
      setLoading(false);
      setMsg({ message: await res.text(), isError: true });
    }
  }

  return (
    <>
      <Head>
      <title>Recover Password</title>
      </Head>
      <Container component="main" maxWidth="sm" align="center" >

          <VpnKeyIcon  fontSize="large" style={{ marginBottom: 10, marginTop: "5%" }} />

          <Typography variant="h5" style={{ marginBottom: 10 }}>
            Recover Password
          </Typography>

      <Box my={3}>
        <Typography variant="body1" align="center" >
          Please enter the email address linked to your account:
        </Typography>

        <Box mt={1} >
          <Msg msg={msg} />
        </Box>

        <form className={classes.form} onSubmit={resetPassword}>
          <TextField
            variant="outlined"
            margin="normal"
            type="email"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send Recovery Email
          </Button>
        </form>
      </Box>
    </Container>
    </>
  );
}