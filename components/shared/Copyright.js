import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function Copyright() {
  const site = useSite();

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright © {new Date().getFullYear()} Media Site Inc
    </Typography>
  );
}