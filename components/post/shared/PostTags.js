import { Box, Chip } from '@material-ui/core/';

import Link from '@/components/shared/Link';

export default function PostTags({ post }) {
  return (
    <Box>
      {post.tags.map( (tag, i) => {
        const text = tag.replaceAll('_', ' ');
        return (
          <Link href={`/results?type=filter&keywords=${tag}`} key={tag}>
            <Chip 
              style={{ margin: "2px" }}
              color="secondary"
              size="small"
              label={text} 
              clickable 
              key={tag} 
          />
          </Link>
        );
      })}
    </Box>
  );
}
