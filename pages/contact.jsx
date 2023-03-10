import React, { useState, useContext } from 'react';
import Head from 'next/head';
import Router from 'next/router';
// import ReCAPTCHA from "react-google-recaptcha";

import { Box, Button, TextField, Grid, Typography, Container } from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

import { useCurrentUser } from '@/lib/user/hooks';
import { loadingContext } from '@/lib/AppContext';
import Msg from '@/components/shared/Msg';


export default function Contact() {
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
            
      <div style={{ textAlign: 'center' }}>
          <MailOutlineIcon fontSize="large" style={{ marginTop: "3%" }} />

        <Typography component="h1" variant="h5" style={{ marginBottom: 10 }}>
          Contact
        </Typography>

        <Box>
          <Msg msg={msg} />
        </Box>

        <form onSubmit={handleSubmit}>          
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
                defaultValue={user ? user?.username : ''}
                variant="outlined"
                margin="normal"
                fullWidth
                name="username"
                label="User Name"
                autoComplete="username"
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
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ borderRadius: '30px', margin: '30px 0px' }}
          >
            Send
          </Button>

        </form>
      </div>
    </Container>
    </>
  );
}