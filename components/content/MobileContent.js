import React, { useContext } from 'react';
import {Typography, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  
}))

export default function MobileContent() {

  const classes = useStyles();

  return (
    <React.Fragment>
    <Box my={4}>      
    <Typography variant="h4" align="center" >
          Hipster Ipsum
        </Typography>
        </Box>

        <Typography variant="body1" align="center" paragraph>
        I'm baby woke blog authentic messenger bag sartorial flannel shaman lomo marfa hell of asymmetrical slow-carb tofu. Snackwave retro adaptogen austin godard vegan. Authentic ugh artisan, paleo tousled XOXO 8-bit hexagon kale chips vegan. Vape austin authentic kitsch.
        </Typography>
        
        <Typography variant="body1" align="center" paragraph>
        Gochujang succulents blue bottle hot chicken, paleo schlitz before they sold out selvage readymade jianbing. Marfa cloud bread tote bag whatever, chillwave polaroid brooklyn. 90's intelligentsia cornhole lyft schlitz edison bulb synth, tilde glossier. Street art portland jean shorts quinoa, cloud bread flexitarian helvetica taxidermy cray biodiesel af post-ironic kale chips viral.
        </Typography>

        <Typography variant="body1" align="center" paragraph>
        Stumptown succulents kogi retro raclette butcher. Aesthetic plaid succulents narwhal, copper mug thundercats echo park twee. Fixie hoodie echo park fanny pack hella marfa la croix locavore beard. Subway tile hexagon mlkshk 3 wolf moon vaporware, godard cliche cardigan venmo try-hard taxidermy farm-to-table. Affogato truffaut taiyaki fanny pack chambray, glossier four dollar toast. You probably haven't heard of them austin microdosing migas meggings synth food truck venmo tousled authentic hashtag portland.
        </Typography>
        
        <Typography variant="body1" align="center" paragraph>
        Migas intelligentsia disrupt chicharrones. Food truck cliche fashion axe plaid brunch helvetica bushwick. Small batch echo park thundercats photo booth blue bottle lomo put a bird on it. Bitters artisan jianbing prism man braid quinoa. Lomo aesthetic tbh migas.
        </Typography>

        <Typography variant="body1" align="center" paragraph>
        Bitters stumptown brooklyn cold-pressed pitchfork pabst. Mustache gastropub knausgaard beard hexagon flannel semiotics umami dreamcatcher trust fund craft beer franzen. Chartreuse cray deep v la croix wayfarers helvetica 90's coloring book cronut green juice banh mi brunch vaporware irony. La croix try-hard kickstarter tumblr pour-over actually sartorial. Yuccie ennui tumeric tote bag, slow-carb poke DIY. Lyft taiyaki pickled pabst tote bag flannel, kinfolk meggings.
        </Typography>

        <Typography variant="body1" align="center" paragraph>
        Dummy text? More like dummy thicc text, amirite?
        </Typography>
        </React.Fragment>
  );
}