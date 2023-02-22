import React from 'react';
import { Typography } from '@material-ui/core/';
import { useTheme } from '@material-ui/core/styles';


export default function Msg(props) {
  const { msg } = props;
  const theme = useTheme();
  
  return (  
    <>  
    {msg?.message ? 
      <Typography align="center" style={{ color: msg.isError ? "Orchid" : "LightSeaGreen", width: '100%', alignText: 'center' }}>
        {msg?.message}
        </Typography>
      :
      <Typography style={{color: theme.palette.background.paper, cursor: "default"}} >message</Typography>
      }
    </>
  );
}