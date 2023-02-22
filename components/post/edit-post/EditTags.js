import React, {  useContext, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetch';
import { formatTag } from '@/lib/post';


import { Typography, Box, TextField, Chip } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { editPostContext, newPostContext } from '@/lib/AppContext';
import Msg from '@/components/shared/Msg';

export default function EditTags({ add }) {
  const [ editPost, setEditPost ] = useContext(editPostContext);
  const [ newPost, setNewPost ] = useContext(newPostContext);
  const [ msg, setMsg ] = useState({ message: '', isError: false });
  const { data } = useSWR(`/api/tag?type=tags`, fetcher);
  const allTags = data?.map(i=>i.name);
  
  const handleTags = async (e, v) => {
    if(!add) setEditPost({...editPost, tags: editPost.tags.filter(e => isNaN(e))})
    if(v) v = formatTag(v);
    if(add){
      if(v && (newPost.tags.indexOf(v) < 0)) {
        let newTags = newPost.tags;
        newTags.push(v);
        setNewPost({...newPost, tags: newTags});
      }
    } else {
      if(v && (editPost.tags.indexOf(v) < 0)) {
        let newTags = editPost.tags;
        newTags.push(v);
        setEditPost({...editPost, tags: newTags});
        }
      }
    if(v && (allTags.indexOf(v)) < 0) {
      const body = { name: v, type: 'tags'};
      const res = await fetch('/api/tag', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if(res.status === 200) {
        allTags.push(v);
        setMsg({ message: `${v.replaceAll('_',' ')} added`, isError: false});
      } else {
        setMsg({ message: await res.text(), isError: true });
      }
    }
  }

  return (
    <Box>
      <Box mt={1}>
        {msg.message && <Msg msg={msg} />}
      </Box>

      <Box mb={1}>
        {add ?
          newPost.tags?.length ?
            newPost.tags.map((t, i) => {
              return (
                <Chip 
                  style={{ margin: '2px' }}
                  key={t}
                  onDelete={(i) => { 
                    return setNewPost({...newPost, tags: newPost.tags.filter(i => i !== t)})}
                  }
                  color="primary"
                  label={t.replaceAll('_', ' ')} 
                />
              );
            })
          :
        <Typography align="center">
          no tags yet
        </Typography>
        :
        editPost.tags?.length ?
          editPost.tags.map((t, i) => {
            return (
              <Chip 
                style={{ margin: '2px' }}
                key={t}
                onDelete={(i) => { 
                  return setEditPost({...editPost, tags: editPost.tags.filter(i => i !== t)})}
                }
                color="primary"
                label={t.replaceAll('_', ' ')} 
              />
            );
          })
        :
        <Typography align="center">
          no tags yet
        </Typography>
        }

      </Box>

      <Autocomplete
        onChange={(e,v) => handleTags(e,v)}
        selectOnFocus
        id="tags"
        options={allTags?.map(e=>e.replaceAll('_',' ')) || []}
        freeSolo
        renderInput={(params) => (
          <TextField 
            {...params} 
            label="Tags" 
            variant="outlined" 
            />
        )}
      />
    </Box>
  );
}