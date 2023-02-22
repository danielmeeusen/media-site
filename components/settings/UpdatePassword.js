import React, { useState, useContext } from 'react';

import { Box, Button, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import { loadingContext } from '@/lib/AppContext';
import Msg from '@/components/shared/Msg';
import PasswordInput from '@/components/shared/PasswordInput';
import Link from '@/components/shared/Link';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
}));

export default function UpdatePassword() {
  const classes = useStyles();
  const [loading, setLoading] = useContext(loadingContext);
  const [msg, setMsg] = useState({ message: '', isError: false });

  async function handleUpdatePassword(e) {
    e.preventDefault();
    setLoading(true);
      const body = {
        oldPassword: e.currentTarget.oldPassword.value,
        newPassword: e.currentTarget.newPassword.value,
        confirmNewPassword: e.currentTarget.confirmNewPassword.value,
      };

      const res = await fetch('/api/user/password/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.status === 200) {
        setMsg({ message: 'Password successfully updated', isError: false });
        setLoading(false);
      } else {
        setMsg({ message: await res.text(), isError: true });
        setLoading(false);
      }
    }

  return (
    <Box mt={-3} sx={{width: "100%"}} >
      <Box mb={1} align="center" >
        <Msg msg={msg} />
      </Box>

      <form className={classes.form} onSubmit={handleUpdatePassword}>

        <PasswordInput label="Current Password" id="oldPassword" />

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

      <Box mb={1}>
        <Link href="/recover-password">
          <Typography variant="body1" align="center">Can't remember your password?</Typography>
        </Link>
      </Box>

    </Box>
  );
};
