import React, { useState, useContext } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetch';

import { Typography, Box, TextField, Chip } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { editPostContext, newPostContext } from '@/lib/AppContext';
import { formatTag } from '@/lib/post';
import Msg from '@/components/shared/Msg';

export default function EditPeople({ add }) {
  const [ editPost, setEditPost ] = useContext(editPostContext);
  const [ newPost, setNewPost ] = useContext(newPostContext);
  const [ msg, setMsg ] = useState({ message: '', isError: false });
  const { data } = useSWR(`/api/tag?type=people`, fetcher);
  const allPeople = data?.map(i=>i.name);

  const handlePeople = async (e,v) => {
    if(v) v = formatTag(v);
    
    if(add){
      if(v && (newPost.people.indexOf(v) < 0)) {
        let newPeople = newPost.people;
        newPeople.push(v);
        setNewPost({...newPost, people: newPeople});
      }
    } else {
      if(v && (editPost.people.indexOf(v) < 0)) {
        let newPeople = editPost.people;
        newPeople.push(v);
        setEditPost({...editPost, people: newPeople});
      }
    }
    if(v && (allPeople.indexOf(v)) < 0) {
      const body = { name: v, type: 'people' };
      const res = await fetch('/api/tag', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if(res.status === 200) {
        allPeople.push(v);
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
          newPost.people.length ?
            newPost.people.map((p, i) => {
              return (
                <Chip 
                  style={{ margin: '2px' }}
                  key={p}
                  onDelete={(i) => { 
                    return setNewPost({...newPost, people: newPost.people.filter(i => i !== p)})}
                  }
                  color="primary"
                  label={p.replaceAll('_', ' ')} 
                />
            );
          })
          :
          <Typography align="center">
            no people yet
          </Typography>
          :
          editPost.people.length ?
            editPost.people.map((p, i) => {
              return (
                <Chip 
                  style={{ margin: '2px' }}
                  key={p}
                  onDelete={(i) => { 
                    return setEditPost({...editPost, people: editPost.people.filter(i => i !== p)})}
                  }
                  color="primary"
                  label={p.replaceAll('_', ' ')} 
                />
            );
          })
          :
          <Typography align="center">
            no people yet
          </Typography>
        }
      </Box>

      <Autocomplete
        freeSolo
        onChange={(e,v) => handlePeople(e,v)}
        id="people"
        options={allPeople?.map(i=>i.replaceAll('_', ' ')) || []}
        blurOnSelect
        renderInput={(params) => (
          <TextField 
            {...params}
            label="People" 
            variant="outlined"
            />
        )}
      />
    </Box>
  );
}