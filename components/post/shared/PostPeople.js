import { Box } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import Link from '@/components/shared/Link';

const useStyles = makeStyles((theme) => ({
  with: {
    fontSize: "16px",
    color: theme.palette.custom.sixtyFive,
  },
  withLink: {
    color: theme.palette.custom.eightyFive,
    '&:hover': {
      color: theme.palette.primary.dark
    }
  }
}));

export default function PostPeople({ post }) {
  const classes = useStyles();
  let { people } = post;
 
  return (
    <Box className={classes.with}>
      {people.map( (person, i) => {
        return (
        <div style={{display: 'inline'}} key={person} >
          <Link href={`/results?type=filter&keywords=${person}`} >
            <span className={classes.withLink} >{` ${person.replaceAll('_', ' ')}`}</span>
          </Link>
          {people.length > 2 && i !== people.length-1 && ','}
          {i === people.length - 2 && ` and`}
        </div>
        )}
      )}
    </Box>
  );
}