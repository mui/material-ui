import * as React from 'react';
import { BlogPost } from 'docs/lib/sourcing';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from '@mui/docs/Link';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { useColorScheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface SpotlightProps {
  posts: BlogPost[];
  variant?: 'primary' | 'secondary';
}

function Spotlight({ posts, variant = 'primary' }: SpotlightProps) {
  const { mode } = useColorScheme();

  return (
    <Container>
      <Box
        component="ul"
        sx={{
          display: 'grid',
          mt: 4,
          mb: variant === 'primary' ? -2 : 0,
          p: 0,
          gap: 2,
          gridTemplateColumns:
            variant === 'primary'
              ? 'repeat(auto-fit, minmax(300px, 1fr))'
              : 'repeat(auto-fit, minmax(200px, 1fr))',
          maxWidth: '100%',
        }}
      >
        {posts.map((post, index) => (
          <Paper
            key={index}
            component={Link}
            href={`/case-studies/${post.slug}`}
            variant="outlined"
            sx={(t) => ({
              p: variant === 'primary' ? 3 : 2,
              minHeight: variant === 'primary' ? '250px' : '180px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              backgroundImage: (t.vars || t).palette.gradients.linearSubtle,
              boxShadow: '0 4px 12px rgba(170, 180, 190, 0.2)',
              textDecoration: 'none',
              color: 'inherit',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              overflow: 'hidden',
              '&:hover': {
                backgroundImage: (t.vars || t).palette.gradients.radioSubtle,
              },
            })}
          >
            {post.image && (
              <Box // TODO: standardize the logo sizes and colors
                component="img"
                alt="Company Logo"
                src={mode === 'dark' ? post.image.replace('light', 'dark') : post.image}
                sx={{
                  position: variant === 'primary' ? 'absolute' : 'relative',
                  top: variant === 'primary' ? 30 : 'auto',
                  left: variant === 'primary' ? 30 : 'auto',
                  alignSelf: variant === 'secondary' ? 'center' : 'auto',
                  mt: variant === 'secondary' ? 5 : 0,
                  mb: variant === 'secondary' ? 'auto' : 0,
                  maxWidth: '100%',
                  maxHeight: variant === 'primary' ? '50px' : '40px',
                  width: 'auto',
                  zIndex: 1,
                  opacity: 0.9,
                  ...(mode === 'dark' && {
                    filter:
                      'brightness(0) saturate(100%) invert(97%) sepia(5%) saturate(112%) hue-rotate(177deg) brightness(95%) contrast(98%)',
                  }),
                }}
              />
            )}
            {variant === 'primary' && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  mt: 10,
                  gap: 2,
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    color: 'text.primary',
                    textAlign: 'left',
                    lineHeight: 1.2,
                    fontSize: '1.2rem',
                  }}
                >
                  {post.description}
                </Typography>
                <Button
                  endIcon={<ArrowForwardIcon />}
                  size="small"
                  sx={{
                    ml: -1,
                    mt: 1,
                    pointerEvents: 'none',
                    color: 'primary.light',
                    alignSelf: 'flex-start',
                    textAlign: 'left',
                  }}
                >
                  Read story
                </Button>
              </Box>
            )}
            {variant === 'secondary' && (
              <Button
                endIcon={<ArrowForwardIcon />}
                size="small"
                sx={{
                  ml: -1,
                  mb: 1,
                  pointerEvents: 'none',
                  color: 'primary.light',
                  alignSelf: 'center',
                }}
              >
                Read story
              </Button>
            )}
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
  const firstPosts = customers.slice(0, 3); // TODO:show 6 with description, then the rest without description in different styling
  const restPosts = customers.slice(3);

  return (
    <React.Fragment>
      <Spotlight posts={firstPosts} />
      <Spotlight posts={restPosts} variant="secondary" />
    </React.Fragment>
  );
}
