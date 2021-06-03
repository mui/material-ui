import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

interface BrandingQuoteProps {
  author?: {
    avatar?: string;
    name?: string;
    title?: string;
  };
  children: React.ReactNode;
}

const BrandingQuote = styled((props: BrandingQuoteProps) => {
  const { author = {}, children, ...other } = props;
  return (
    <div {...other}>
      <Box
        component="img"
        src="/static/branding/about/quote.svg"
        loading="lazy"
        sx={{ width: 32, height: 24, mb: 3, display: 'block' }}
        alt=""
      />
      <Typography component="p" variant="h4">
        &quot;{children}&quot;
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: 3,
          '& img': {
            mr: 2,
            borderRadius: '50%',
          },
        }}
      >
        <img width="48" height="48" loading="lazy" src={author.avatar} alt="" />
        <Typography variant="body2">
          {author.name}
          {', '}
          {author.title}
        </Typography>
      </Box>
    </div>
  );
})(({ theme }) => ({
  background: theme.palette.greyF3,
  padding: theme.spacing(5),
}));

export default BrandingQuote;
