import * as React from 'react';
import { BlogPost } from 'docs/lib/sourcing';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from '@mui/docs/Link';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

interface SpotlightProps {
  posts: BlogPost[];
}

function Spotlight({ posts }: SpotlightProps) {
  return (
    <Container>
      <Box
        component="ul"
        sx={{
          display: 'grid',
          mt: 2,
          mb: 12,
          p: 0,
          gap: 2,
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          maxWidth: '100%',
        }}
      >
        {posts.map((post, index) => (
          <Paper
            key={index}
            component="li"
            variant="outlined"
            sx={(theme) => ({
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              backgroundImage: (theme.vars || theme).palette.gradients.radioSubtle,
              boxShadow: '0 4px 12px rgba(170, 180, 190, 0.2)',
              ...theme.applyDarkStyles({
                background: (theme.vars || theme).palette.primaryDark[900],
                backgroundImage: (theme.vars || theme).palette.gradients.radioSubtle,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
              }),
            })}
          >
            {post.image && (
              <Box
                component="img"
                src={post.image}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px',
                  boxShadow: '0 -0.5px 2px gray',
                }}
              />
            )}
            <Divider />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
              }}
            >
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <Button
                component={Link}
                href={`/blog/${post.slug}`}
                endIcon={<ArrowForwardIcon />}
                size="small"
                sx={{ ml: -1 }}
              >
                Read the story
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}

interface CustomersSpotlightProps {
  customers: BlogPost[];
}

export default function CustomersSpotlight({ customers }: CustomersSpotlightProps) {
  const firstPosts = customers.slice(0, 2);

  return <Spotlight posts={firstPosts} />;
}
