import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { Link, LinkProps } from '@mui/docs/Link';

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
        boxShadow: `0px 1px 6px 0px ${alpha(
          theme.palette.primary[500],
          0.4,
        )}, 0px 2px 30px 0px rgba(234, 237, 241, 0.3) inset`,
        ...theme.applyDarkStyles({
          borderColor: alpha(theme.palette.primary[400], 0.6),
          bgcolor: 'primary.900',
          boxShadow: `0 2px 6px 0 ${alpha(
            theme.palette.primary[600],
            0.4,
          )}, 0px 2px 30px 0px rgba(0, 0, 0, 0.25) inset`,
        }),
      })}
    >
      {icon}
    </Box>
  );
}

interface InfoCardProps {
  classNameDescription?: string;
  classNameTitle?: string;
  dense?: boolean;
  description?: string;
  icon?: React.ReactNode;
  link?: string;
  prefetch?: LinkProps['prefetch'];
  svg?: React.ReactNode;
  title: string;
  titleProps?: TypographyProps;
}

export default function InfoCard(props: InfoCardProps) {
  const {
    classNameDescription,
    classNameTitle,
    dense,
    description,
    icon,
    link,
    svg,
    title,
    titleProps,
    ...other
  } = props;
  return (
    <Paper
      variant="outlined"
      component={link ? Link : 'div'}
      href={link}
      {...(link
        ? {
            noLinkStyle: true,
            // Fix overloading with prefetch={false}, only prefetch on hover.
            prefetch: false,
          }
        : {})}
      sx={(theme) => ({
        p: dense ? 2.5 : 3.5,
        height: '100%',
        background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
        ...theme.applyDarkStyles({
          bgcolor: 'primaryDark.900',
          background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
          borderColor: 'primaryDark.700',
        }),
      })}
      {...other}
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
        className={classNameTitle}
        {...titleProps}
      >
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" className={classNameDescription}>
        {description}
      </Typography>
    </Paper>
  );
}
