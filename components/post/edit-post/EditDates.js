import React, { useContext } from 'react';
import 'date-fns';

import { Box } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { editPostContext, newPostContext } from '@/lib/AppContext';

export default function EditDates({ add }) {
  const [ editPost, setEditPost ] = useContext(editPostContext);
  const [ newPost, setNewPost ] = useContext(newPostContext);
  
  return (
    <Box style={{ width: '100%', textAlign: 'center' }}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          style={{ margin: "10px 10px 10px 10px"}}
          id="shoot-date"
          label="Shoot Date"
          format="MM/dd/yyyy"
          value={ add ? newPost.shootDate : editPost.shootDate }
          onChange={ (date) => { 
            if(add){
              return setNewPost({ ...newPost, shootDate: date });
            } else {
              return setEditPost({ ...editPost, shootDate: date });
            }
          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          />
        <KeyboardDatePicker
          style={{ margin: "10px 10px 20px 10px"}}
          id="publish-date"
          label="Publish Date"
          format="MM/dd/yyyy"
          value={ add ? newPost.publishDate : editPost.publishDate }
          onChange={ (date) => { 
            if(add){
              return setNewPost({ ...newPost, publishDate: date });
            } else {
              return setEditPost({ ...editPost, publishDate: date });
            }
          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          />
      </MuiPickersUtilsProvider>
    </Box>
  );
}