import React from 'react';

import { Box } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import Link from '@/components/shared/Link';

const useStyles = makeStyles((theme) => ({
  sponsor: {
    fontSize: '16px',
    marginTop: '10px',
    color: theme.palette.custom.sixtyFive,
  },
  sponsorLink: {
    fontSize: '15px',
    display: 'inline',
    color: theme.palette.custom.eightyFive,
    '&:hover': {
      color: theme.palette.primary.dark
    }
  },

  }));

export default function PostSponsors({ post }) {
  const classes = useStyles();

  return (
    <Box className={classes.sponsor}>
      {post.sponsors.map( (sponsor, i) => {
        return (
        <div style={{ display: 'inline' }} key={sponsor[1]} >
          <span>{i==0 ? sponsor[0].replaceAll('_',' ') : ` | ${sponsor[0].replaceAll('_',' ')}` } by: </span>
          <Link href={`https://${sponsor[2]}`} target="new">
            <span className={classes.sponsorLink}>{sponsor[1].replaceAll('_', ' ')}</span>
          </Link>
        </div>
        )}
      )}
      </Box>
  );
}
