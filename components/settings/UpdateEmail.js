import React, { useState, useContext, useRef } from 'react';

import { Button, TextField, Box } from '@material-ui/core/';

import { useCurrentUser } from '@/lib/user/hooks';
import { loadingContext } from '@/lib/AppContext';
import Msg from '@/components/shared/Msg';


export default function UpdateEmail() {
  const email = useRef(null);
  const [user, { mutate }] = useCurrentUser();
  const [loading, setLoading] = useContext(loadingContext);
  const [msg, setMsg] = useState({ message: '', isError: false });

  async function sendVerificationEmail() {
    const res = await fetch('/api/user/email/verify', {
      method: 'POST',
    });
    if (res.status === 200) {
      setMsg({ message: 'A verification email has been sent your inbox', isError: false });
    } else {
      setMsg({ message: await res.text(), isError: true });
    }
  }

  async function updateEmail(e) {
    e.preventDefault();
    setLoading(true);
    const body = {
      email: e.currentTarget.email.value,
    }
    const res = await fetch('/api/user/email/update', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      await sendVerificationEmail();
      const userData = await res.json();
      mutate({
        user: {
          ...user,
          ...userData.user,
        },
      });
      email.current.value = "";
      setLoading(false);
    } else {
      setMsg({ message: await res.text(), isError: true });
      setLoading(false);
    }    
  };

  return (
    <Box mt={-3} sx={{width: "100%"}} >
      <Box mb={1} align="center" >
        <Msg msg={msg} />
      </Box>

    <form onSubmit={updateEmail}>
      <TextField
        required
        fullWidth
        variant="outlined"
        label="New Email"
        type="email"
        id="email"
        autoComplete="email"
        inputRef={email}
      />
      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        style={{ borderRadius: '30px', margin: '25px 0px 10px 0px'}}
      >
        Update Email
      </Button>
    </form>
  </Box>
  );
}