import * as React from 'react';
import { Box, Avatar, Typography } from '@material-ui/core';

interface CommunitySayCardProps {
  name: string;
  id: string;
  description: any;
  avatar: string;
  uniqueKey: number;
}
export default function CommunitySayCard(props: CommunitySayCardProps) {
  const { name, id, description, avatar, uniqueKey } = props;
  return (
    <Box
      sx={{
        bgcolor: 'greyF3',
        px: { xs: 4, lg: 5 },
        py: 5,
        pt: 5.8,
        mt: uniqueKey === 1 ? { sm: 0, lg: 3.3 } : 0,
      }}
    >
      <Box
        component="img"
        src="/static/branding/material-ui-x/Twitter.svg"
        loading="lazy"
        alt="Twitter"
        sx={{
          mb: 3.8,
        }}
      />
      <Typography variant="h4" align="center" sx={{ mb: { xs: 4, lg: 3 }, textAlign: 'left' }}>
        {description}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          sx={{
            mr: { xs: 1.5, lg: 2 },
            bgcolor: 'sunglow',
            width: 48,
            height: 48,
          }}
        >
          <img loading="lazy" src={avatar} alt="" />
        </Avatar>
        <Box>
          <Typography sx={{ fontWeight: 'bold', fontSize: { xs: 16 } }}>{name}</Typography>
          <Typography sx={{ fontSize: { xs: 16 } }}>{id}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
