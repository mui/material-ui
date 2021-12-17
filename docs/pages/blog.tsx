import * as React from 'react';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { getAllBlogPosts, BlogPost } from 'docs/lib/sourcing';
import { alpha } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Section from 'docs/src/layouts/Section';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import Chip from '@mui/material/Chip';
import Link from 'docs/src/modules/components/Link';
import Head from 'docs/src/modules/components/Head';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import GradientText from 'docs/src/components/typography/GradientText';
import BrandingProvider from 'docs/src/BrandingProvider';
import { authors } from 'docs/src/modules/components/TopLayoutBlog';
import HeroEnd from 'docs/src/components/home/HeroEnd';

export const getStaticProps = async () => {
  const allBlogPosts = getAllBlogPosts();
  return {
    props: {
      allBlogPosts,
    },
  };
};

const PostPreview = (props: BlogPost) => {
  return (
    <React.Fragment>
      {props.tags && (
        <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
          {props.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                fontWeight: 500,
                color: (theme) =>
                  theme.palette.mode === 'dark'
                    ? theme.palette.success[100]
                    : theme.palette.success[900],
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? theme.palette.success[900]
                    : theme.palette.success[100],
              }}
            />
          ))}
        </Box>
      )}
      <Typography fontWeight="bold" variant="subtitle1" sx={{ mb: 0.5 }}>
        {props.title}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 'auto' }}>
        {props.description}
      </Typography>
      {props.authors && (
        <AvatarGroup
          sx={{
            mt: 2,
            mb: 1,
            alignSelf: 'flex-start',
            '& .MuiAvatar-circular': {
              width: '28px',
              height: '28px',
              border: 3,
              borderColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[800]
                  : theme.palette.grey[200],
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[700]
                  : theme.palette.grey[300],
              color: (theme) =>
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[100]
                  : theme.palette.grey[800],
              fontSize: (theme) => theme.typography.pxToRem(13),
              fontWeight: 500,
            },
          }}
        >
          {props.authors.map((author) => (
            <Avatar
              key={author}
              alt=""
              src={`https://github.com/${authors[author as keyof typeof authors].github}.png`}
            />
          ))}
        </AvatarGroup>
      )}
      <Box
        sx={{
          display: { sm: 'block', md: 'flex' },
          justifyContent: 'space-between',
          alignItems: 'end',
        }}
      >
        <Box>
          {props.authors && (
            <Typography variant="body2" fontWeight="500">
              {props.authors.slice(0, 2).join(', ')}
              {props.authors.length > 2 && ', and more.'}
            </Typography>
          )}
          {props.date && (
            <Typography variant="caption" fontWeight="400" color="text.secondary">
              {new Date(props.date).toDateString()}
            </Typography>
          )}
        </Box>
        <Button
          component="a"
          href={`/blog/${props.slug}`}
          target="_blank"
          rel="noopener nofollow"
          endIcon={<KeyboardArrowRightRounded fontSize="small" />}
          sx={{
            p: { xs: 0, sm: 0.5 },
            mt: { xs: 1, sm: 0 },
            fontWeight: 700,
            fontSize: (theme) => theme.typography.pxToRem(14),
            color: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.primary[300]
                : theme.palette.primary[600],
            '& svg': { ml: -0.5, mt: 0.1 },
          }}
        >
          Read more
        </Button>
      </Box>
    </React.Fragment>
  );
};

const TAGS = [
  'News',
  'Material Design',
  'Components',
  'Accessibility',
  'How to guides',
  'System',
  'New Joiners',
  'Developer survey',
];

export default function Blog(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const [selectedTags, setSelectedTags] = React.useState<Record<string, boolean>>({});
  const { allBlogPosts } = props;
  const [firstPost, secondPost, ...otherPosts] = allBlogPosts.filter((post) => !!post.title);
  const getTags = React.useCallback(() => {
    const { tags = '' } = router.query;
    return (typeof tags === 'string' ? tags.split(',') : tags || [])
      .map((str) => str.trim())
      .filter((tag) => !!tag);
  }, [router.query]);
  React.useEffect(() => {
    const arrayTags = getTags();
    const finalTags: Record<string, boolean> = {};
    arrayTags.forEach((tag) => {
      finalTags[tag] = true;
    });
    setSelectedTags(finalTags);
  }, [getTags]);
  const appendTag = (tag: string) => {
    return [...getTags(), tag];
  };
  const removeTag = (tag: string) => {
    return getTags().filter((value) => value !== tag);
  };
  return (
    <BrandingProvider>
      <Head
        title="Blog - MUI"
        description="MUI (formerly Material-UI) started back in 2014 to unify React and Material Design. Today, MUI has grown to become one of the world's most popular React libraries – used by a vibrant community of more than 2M developers in over 180 countries."
      />
      <AppHeader />
      <main>
        <Section bg="gradient">
          <Typography
            variant="body2"
            color="primary.600"
            fontWeight="bold"
            textAlign="center"
            sx={{ mb: 0.5 }}
          >
            Blog
          </Typography>
          <Typography component="h1" variant="h2" textAlign="center" sx={{ mb: { xs: 4, md: 10 } }}>
            The <GradientText>latest</GradientText> about MUI
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            }}
          >
            {[firstPost, secondPost].map((post) => (
              <Paper
                component={Link}
                key={post.slug}
                href="/blog/"
                target="_blank"
                rel="noreferrer noopener"
                noLinkStyle
                variant="outlined"
                sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'initial' }}
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
        <Container
          sx={{
            mt: 2,
            display: 'grid',
            gridTemplateColumns: { md: '1fr 380px' },
            columnGap: 8,
          }}
        >
          <Typography variant="h5" fontWeight="700" sx={{ mb: { xs: 1, sm: 2 } }}>
            All posts
          </Typography>
          <Box sx={{ gridRow: 'span 2' }}>
            <Box
              sx={{
                position: 'sticky',
                top: 100,
                alignSelf: 'start',
                mb: { xs: 0, sm: 8 },
                p: 2,
                borderRadius: 1,
                border: '1px solid',
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? alpha(theme.palette.primaryDark[700], 0.2)
                    : 'rgba(255, 255, 255, 0.2)',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? theme.palette.primaryDark[700]
                    : theme.palette.grey[200],
              }}
            >
              <Typography color="text.primary" fontWeight="500" sx={{ mb: 2 }}>
                Filter by tags
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {TAGS.map((tag) => (
                  <Chip
                    key={tag}
                    variant={selectedTags[tag] ? 'filled' : 'outlined'}
                    label={tag}
                    size="small"
                    sx={{ py: 1.2 }}
                    onClick={() =>
                      router.push(
                        {
                          query: {
                            ...router.query,
                            tags: (selectedTags[tag] ? removeTag(tag) : appendTag(tag)).join(','),
                          },
                        },
                        undefined,
                        { shallow: true },
                      )
                    }
                  />
                ))}
              </Box>
            </Box>
          </Box>
          <Box>
            {otherPosts
              .filter(
                (post) =>
                  !Object.keys(selectedTags).length ||
                  (post.tags || []).some((tag) => Object.keys(selectedTags).includes(tag)),
              )
              .map((post, index) => (
                <React.Fragment key={post.slug}>
                  <Box sx={{ py: 3, display: 'flex', flexDirection: 'column' }}>
                    <PostPreview {...post} />
                  </Box>
                  {index !== otherPosts.length - 1 && <Divider />}
                </React.Fragment>
              ))}
          </Box>
        </Container>
      </main>
      <HeroEnd />
      <Divider />
      <AppFooter />
    </BrandingProvider>
  );
}
