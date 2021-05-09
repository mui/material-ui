import * as React from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Link from '../components/Link';

const TwitterBlockLink = styled(Link)(({ theme }) => ({
  display: 'block',
  color: 'inherit',

  '&:hover': {
    background: theme.palette.greyEA,
    textDecoration: 'none',
  },
}));

interface CommunitySayCardProps {
  name: string;
  id: string;
  description: any;
  avatar: string;
  uniqueKey: number;
  url: string;
}
export default function CommunitySayCard(props: CommunitySayCardProps) {
  const { name, id, description, avatar, uniqueKey, url } = props;
  return (
    <Box
      sx={{
        bgcolor: 'greyF3',
        px: { xs: 4, lg: 5 },
        py: 5,
        pt: 5.5,
        mt: uniqueKey === 1 ? { sm: 0, lg: 3.3 } : 0,
      }}
      component={TwitterBlockLink}
      href={url}
    >
      <Box
        component="img"
        src="/static/branding/mui-x/twitter.svg"
        loading="lazy"
        alt="Twitter"
        sx={{
          mb: 3.5,
        }}
      />
      <Typography
        paragraph
        variant="h4"
        align="center"
        sx={{ mb: { xs: 4, lg: 3 }, textAlign: 'left' }}
      >
        {description}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          sx={{
            mr: { xs: 1.5, lg: 2 },
            borderRadius: '50%',
          }}
        >
          <img loading="lazy" src={avatar} width="48" height="48" alt={`${name} avatar`} />
        </Avatar>
        <Box>
          <Typography sx={{ fontWeight: 'bold', fontSize: 16 }}>{name}</Typography>
          <Typography sx={{ fontSize: 16 }}>{id}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
