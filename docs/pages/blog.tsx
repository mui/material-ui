import * as React from 'react';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { getAllBlogPosts, BlogPost } from 'docs/lib/sourcing';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
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
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
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
      <Typography fontWeight="bold" fontSize="1.125rem">
        {props.title}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 'auto' }}>
        {props.description}
      </Typography>
      {props.authors && (
        <AvatarGroup
          sx={{
            mt: 1,
            mb: 0.5,
            alignSelf: 'flex-start',
            '& > div': { width: '28px', height: '28px', border: 2, borderColor: '#fff' },
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
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1,
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
            <Typography variant="body2" color="text.secondary">
              {new Date(props.date).toDateString()}
            </Typography>
          )}
        </Box>
        <Link
          href={`/blog/${props.slug}`}
          color="primary"
          fontWeight="bold"
          sx={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}
        >
          Read more
          <KeyboardArrowRightRounded fontSize="small" sx={{ mt: '2px' }} />
        </Link>
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
            sx={{ mb: 1 }}
          >
            Blog
          </Typography>
          <Typography component="h1" variant="h2" textAlign="center" sx={{ mb: 4 }}>
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
              <Box
                key={post.slug}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'initial',
                  p: 2,
                  border: 1,
                  borderRadius: 1,
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? theme.palette.primaryDark[700]
                      : theme.palette.grey[200],
                  background: (theme) =>
                    theme.palette.mode === 'dark'
                      ? `linear-gradient(180deg, ${theme.palette.primaryDark[900]} 0%, #001E3C 100%)`
                      : '#fff',
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
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              mt: 4,
              display: 'grid',
              gridTemplateColumns: { md: '1fr 380px' },
              columnGap: 7,
            }}
          >
            <Typography variant="h2" sx={{ mb: 2 }}>
              All posts
            </Typography>
            <Box sx={{ gridRow: 'span 2' }}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography color="text.secondary" fontWeight="500" sx={{ mb: 2 }}>
                  Filter by tags
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {TAGS.map((tag) => (
                    <Chip
                      key={tag}
                      variant={selectedTags[tag] ? 'filled' : 'outlined'}
                      label={tag}
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
              </Paper>
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
                    <Box sx={{ py: 2, display: 'flex', flexDirection: 'column' }}>
                      <PostPreview {...post} />
                    </Box>
                    {index !== otherPosts.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
            </Box>
          </Box>
        </Section>
      </main>
      <Divider />
      <AppFooter />
    </BrandingProvider>
  );
}
