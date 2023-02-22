import React, { useContext } from 'react';

import { Box, TextField } from '@material-ui/core';

import { editPostContext, newPostContext } from '@/lib/AppContext';


export default function AddVideo({ add }) {
  const [ editPost, setEditPost ] = useContext(editPostContext);
  const [ newPost, setNewPost ] = useContext(newPostContext);

  const handleMainVideo = (e,v) => {
    if(add){
      setNewPost({...newPost, mainVideoId: e.target.value});
    } else {
      setEditPost({...editPost, mainVideoId: e.target.value});
    }
  }

  const handlePromoVideo = (e,v) => {
    if(add){
      setNewPost({...newPost, promoVideoId: e.target.value});
    } else {
      setEditPost({...editPost, promoVideoId: e.target.value});
    }
  }

  return (
    <>
      <Box mb={2}>
        <TextField
          value={add ? newPost.promoVideoId : editPost.promoVideoId}
          onChange={handlePromoVideo}
          variant="outlined"
          fullWidth
          id="promoVideoId"
          label="Promo Video ID"
          name="promoVideoId"
        />  
      </Box>

      <Box mt={3} mb={1} >
        <TextField
          value={add ? newPost.mainVideo : editPost.mainVideoId}
          onChange={handleMainVideo}
          variant="outlined"
          fullWidth
          id="mainVideoId"
          label="Main Video ID"
          name="mainVideoId"
        />   
      </Box>  

    </>
  );
}