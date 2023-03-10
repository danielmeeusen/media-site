import React, { useState, useContext } from 'react';

import { Box, Button, Typography } from '@material-ui/core/';

import { loadingContext } from '@/lib/AppContext';
import Msg from '@/components/shared/Msg';
import PasswordInput from '@/components/shared/PasswordInput';
import Link from '@/components/shared/Link';


export default function UpdatePassword() {
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

      <form onSubmit={handleUpdatePassword}>

        <PasswordInput label="Current Password" id="oldPassword" />

        <PasswordInput label="New Password" id="newPassword" />

        <PasswordInput label="Confirm New Password" id="confirmNewPassword" />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          style={{ borderRadius: '30px', margin: '20px 0px 20px 0px'}}
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
15