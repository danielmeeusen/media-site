import React, { useState, useContext } from 'react';
import Head from 'next/head';
import Router from 'next/router';
// import ReCAPTCHA from "react-google-recaptcha";

import { Box, Button, TextField, Grid, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

import { useCurrentUser } from '@/lib/user/hooks';
import { loadingContext } from '@/lib/AppContext';
import Link from '../components/shared/Link';
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
    margin: theme.spacing(5, 0, 2),
  },
}));

export default function Contact() {
  const classes = useStyles();
  const [ user ] = useCurrentUser();
  const [msg, setMsg] = useState({ message: '', isError: false });
  const [loading, setLoading] = useContext(loadingContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const body = {
      email: e.currentTarget.email.value,
      confirmEmail: e.currentTarget.confirmEmail.value,
      username: e.currentTarget.username.value,
      subject: e.currentTarget.subject.value,
      message: e.currentTarget.message.value,
    };

    if (body.email !== body.confirmEmail ) {
      setLoading(false);
      setMsg({ message: "Email address does not match", isError: true });
      return;
    };

    const res = await fetch('/api/contact-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      setLoading(false);
      Router.push('/sent');
    } else {
      setLoading(false);
      setMsg({ message: await res.text(), isError: true });
    }
  };

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  return (
    <>
    <Head>
      <title>Contact</title>
    </Head>

    <Container component="main" maxWidth="sm">            
            
      <div className={classes.paper}>

        <MailOutlineIcon fontSize="large" style={{marginBottom: 10,  marginTop: "5%" }} />

        <Typography component="h1" variant="h5">
          Contact
        </Typography>

        <Box my={1}>
          <Msg msg={msg} />
        </Box>

        <form className={classes.form} onSubmit={handleSubmit}>          
          <Grid container spacing={4} justifyContent="center">

            <Grid item xs={12}>
              <TextField
                defaultValue={user?.email}
                variant="outlined"
                required
                fullWidth
                name="email"
                label="Email"
                autoComplete="email"
                type="email"
              />
            </Grid>   

            <Grid item xs={12}>
              <TextField
                defaultValue={user?.email}
                variant="outlined"
                required
                fullWidth
                name="confirmEmail"
                label="Confirm Email"
                autoComplete="email"
                type="email"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="username"
                label="User Name"
                autoComplete="username"
                defaultValue={user ? user?.username : ''}
                type="username"
              />
            </Grid>            

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="subject"
                label="Subject"
                autoComplete="subject"
                type="text"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                multiline={true}
                minRows={6}
                required
                fullWidth
                name="message"
                label="Message"
                type="text"
              />
            </Grid>

          </Grid>

          {/* <Grid item xs={12} style={{ marginTop: "30px", marginLeft: "22%" }}>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={onChange}
              theme="dark"
            />
          </Grid> */}

          <Button
            className={classes.submit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Send
          </Button>
        </form>

      </div>
    </Container>
    </>
  );
}