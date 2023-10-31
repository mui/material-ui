import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from 'docs/src/modules/components/Link';

interface GlowingIconContainerProps {
  icon: React.ReactNode;
}

export function GlowingIconContainer({ icon }: GlowingIconContainerProps) {
  return (
    <Box
      sx={(theme) => ({
        width: 40,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
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
  );
}

interface InfoCardProps {
  title: string;
  description?: string;
  link?: string;
  icon?: React.ReactNode;
  svg?: React.ReactNode;
}

export default function InfoCard({ icon, svg, title, description, link }: InfoCardProps) {
  return (
    <Paper
      component={link ? Link : 'div'}
      href={link}
      {...(link
        ? {
            noLinkStyle: true,
          }
        : {})}
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
      {svg && svg}
      {icon && <GlowingIconContainer icon={icon} />}
      <Typography
        fontWeight="bold"
        component="h3"
        color="text.primary"
        variant="body2"
        mt={icon ? 2 : 0}
        mb={description ? 0.5 : 0}
      >
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Paper>
  );
}
