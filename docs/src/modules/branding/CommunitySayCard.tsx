import * as React from 'react';
import { Box, Avatar, Typography, BoxProps } from '@material-ui/core';
import Image from 'docs/src/modules/branding/MaterialUixImage';

interface CommunitySayCardProps {
  name?: string;
  id?: string;
  description: any;
  avatar?: string;
  uniqueKey: number;
  sx?: BoxProps['sx'];
  imgSx?: BoxProps['sx'];
  descSx?: BoxProps['sx'];
  boxSx?: BoxProps['sx'];
  nameSx?: BoxProps['sx'];
  accountTypeImg?: string;
  isGithub?: boolean;
  isTwitter?: boolean;
}
export default function CommunitySayCard(props: CommunitySayCardProps) {
  const {
    name,
    id,
    description,
    avatar,
    uniqueKey,
    accountTypeImg,
    isGithub = false,
    isTwitter = false,
    imgSx,
    descSx,
    boxSx,
    nameSx,
    sx,
  } = props;
  return (
    <Box
      sx={{
        bgcolor: 'greyF3',
        px: { xs: 4, lg: 5 },
        py: 5,
        pt: 5.8,
        mt: uniqueKey === 1 ? { sm: 0, lg: 3.3 } : 0,
        ...sx,
      }}
    >
      {accountTypeImg ? (
        <Image
          src={accountTypeImg}
          sx={{
            bgcolor: isTwitter ? '#1DA1F2' : isGithub ? '#333333' : '',
            ...imgSx,
          }}
        />
      ) : (
        <Box
          component="img"
          src={'/static/branding/material-ui-x/Twitter.svg'}
          loading="lazy"
          alt="Twitter"
          sx={{
            mb: 3.8,
          }}
        />
      )}
      <Typography
        variant="h4"
        align="center"
        sx={{ mb: { xs: 4, lg: 3 }, textAlign: 'left', ...descSx }}
      >
        {description}
      </Typography>

      {!isTwitter && !isGithub && (
        <Box sx={{ display: 'flex', alignItems: 'center', ...boxSx }}>
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
            <Typography sx={{ fontWeight: 'bold', fontSize: { xs: 16 } ,...nameSx}}>{name}</Typography>
            <Typography sx={{ fontSize: { xs: 16 },...nameSx }}>{id}</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
