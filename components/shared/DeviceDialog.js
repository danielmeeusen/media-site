import React, { } from 'react';
import Router from 'next/router';

import { Dialog, useMediaQuery, Typography, Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { useSessions } from '@/lib/user/hooks';
import Devices from '@/components/settings/Devices';


export default function DeviceDialog() {
  const theme = useTheme();
  const [ sessions ] = useSessions();

  return (
    <Dialog
      fullScreen={useMediaQuery(theme.breakpoints.down('sm'))}
      open={sessions?.length > 5 && Router.pathname !== '/recover-password'}
      aria-labelledby="device-dialog"
      scroll="paper"
    >
      <Box mt={2} mb={10} mx={3} >
        <Box my={3}>
          <Typography variant="h6" align="center">
            Too many logged in devices.
          </Typography>
        </Box>
        <Devices />
      </Box>
    </Dialog>
  );
}