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
    <Box sx={{ bgcolor: 'greyF3', px: 5, py: 5, mt: uniqueKey === 1 ? 3.3 : 0 }}>
      <Box
        component="img"
        src="/static/branding/material-ui-x/Twitter.svg"
        loading="lazy"
        alt="Twitter"
        sx={{
          mb: 3.3,
        }}
      />
      <Typography variant="h4" align="center" sx={{ mb: 3, textAlign: 'left' }}>
        {description}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          sx={{
            mr: 2,
            bgcolor: 'sunglow',
            width: 48,
            height: 48,
          }}
        >
          <img loading="lazy" src={avatar} alt="" />
        </Avatar>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {name}
          </Typography>
          <Typography variant="body2">{id}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
