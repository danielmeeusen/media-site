import React, { useState, useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import { loadingContext } from '@/lib/AppContext';
import { findTokenByIdAndType } from '@/api-lib/db';
import Link from '@/components/shared/Link';
import Msg from '@/components/shared/Msg';
import PasswordInput from '@/components/shared/PasswordInput';
import { getMongoDb } from '@/api-lib/mongodb';

import { Container, Box, Typography, Button } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

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

const ResetPasswordTokenPage = ({ valid, token }) => {
  const classes = useStyles();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useContext(loadingContext);
  const [msg, setMsg] = useState({ message: '', isError: false });


  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

      const body = {
        newPassword: event.currentTarget.newPassword.value,
        confirmNewPassword: event.currentTarget.confirmNewPassword.value,
        token,
      };

      const res = await fetch('/api/user/password/reset', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.status === 200) {
        setSuccess(true);
        setLoading(false);
      } else {
        setMsg({ message: await res.text(), isError: true });
        setLoading(false);
      }
    }

  return (
    <>
      {valid ? 
        success ? 
        <>
        <Head>
          <title>New Password Created</title>
        </Head>

        <Container component="main" maxWidth="sm" align="center">

          <LockOutlinedIcon  fontSize="large" style={{ marginBottom: 10, marginTop: "5%" }} />

          <Typography variant="body1" style={{ marginBottom: 10 }}>
            You have successfully created a new password! 
          </Typography>

          <Box my={3}>
            <Image 
              src="/image/thumbsup.gif" 
              alt="Kid giving thumbs up infront of computer" 
              width="320" 
              height="240" 
            />
          </Box>

          <Typography variant="body1" align="center" style={{ marginBottom: 10 }} >
            You may now login with your new password:  
          </Typography>
        
          <Link href="/login" >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.submit}
            >
              Login
            </Button>
          </Link>

        </Container>
      </> 
      :
        <>
          <Head>
          <title>Create New Password</title>
          </Head>

          <Container component="main" maxWidth="sm" align="center">

            <LockOutlinedIcon fontSize="large" style={{ marginBottom: 10, marginTop: "5%" }} />

            <Typography variant="h5" style={{ marginBottom: 10 }}>
              Create New Password
            </Typography>

            <Typography variant="body1" align="center" >
              Please choose a new password: 
            </Typography>

            <Box mt={1} >
              <Msg msg={msg} />
            </Box>

            <form className={classes.form} onSubmit={handleSubmit}>

              <PasswordInput label="New Password" id="newPassword" />

              <PasswordInput label="Confirm New Password" id="confirmNewPassword" />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Set New Password
              </Button>
            </form>
        </Container>
    </>
      :
    <>
        <Head>
          <title>Link Expired</title>
        </Head>

        <Container component="main" maxWidth="sm" align="center">

          <LockOutlinedIcon  fontSize="large" style={{ marginBottom: 10, marginTop: "5%" }} />

          <Typography variant="h5" style={{ marginBottom: 20 }}>
            Link Expired
          </Typography>

          <Typography variant="body1" align="center" style={{ marginBottom: 20 }} >
            Sorry it appears your link has expired. 
          </Typography>

          <Typography variant="body1" align="center" style={{ marginBottom: 20 }} >
            Please click the link below to create a new recovery request:  
          </Typography>
        
          <Link href="/recover-password" >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Request New Password
            </Button>
          </Link>

        </Container>
      </> 
      }
  </>
  );
};

export async function getServerSideProps(context) {  
  const db = await getMongoDb();

  const tokenDoc = await findTokenByIdAndType(
    db,
    context.params.token,
    'passwordReset'
  );

  return { props: { token, valid: !!tokenDoc } };
}

export default ResetPasswordTokenPage;
