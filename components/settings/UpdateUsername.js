import React, { useState, useContext, useRef } from 'react';

import { Button, TextField, Box } from '@material-ui/core/';

import { useCurrentUser } from '@/lib/user/hooks';
import { loadingContext } from '@/lib/AppContext';
import Msg from '@/components/shared/Msg';

export default function UpdateUsername() {
  const username = useRef(null);
  const [ user, { mutate } ] = useCurrentUser();
  const [ loading, setLoading ] = useContext(loadingContext);
  const [ msg, setMsg ] = useState({ message: '', isError: false });

  async function updateUsername(e) {
    e.preventDefault();
    setLoading(true);
    const body = {
      username: e.currentTarget.username.value,
    }
    const res = await fetch('/api/user/username/update', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      const userData = await res.json();
      mutate({
        user: {
          ...user,
          ...userData.user,
        },
      });
      username.current.value = "";
      setMsg({message: 'username successfully updated', isError: false});
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

    <form onSubmit={updateUsername} >
      <TextField
        required
        fullWidth
        variant="outlined"
        label="New Username"
        type="username"
        id="username"
        autoComplete="username"
        inputRef={username}
      />
      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        style={{ borderRadius: '30px', margin: '25px 0px 10px 0px'}}
      >
        Update Username
      </Button>
    </form>
  </Box>
  );
}