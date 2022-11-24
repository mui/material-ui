'use client';

// Ideally this would have been server component
// But most of the MUI component need to be client components
import * as React from 'react';
import { BlogPost } from 'docs/lib/sourcing';
import { alpha } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import Chip from '@mui/material/Chip';
import { authors as AUTHORS } from 'docs/src/modules/components/TopLayoutBlog';
import Link from './Link';

export default function PostPreview(props: BlogPost) {
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
        {props.tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            sx={{
              fontWeight: 500,
              color: (theme) =>
                theme.palette.mode === 'dark' ? theme.palette.grey[50] : theme.palette.grey[700],
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.grey[700], 0.5)
                  : theme.palette.grey[100],
              '&:hover': {
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? alpha(theme.palette.grey[700], 0.5)
                    : theme.palette.grey[100],
              },
            }}
          />
        ))}
      </Box>
      <Typography
        component="h2"
        fontWeight="bold"
        variant="subtitle1"
        sx={{
          mb: 0.5,
        }}
      >
        <Link
          aria-describedby={`describe-${props.slug}`}
          href={`/blog/${props.slug}`}
          sx={{
            color: 'text.primary',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {props.title}
        </Link>
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
              width: 28,
              height: 28,
              border: 3,
              borderColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[800]
                  : theme.palette.grey[100],
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[700]
                  : theme.palette.grey[100],
              color: (theme) =>
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[100]
                  : theme.palette.grey[800],
              fontSize: (theme) => theme.typography.pxToRem(13),
              fontWeight: 500,
            },
          }}
        >
          {(props.authors as Array<keyof typeof AUTHORS>).map((author) => (
            <Avatar
              key={author}
              alt=""
              src={`${AUTHORS[author].avatar}?s=${28}`}
              srcSet={`${AUTHORS[author].avatar}?s=${28 * 2} 2x`}
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
              {props.authors
                .slice(0, 3)
                .map((userId) => {
                  const name = AUTHORS[userId as keyof typeof AUTHORS]?.name;
                  if (name) {
                    if (props.authors && props.authors.length > 1) {
                      // display only firstName
                      return name.split(' ')[0];
                    }
                    return name;
                  }
                  return userId;
                })
                .join(', ')}
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
          component={Link}
          aria-describedby={`describe-${props.slug}`}
          href={`/blog/${props.slug}`}
          id={`describe-${props.slug}`}
          size="small"
          endIcon={<KeyboardArrowRightRoundedIcon />}
          sx={(theme) => ({
            mt: { xs: 1, md: 0 },
            mb: { xs: -1, md: 0 },
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.primary[300]
                : theme.palette.primary[600],
            '& .MuiButton-endIcon': {
              ml: 0,
            },
          })}
        >
          Read more
        </Button>
      </Box>
    </React.Fragment>
  );
}
