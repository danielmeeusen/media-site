import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import { AppBar, Box, Dialog, IconButton, Tabs, Tab, useMediaQuery, Toolbar } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import { loginDialogContext, mobileBottomContext } from '@/lib/AppContext';
import { useCurrentUser, useSessions } from '@/lib/user/hooks';
import Login from '@/components/navigation/login/Login';
import Signup from '@/components/navigation/login/Signup';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box mt={4} mb={12} >
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function LoginDialog(props) {
  const theme = useTheme();
  const [ user ] = useCurrentUser();
  const [ sessions, { mutate } ] = useSessions();
  const [ loginDialog, setLoginDialog ] = useContext(loginDialogContext || { open: false, tab: 0 });
  const [ mobileBottom, setMobileBottom ] = useContext(mobileBottomContext);


  useEffect(() => {
    if(user){
      mutate(sessions);
      setLoginDialog({ ...loginDialog, open: false });    
      setMobileBottom('Home');
    }
  }, [user]);

  const handleClose = () => {
    setLoginDialog({ ...loginDialog, open: false });
    setMobileBottom('Home');
  };

  const handleChange = (event, index) => {
    setLoginDialog({ ...loginDialog, tab: index });
  };

  const handleChangeIndex = (index) => {
    setLoginDialog({ ...loginDialog, tab: index });
  };

  return (
    <Dialog
      fullScreen={useMediaQuery(theme.breakpoints.down('sm'))}
      open={loginDialog.open}
      onClose={handleClose}
      aria-labelledby="login-dialog"
    >
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Tabs
            value={loginDialog.tab}
            onChange={handleChange}
            indicatorColor="primary"
            textcolor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            style={{ marginTop: 6, width: '100%' }}
          >
            <Tab label="Login" {...a11yProps(0)} />
            <Tab label="Signup" {...a11yProps(1)} />
          </Tabs>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon fontSize="large" />
            </IconButton>
        </Toolbar>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={loginDialog.tab}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={loginDialog.tab || 0} index={0} dir={theme.direction}>
          <Login handleChange={handleChange} {...props} />
        </TabPanel>
        <TabPanel value={loginDialog.tab || 0} index={1} dir={theme.direction}>
          <Signup handleChange={handleChange} {...props} />
        </TabPanel>
      </SwipeableViews>
    </Dialog>
  );
}