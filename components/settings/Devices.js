import { getCookie } from 'cookies-next';

import { List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, IconButton, Divider, Typography, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ComputerIcon from '@material-ui/icons/Computer';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import CloseIcon from '@material-ui/icons/Close';

import { useSessions } from '@/lib/user/hooks';
import Link from '@/components/shared/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '0px, 10px, 0px, 10px',
    marginTop: '-15px',
  },
}));

export default function Devices(props) {
  const classes = useStyles();
  const [ sessions, { mutate } ] = useSessions();

  async function deleteSession(sessionId) {
    const body = {
      sessionId,
    };
    const res = await fetch('/api/user/sessions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
     await mutate({
        sessions: sessions.filter(s => s._id !== sessionId),
      });
    } else {
      console.log(await res.text());
    }
  }

  return (
    <div className={classes.root}>
      <Typography align="center">
        - Users are limited to 7 devices per account. 
      </Typography>
      <Typography align="center">
        - If you are seeing devices you do not recognize we recommend you: 
      </Typography>
      <Typography align="center">
      <Link href="/recover-password"> change your password</Link>
      </Typography>
      <List>        
        {sessions.map(s => {
          return (
            <div key={s._id}>
              <Divider />
              <ListItem>  
                <ListItemIcon style={{ marginLeft: '-10px' }} >
                  {s?.session?.ua?.isMobile ? <SmartphoneIcon color="secondary" fontSize="large" /> : <ComputerIcon color="secondary" fontSize="large" />}
                </ListItemIcon>
                <ListItemText
                  primary={`${s?.session?.ua?.os}, ${s?.session?.ua?.browser}`}
                  secondary={`${s?.session?.geo?.city}, ${s?.session?.geo?.country}`}
                />
                { getCookie('cid') === s?.session?.cid ? 
                <ListItemText 
                  style={{ textAlign: 'right' }}
                  secondary={'Current Device'}
                />
                :
                <ListItemSecondaryAction
                  style={{ cursor: 'pointer', marginRight: '-5px' }}
                  onClick={() => deleteSession(s._id)} 
                >
                  remove
                  <IconButton 
                    edge="end" 
                    aria-label="delete"                   
                  >
                    <CloseIcon fontSize="large" />
                  </IconButton>
                </ListItemSecondaryAction>
                }
              </ListItem>
            </div>
          )}
        )}
        </List>
    </div>
  );
}
