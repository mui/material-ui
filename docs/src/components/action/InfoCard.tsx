import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from 'docs/src/modules/components/Link';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
}

export default function InfoCard({ icon, title, description, link }: InfoCardProps) {
  return (
    <Paper
      component={link ? Link : 'div'}
      href={link}
      noLinkStyle={Boolean(link)}
      variant="outlined"
      sx={(theme) => ({
        p: 3.5,
        height: '100%',
        background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
        ...theme.applyDarkStyles({
          bgcolor: 'primaryDark.900',
          background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
          borderColor: 'primaryDark.700',
        }),
      })}
    >
      <Box
        sx={(theme) => ({
          width: 40,
          height: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'primary.200',
          bgcolor: 'primary.50',
          boxShadow:
            '0px 1px 6px 0px rgba(194, 224, 255, 1), 0px 2px 30px 0px rgba(234, 237, 241, 0.3) inset',
          ...theme.applyDarkStyles({
            borderColor: 'primary.400',
            bgcolor: 'primary.900',
            boxShadow:
              '0px 1px 6px 0px rgba(0, 89, 178, 1), 0px 2px 30px 0px rgba(0, 0, 0, 0.25) inset',
          }),
        })}
      >
        {icon}
      </Box>
      <Typography
        fontWeight="bold"
        component="h3"
        color="text.primary"
        variant="body2"
        mt={2}
        mb={0.5}
      >
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Paper>
  );
}
