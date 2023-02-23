import React, { useContext } from 'react';

import { Box, TextField } from '@material-ui/core';

import { editPostContext, newPostContext } from '@/lib/AppContext';

export default function EditTitle({ add }) {
  const [ editPost, setEditPost ] = useContext(editPostContext);
  const [ newPost, setNewPost ] = useContext(newPostContext);


  const handleTitle = async (e,v) => {
    const title = e.target.value;
    if(add){
      setNewPost({...newPost, title});
    }
      setEditPost({...editPost, title });
  }

  return (
    <Box mb={1}>
      <TextField
        required
        value={add ? newPost.title.replace('_',' ') : editPost.title.replaceAll('_',' ')}
        onChange={handleTitle}
          variant="outlined"
          fullWidth
          id="title"
          label="Title"
          name="title"
        />  
    </Box>
  );
}