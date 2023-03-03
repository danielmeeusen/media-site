import React, { useEffect, useContext } from 'react';
import Head from 'next/head';
import Router from 'next/router';

import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core/';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useCurrentUser, useSessions } from '@/lib/user/hooks';
import { SettingsHeader, VerifyEmail, UpdateUsername, UpdateEmail, UpdatePassword, DeleteAccount, Devices, ManageSubscription } from '@/components/settings';
import { settingsContext } from '@/lib/AppContext';

export default function Settings() {
  const [ user ] = useCurrentUser();
  const [ settings, setSettings ] = useContext(settingsContext);
  const [ sessions ] = useSessions();  

  
  useEffect(() => {
    if (!user) {
      Router.push('/');
    }
  }, [user]);

  const handleAccordion = (panel) => (e, isExpanded) => {
    setSettings(isExpanded ? panel : false);
  };

  if(user){
  return (
    <>
      <Head>
      <title>Settings</title>
      </Head>

      <Container maxWidth='md'>

      <SettingsOutlinedIcon 
        fontSize="large"
        style={{ fontSize: '60px', margin: 'auto', display: 'block', marginTop: '7%' }} 
        color="secondary"
      />

      <Typography variant="h6" style={{ marginBottom: 10 }} align="center" >
      Account Settings
      </Typography>

        <Box my={2}>
        <VerifyEmail user={user} />

        <Accordion expanded={settings === 'subscriptions'} onChange={handleAccordion('subscriptions')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="manage subscriptions"
              id="subscriptions-header"
            >
              <SettingsHeader header="Subscription" content={user?.epoch?.Customer?.Status || "No current subscriptions"}/>

            </AccordionSummary>

            <AccordionDetails>
              <ManageSubscription />           
            </AccordionDetails>

        </Accordion>

        <Accordion expanded={settings === 'devices'} onChange={handleAccordion('devices')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="logged in devices"
            id="devices-header"
          >
            <SettingsHeader header="Devices" content={"Currently Logged in Devices"}/>

          </AccordionSummary>

          <AccordionDetails>
            {sessions ?
            <Devices user={user} />
            :
            <Typography variant="body1" style={{ textAlign: 'center' }}>
              No Devices Found.
            </Typography>
            } 
          </AccordionDetails>

        </Accordion>

          <Accordion expanded={settings === 'username'} onChange={handleAccordion('username')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="change username"
              id="username-header"
            >
              <SettingsHeader header="Username" content={user?.username}/>

            </AccordionSummary>

            <AccordionDetails>
              <UpdateUsername />          
            </AccordionDetails>

          </Accordion>

          <Accordion expanded={settings === 'email'} onChange={handleAccordion('email')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="change email"
              id="email-header"
            >
              <SettingsHeader header="Email" content={user?.email}/>

            </AccordionSummary>

            <AccordionDetails>
            
              <UpdateEmail />

            </AccordionDetails>
          </Accordion>

          <Accordion expanded={settings === 'password'} onChange={handleAccordion('password')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="change password"
              id="password-header"
            >
              <SettingsHeader header="Password" content="Change Password" />

            </AccordionSummary>

            <AccordionDetails>

              <UpdatePassword />

            </AccordionDetails>
          </Accordion>

          <Accordion expanded={settings === 'delete'} onChange={handleAccordion('delete')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="delete account"
              id="delete-account-header"
            >
              <SettingsHeader header="Delete" content="Delete Your Account" />

            </AccordionSummary>

            <AccordionDetails>

              <DeleteAccount />

            </AccordionDetails>
          </Accordion>

        </Box>
    </Container>
  </>
  );
  } else {
    return <></>;
  }
}
