import React, {  useContext, useState, useRef } from 'react';
import 'date-fns';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetch';
import { formatTag } from '@/lib/post';

import { Typography, Box, TextField, Chip, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { editPostContext, newPostContext } from '@/lib/AppContext';
import Msg from '@/components/shared/Msg';

export default function EditSponsor({ add }) {
  const itemRef = useRef();  
  const nameRef = useRef();
  const linkRef = useRef();
  const [ editPost, setEditPost ] = useContext(editPostContext);
  const [ newPost, setNewPost ] = useContext(newPostContext);
  const [ msg, setMsg ] = useState({ message: '', isError: false });
  const [ url, setUrl ] = useState('Sponsor Link');
  const items = useSWR(`/api/tag?type=items`, fetcher);
  const sponsors = useSWR(`/api/tag?type=sponsors`, fetcher);
  const allItems = items.data && items?.data.map(e=>e.name);
  const sponsorNames = sponsors.data && sponsors?.data.map(e=>e.name);

  const editSponsor = async (e,v) => {
    const item = await formatTag(itemRef.current.value);
    const name = await formatTag(nameRef.current.value);
    const link = linkRef.current.value || url;

    if(item && name && link){
      let postSponsors = add ? newPost.sponsors : editPost.sponsors;
      let newSponsor = new Array(item, name, link);

      if(allItems.indexOf(item) < 0) {
        const body = { 'name': item, type: 'items' };
        const res = await fetch('/api/tag', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if(res.status === 200) {
          setMsg({ message: `${item.replaceAll('_',' ')} added`, isError: false});
        } else {
          setMsg({ message: await res.text(), isError: true });
        }
      }
      
      if(sponsorNames.indexOf(name) < 0) {
        const body = { name, type: 'sponsors', link };
        const res = await fetch('/api/tag', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if(res.status === 200) {
          setMsg({ message: `${name.replaceAll('_',' ')} added`, isError: false});
        } else {
          setMsg({ message: await res.text(), isError: true });
        }
      }
      postSponsors.push(newSponsor);
      if(add){
        setNewPost({...newPost, sponsors: postSponsors });
      } else {
        setEditPost({...editPost, sponsors: postSponsors });
      }
      setUrl('Sponsor Link');
    }
  }

  const getSponsorLink = async (e,v) => {
    if(v){
      const tag = await fetcher(`/api/tag?name=${v.replaceAll(' ','_')}`);
      if(tag){
        setUrl(tag.link);
      } 
    }
  }

  return (
    <Box mb={1}>
      <Box mt={1}>
       {msg.message && <Msg msg={msg} />}
      </Box>

      <Box mb={1}>
        {add ? 
          newPost.sponsors?.length ? 
            newPost.sponsors.map((e,i) => {
              return(
                <Chip 
                  style={{ margin: '2px 0px' }}
                  key={e}
                  onDelete={(i) => { 
                    return setNewPost({...newPost, sponsors: newPost.sponsors.filter(i => i !== e)})}
                  }
                  color="primary"
                  label={`${e[0].replaceAll('_',' ')} | ${e[1]} | ${e[2]}`}
                />
              )})
          :
            <Typography align="center">no sponsored items</Typography>          
        : 
          editPost.sponsors?.length ? 
            editPost.sponsors.map((e,i) => {
              return(
                <Chip 
                  style={{ margin: '2px 0px' }}
                  key={e}
                  onDelete={(i) => { 
                    return setEditPost({...editPost, sponsors: editPost.sponsors.filter(i => i !== e)})}
                  }
                  color="primary"
                  label={`${e[0].replaceAll('_',' ')} | ${e[1]} | ${e[2]}`}
                />
              )})
          :
          <Typography align="center">no sponsored items</Typography>          
        }
      </Box>

      <Box mb={1}>
        {allItems &&
          <Autocomplete
            selectOnFocus
            id="itemName"
            options={allItems?.map(e=>e.replaceAll('_',' ')) || []}
            blurOnSelect
            freeSolo
            renderInput={(params) => (
              <TextField 
                {...params} 
                inputRef={itemRef}
                label="Item Name" 
                variant="outlined" 
              />
              )}
            />
          }
      </Box>

      <Box my={1}>
        <Autocomplete
          onChange={(e,v) => getSponsorLink(e,v)}
          selectOnFocus
          id="sponsorName"
          options={sponsorNames?.map(e=>e.replaceAll('_',' ')) || []}
          blurOnSelect
          freeSolo
          renderInput={(params) => (
            <TextField 
              {...params} 
              inputRef={nameRef}
              label="Sponsor Name" 
              variant="outlined" 
            />
            )}
        />
      </Box>

      <Box mb={1}>
        <TextField
            inputRef={linkRef}
            variant="outlined"
            fullWidth
            id="sponsorLink"
            label={url}
            name="sponsorLink"
          /> 
      </Box>

        <Button
          style={{ borderRadius: '30px' }}
          onClick={editSponsor}
          fullWidth
          variant="contained"
          color="primary"
        >
          add sponsor
        </Button>
    </Box>
  );
}