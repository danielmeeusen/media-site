import React, { useState, useContext } from 'react';

import { Button, Box, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import { loadingContext } from '@/lib/AppContext';
import Msg from '@/components/shared/Msg';


const useStyles = makeStyles((theme) => ({
  verify: {
    marginBottom: '15px',
    padding: '25px 15px 25px 15px',
    backgroundColor: theme.palette.background.paper,
  },
  verifyButton: {
    width: '100%',
    margin: 0,
  }
}));

export default function VerifyEmail({ user }) {
  const classes = useStyles();
  const [loading, setLoading] = useContext(loadingContext);
  const [msg, setMsg] = useState({ feild: '', message: '', isError: false });

  async function sendVerificationEmail() {
    setLoading(true);
    const res = await fetch('/api/user/email/verify', {
      method: 'POST',
    });
    if (res.status === 200) {
      setLoading(false);
      setMsg({ feild: 'verification', message: 'An email has been sent to your mailbox' });
    } else {
      setLoading(false);
      setMsg({ message: await res.text(), isError: true });
    }
  }

  return (
    <>
      { !user?.emailVerified &&
        <div className={classes.verify}>
          <Typography>Your email is not yet verified:</Typography>
            <Box mb={1} align="center" >
              <Msg msg={msg} />
            </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.verifyButton}
            onClick={sendVerificationEmail}
          >
            Verify Email
          </Button>
        </div>
      }
    </>
  );
}