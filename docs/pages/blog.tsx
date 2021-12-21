import * as React from 'react';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { getAllBlogPosts, BlogPost } from 'docs/lib/sourcing';
import { alpha } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Section from 'docs/src/layouts/Section';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import Chip from '@mui/material/Chip';
import Head from 'docs/src/modules/components/Head';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import GradientText from 'docs/src/components/typography/GradientText';
import BrandingProvider from 'docs/src/BrandingProvider';
import { authors } from 'docs/src/modules/components/TopLayoutBlog';
import HeroEnd from 'docs/src/components/home/HeroEnd';
import Link from 'docs/src/modules/components/Link';

export const getStaticProps = async () => {
  const data = getAllBlogPosts();
  return {
    props: data,
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
      <Typography
        aria-describedby={`describe-${props.slug}`}
        component={Link}
        href={`/blog/${props.slug}`}
        fontWeight="bold"
        variant="subtitle1"
        color="text.primary"
        sx={{
          mb: 0.5,
          '&:before': { content: '""', display: 'block', position: 'absolute', inset: 0 },
        }}
      >
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
        <Box sx={{ position: 'relative' }}>
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
        <Typography
          aria-hidden="true"
          id={`describe-${props.slug}`}
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: { xs: 0, sm: 0.5 },
            mt: { xs: 1, sm: 0 },
            fontWeight: 700,
            fontSize: (theme) => theme.typography.pxToRem(14),
            color: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.primary[300]
                : theme.palette.primary[600],
          }}
        >
          Read more <KeyboardArrowRightRounded fontSize="small" />
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export default function Blog(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const PAGE_SIZE = 5;
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [selectedTags, setSelectedTags] = React.useState<Record<string, boolean>>({});
  const { allBlogPosts, allTags, tagInfo } = props;
  const [firstPost, secondPost, ...otherPosts] = allBlogPosts.filter((post) => !!post.title);
  const filteredPosts = otherPosts.filter(
    (post) =>
      !Object.keys(selectedTags).length ||
      (post.tags || []).some((tag) => Object.keys(selectedTags).includes(tag)),
  );
  const pageStart = page * PAGE_SIZE;
  const totalPage = Math.ceil(filteredPosts.length / PAGE_SIZE);
  const displayedPosts = filteredPosts.slice(pageStart, pageStart + PAGE_SIZE);
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
    setPage(0);
  }, [getTags]);

  const removeTag = (tag: string) => {
    router.push(
      {
        query: {
          ...router.query,
          tags: getTags().filter((value) => value !== tag),
        },
      },
      undefined,
      { shallow: true },
    );
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
            component="ul"
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            }}
          >
            {[firstPost, secondPost].map((post) => (
              <Paper
                key={post.slug}
                component="li"
                variant="outlined"
                sx={(theme) => ({
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  '&:hover, &:focus-within': {
                    bgcolor: theme.palette.mode === 'dark' ? 'primaryDark.600' : 'primary.50',
                    borderColor: 'primary.300',
                  },
                  '&:focus-within': {
                    '& a': {
                      outline: 'none',
                    },
                  },
                })}
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
          id="post-list"
          sx={{
            mt: 2,
            display: 'grid',
            gridTemplateColumns: { md: '1fr 380px' },
            columnGap: 8,
          }}
        >
          <Typography component="h2" variant="h5" fontWeight="700" sx={{ mb: { xs: 1, sm: 2 } }}>
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
                Filter by tag
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {allTags.map((tag) => {
                  const selected = !!selectedTags[tag];
                  return (
                    <Chip
                      key={tag}
                      variant={selected ? 'filled' : 'outlined'}
                      {...(selected
                        ? {
                            label: tag,
                            onDelete: () => {
                              const postList = document.getElementById('post-list');
                              if (postList) {
                                postList.scrollIntoView();
                              }
                              removeTag(tag);
                            },
                          }
                        : {
                            label: (
                              <React.Fragment>
                                {tag}{' '}
                                <Typography
                                  component="span"
                                  sx={(theme) => ({
                                    borderRadius: 1,
                                    bgcolor: selected ? 'primary.50' : 'grey.300',
                                    px: 0.5,
                                    mr: -0.25,
                                    fontSize: '0.75rem',
                                    fontWeight: 500,
                                    ...(theme.palette.mode === 'dark' && {
                                      bgcolor: 'primaryDark.600',
                                    }),
                                  })}
                                >
                                  {tagInfo[tag]}
                                </Typography>
                              </React.Fragment>
                            ),
                            onClick: () => {
                              const postList = document.getElementById('post-list');
                              if (postList) {
                                postList.scrollIntoView();
                              }
                              router.push(
                                {
                                  query: {
                                    ...router.query,
                                    tags: tag,
                                  },
                                },
                                undefined,
                                { shallow: true },
                              );
                            },
                          })}
                      size="small"
                      sx={{
                        py: 1.2,
                        '&:hover': {
                          bgcolor: 'primary.100',
                        },
                        '& .MuiChip-deleteIcon': {
                          color: 'primary.700',
                          '&:hover': { color: 'primary.700' },
                        },
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          </Box>
          <Box>
            <Box component="ul" sx={{ p: 0, m: 0 }}>
              {displayedPosts.map((post) => (
                <Box
                  component="li"
                  key={post.slug}
                  sx={() => ({
                    py: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    '&:not(:last-of-type)': {
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                    },
                    '&:hover, &:focus-within': {
                      '& a': {
                        textDecoration: 'underline',
                      },
                    },
                  })}
                >
                  <PostPreview {...post} />
                </Box>
              ))}
            </Box>
            <Pagination
              page={page + 1}
              count={totalPage}
              variant="outlined"
              shape="rounded"
              onChange={(_, value) => {
                setPage(value - 1);
                const postList = document.getElementById('post-list');
                if (postList) {
                  postList.scrollIntoView();
                }
              }}
              sx={{ mt: 2, mb: 10 }}
            />
          </Box>
        </Container>
      </main>
      <HeroEnd />
      <Divider />
      <AppFooter />
    </BrandingProvider>
  );
}
