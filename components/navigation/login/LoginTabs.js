import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import { AppBar, Box, IconButton, Tabs, Tab, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import { loginDialogContext, mobileBottomContext } from '@/lib/AppContext';
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

export default function LoginDialog() {
  const theme = useTheme();
  const [ loginDialog, setLoginDialog ] = useContext(loginDialogContext);
  const [ mobileBottom, setMobileBottom ] = useContext(mobileBottomContext);


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
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={Number(loginDialog.tab)}
          onChange={handleChange}
          indicatorColor="primary"
          textcolor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
          style={{ marginTop: 6}}
        >
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Signup" {...a11yProps(1)} />
          
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={Number(loginDialog.tab)}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={Number(loginDialog.tab)} index={0} dir={theme.direction}>
          <Login handleChange={handleChange} />
        </TabPanel>
        <TabPanel value={Number(loginDialog.tab)} index={1} dir={theme.direction}>
          <Signup handleChange={handleChange} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}