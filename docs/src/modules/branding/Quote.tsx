import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import t1 from 'docs/src/modules/branding/t1';

interface QuoteProps {
  author?: {
    avatar?: string;
    name?: string;
    title?: string;
  };
  children: React.ReactNode;
}

const Quote = styled((props: QuoteProps) => {
  const { author = {}, children, ...other } = props;
  return (
    <Grid container {...other}>
      <Box
        component="img"
        src="/static/branding/about/quote.svg"
        sx={{ width: 32, height: 24, marginBottom: 2 }}
        alt={t1('Quote')}
      />
      <Typography variant="h4">&quot;{children}&quot;</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar src={author.avatar} alt={`Image of ${author.name}`} />
        </Grid>
        <Grid item>
          <Typography>
            {author.name}
            {', '}
            {author.title}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
})(({ theme }) => ({
  background: theme.palette.greyF3,
  padding: 40,
}));

export default Quote;
