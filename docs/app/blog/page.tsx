import * as React from 'react';
import { getAllBlogPosts } from 'docs/lib/sourcing';
import Box from '../Box';
import Section from '../Section';
import Divider from '../Divider';
import Typography from '@mui/material/Typography';
import Paper from '../Paper';
import GradientText from '../GradientText';
import HeroEnd from './HeroEnd';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import PostPreview from './PostPreview';

export default function Blog() {
  const data = getAllBlogPosts();

  const { allBlogPosts, tagInfo: rawTagInfo } = data;
  const [firstPost, secondPost, ...otherPosts] = allBlogPosts;

  const tagInfo = { ...rawTagInfo };
  [firstPost, secondPost].forEach((post) => {
    post.tags.forEach((tag) => {
      if (tagInfo[tag]) {
        tagInfo[tag]! -= 1;
      }
    });
  });

  Object.entries(tagInfo).forEach(([tagName, tagCount]) => {
    if (tagCount === 0) {
      delete tagInfo[tagName];
    }
  });

  return (
    <React.Fragment>
      <AppHeader />
      <main id="main-content">
        <Section bg="gradient" sx={{ backgroundSize: '100% 300px', backgroundRepeat: 'no-repeat' }}>
          <Typography variant="body2" color="primary.600" fontWeight="bold" textAlign="center">
            Blog
          </Typography>
          <Typography component="h1" variant="h2" textAlign="center" sx={{ mb: { xs: 5, md: 10 } }}>
            The <GradientText>latest</GradientText> about MUI
          </Typography>
          <Box
            component="ul"
            sx={{
              display: 'grid',
              m: 0,
              p: 0,
              gap: 2,
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            }}
          >
            {[firstPost, secondPost].map((post) => (
              <Paper
                key={post.slug}
                component="li"
                variant="outlined"
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'all ease 120ms',
                  '&:hover, &:focus-within': {
                    borderColor: 'grey.300',
                    boxShadow: `0px 4px 20px rgba(170, 180, 190, 0.3)`,
                    ':where([data-mui-color-scheme="dark"])': {
                      borderColor: 'primary.600',
                      boxShadow: `0px 4px 20px rgba(0, 0, 0, 0.5)`,
                    },
                  },
                  '&:focus-within': {
                    '& a': {
                      outline: 'none',
                    },
                  },
                }}
              >
                {post.image && (
                  <Box
                    component="img"
                    src={post.image}
                    sx={{
                      aspectRatio: '16 / 9',
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }}
                  />
                )}
                <PostPreview {...post} />
              </Paper>
            ))}
          </Box>
        </Section>
      </main>
      <HeroEnd />
      <Divider />
      <AppFooter />
    </React.Fragment>
  );
}
