import React, { useState } from 'react';

import { IconButton, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', 
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
}));

export default function PasswordInput({ label, id }) {
  const [ values, setValues ] = useState({
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <FormControl
      fullWidth
      required
      variant="outlined"
      margin="normal" 
      >
      <InputLabel htmlFor="password">{label}</InputLabel>
      <OutlinedInput
        id={id}
        label={`${label} *`}
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        onChange={handleChange('password')}
        endAdornment={
          <InputAdornment position="end" >
            <IconButton
              tabIndex="-1"
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
