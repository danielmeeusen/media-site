import { Container, Box } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import { MobileVideo } from '@/components/post/mobile-post';
import Posts from '@/components/post/Posts';
import { PostTags, PostSponsors, PostPeople, ImagesAccordian } from '@/components/post/shared'; 

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '18px',
    fontWeight: '400',
  },
  date: {
    fontSize: '14px',
    marginTop: '3px',
    color: theme.palette.custom.fifty,
  },
  more: {
    fontSize: '15px',
    margin: '15px 0px 0px 0px'
  }
}))

export default function MobilePost({ post, desk }) {
  const classes = useStyles();
  let { tags, publishDate, people } = post;
  const title = post.title.replaceAll('_', ' ');
  const query = {
    type: 'more',
    keywords: tags,
    not: post.title,
    code: post.shootCode
  };
  query.keywords = query.keywords.concat(people);
  query.keywords.push(post.title);
  
  return (
    <Container maxWidth="sm" >
      
      <MobileVideo post={ post } desk={desk} />

      <Box style={{ margin: '0px -5px'}}>
        <div className={classes.title}>{ title }</div>

        <PostPeople post={post} />

        <div className={classes.date}>{publishDate}</div> 

        <PostSponsors post={post} />  
        
        <ImagesAccordian post={post} desk={desk} />

        <PostTags post={post} />    
      </Box>

      <div className={classes.more}>
        More Like this:
      </div>

      <Box style={{ margin: '0px -25px 0px -15px'}} >
        <Posts desk={desk} query={query} />
      </Box>
      
    </Container>
  );
}