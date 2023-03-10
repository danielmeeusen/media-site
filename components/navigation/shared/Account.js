import React from 'react';
import date from 'date-and-time';

import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, Divider } from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LockIcon from '@material-ui/icons/Lock';
import MailIcon from '@material-ui/icons/Mail';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import DescriptionIcon from '@material-ui/icons/Description';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';

import { useCurrentUser } from '@/lib/user/hooks';

import Link from '@/components/shared/Link';

const useStyles = makeStyles((theme) => ({
  username: {
    fontSize: '26px', 
    color: theme.palette.custom.seventyFive,
  },
  creator: {
    fontSize: '16px',
    color: theme.palette.custom.seventyFive,
  },
  subscription: {
    color: theme.palette.custom.seventyFive,
  },
  link: {
    color: theme.palette.text.primary,
    fontSize: '16px',
  },
  icon: {
    color: theme.palette.custom.eightyFive,
    marginBottom: '-5px',
    marginLeft: '10px',
    padding: '10px'
  },
  logout: {
    fontSize: '16px', 
    color: theme.palette.custom.sixtyFive,
  },
  logoutIcon: {
    color: theme.palette.custom.sixtyFive,
    marginBottom: '-5px',
    marginLeft: '10px',
    padding: '10px'
  }
}));

export default function Account({ toggleDrawer }) {
  const classes = useStyles();
  const [ user, { mutate }] = useCurrentUser();
  let { NextBillDate, PasswordRemovalDate } = user?.epoch?.Customer;
    
    return (
      <>
        <ListItem onClick={ toggleDrawer(false) } >
          <ListItemText align="center">
            <AccountCircleIcon style={{ fontSize: '120px', marginTop: '-35px'}} color="secondary" />
          </ListItemText>
        </ListItem>

        <ListItem onClick={ toggleDrawer(false)} style={{ marginTop: '-25px' } }>
          <ListItemText align="center" >
            <span className={classes.username} >
              {user?.username} 
            </span> 
          </ListItemText>
        </ListItem>

        <ListItem onClick={ toggleDrawer(false)} style={{ marginTop: '-20px', fontSize: "20px" }} >
          <ListItemText align="center" >
            <span className={classes.creator} >
              { user?.creator && 'Creator' } 
            </ span>
          </ListItemText>
        </ListItem>

        <ListItem onClick={ toggleDrawer(false)} >
          <ListItemText align="center" >
            <span className={classes.subscription} >
              { Date.parse(NextBillDate) ? 'Next Bill:' : Date.parse(PasswordRemovalDate) > Date.now() ? 'Subscription Expires:' : 'Not Currently Subscribed' } 
            </span>
          </ListItemText>
        </ListItem>

        <ListItem onClick={ toggleDrawer(false)} style={{ marginTop: '-10px', marginBottom: '10px' }}>
          <ListItemText align="center">
            <span className={classes.subscription} >
              { Date.parse(NextBillDate) ? date.format(new Date(NextBillDate), 'MMM DD, YYYY') : Date.parse(PasswordRemovalDate) > Date.now() ? date.format(new Date(PasswordRemovalDate), 'MMM DD, YYYY') : '' } 
            </span>
          </ListItemText>
        </ListItem>

        <Divider/> 

        <Link href="/settings" >
          <ListItem button onClick={toggleDrawer(false)} className={classes.menuItem} >
            <span className={classes.icon}> <SettingsIcon /> </span>
            <ListItemText>
              <span className={classes.link}> Settings </span> 
            </ListItemText>
          </ListItem>
        </Link>

        <Divider/>             
          
        <ListItem button onClick={ toggleDrawer('logout') } className={classes.menuItem} >
          <span className={classes.logoutIcon}> <LockIcon /> </span>
          <ListItemText >
            <span className={classes.logout}> Logout </span> 
          </ListItemText>
        </ListItem>

        <Divider />          

        <Link href="/settings" >
          <ListItem button onClick={toggleDrawer('subscriptions')} className={classes.menuItem} >
            <span className={classes.icon}> <CreditCardIcon /> </span>
            <ListItemText>
              <span className={classes.link} > Subscriptions </span> 
            </ ListItemText>
          </ListItem>
        </Link>  

        <Divider/>

        <Link href="/contact" >
          <ListItem button onClick={toggleDrawer(false)} className={classes.menuItem} >
            <span className={classes.icon}> <MailIcon /></span>
            <ListItemText>
              <span className={classes.link} > Contact </span> 
            </ ListItemText>
          </ListItem>
        </Link>

        <Divider/>  

        <Link href="https://twitter.com/danmeeusen" target="_new">
          <ListItem button className={classes.menuItem} >
            <span className={classes.icon} > <TwitterIcon /> </span>
            <ListItemText>
              <span className={classes.link} > Twitter </span> 
            </ListItemText>
          </ListItem>
        </Link>

        <Divider/>  

        <Link href="https://github.com/danielmeeusen" target="_new">
          <ListItem button className={classes.menuItem} >
            <span className={classes.icon}> <GitHubIcon /> </span>
              <ListItemText>
                <span className={classes.link} > GitHub </span> 
            </ ListItemText>
          </ListItem>
        </Link>  

        <Divider/>   

        <Link href="/about" >
          <ListItem button onClick={toggleDrawer(false)} className={classes.menuItem} >
            <span className={classes.icon}> <DescriptionIcon /> </span>
            <ListItemText>
              <span className={classes.link} > About </span> 
            </ListItemText>
          </ListItem>
        </Link>

        <Divider/>
        
        <Link href="/privacy" >
          <ListItem button onClick={toggleDrawer(false)} className={classes.menuItem} >
            <span className={classes.icon}> <VisibilityOffIcon /> </span>
            <ListItemText >
              <span className={classes.link} > Privacy Policy </span> 
            </ListItemText>
          </ListItem>
        </Link>

        <Divider />
      </>
    );
}