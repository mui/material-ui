import * as React from 'react';
import Stack, { StackProps } from '@mui/material/Stack';
import Typography, { TypographyProps } from '@mui/material/Typography';

export function Card(props: StackProps) {
  const { children, ...other } = props;
  return (
    <Stack
      direction="row"
      gap={2}
      sx={{
        alignItems: 'center',
        width: '100%',
        height: '100%',
        ...(other.sx || {}),
      }}
      {...other}
    >
      {children}
    </Stack>
  );
}

export function CardMedia(props: StackProps) {
  const { children, ...other } = props;
  return (
    <Stack
      sx={{ flexShrink: 0, alignItems: 'center', ...(other.sx || {}) }}
      {...other}
    >
      {children}
    </Stack>
  );
}

export function CardContent(props: StackProps) {
  const { children, ...other } = props;
  return (
    <Stack gap={0.25} sx={{ flexGrow: 1, ...(other.sx || {}) }} {...other}>
      {children}
    </Stack>
  );
}

export function CardTitle(props: TypographyProps) {
  const { children, ...other } = props;
  return (
    <Typography variant="body2" {...other}>
      {children}
    </Typography>
  );
}

export function CardDetailList(props: StackProps) {
  const { children, ...other } = props;
  return (
    <Stack direction="row" flexWrap="wrap" gap={1} {...other}>
      {children}
    </Stack>
  );
}

export function CardDetail(props: TypographyProps) {
  const { children, ...other } = props;
  return (
    <Typography variant="caption" color="text.secondary" {...other}>
      {children}
    </Typography>
  );
}
