import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/docs/Link';
import { useTranslate } from 'docs/src/modules/utils/i18n';

const NativeLink = styled('a')(({ theme }) => ({
  boxSizing: 'border-box', // TODO have CssBaseline in the Next.js layout
  width: '100%',
  height: 45,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '3px solid transparent',
  transition: theme.transitions.create(['background-color']),
  '&:first-of-type': {
    borderRadius: '11px 11px 0 0', // concentric border-radius
  },
  '&:hover': {
    backgroundColor: (theme.vars || theme).palette.grey[50],
  },
  '&:focus-visible': {
    outline: 'none',
    borderColor: alpha((theme.vars || theme).palette.primary[500], 0.5),
  },
  '& img': {
    display: 'inline-block',
  },
  ...theme.applyDarkStyles({
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary[900], 0.1),
    },
  }),
}));

export default function DiamondSponsors() {
  const t = useTranslate();

  return (
    <Stack
      direction="column"
      sx={{
        mt: 2,
        borderRadius: '12px',
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'clip',
      }}
    >
      <NativeLink
        data-ga-event-category="sponsor"
        data-ga-event-action="docs-premium"
        data-ga-event-label="octopus.com"
        href="https://octopus.com/?utm_source=materialui&utm_medium=referral"
        rel="noopener sponsored"
        target="_blank"
      >
        <Box
          component="img"
          src="/static/sponsors/octopus-light.svg"
          alt="octopus"
          title="Repeatable, reliable deployments"
          loading="lazy"
          sx={[
            {
              height: '25px',
              width: '116px',
            },
            (theme) =>
              theme.applyDarkStyles({
                content: `url(/static/sponsors/octopus-dark.svg)`,
              }),
          ]}
        />
      </NativeLink>
      <Divider />
      <NativeLink
        data-ga-event-category="sponsor"
        data-ga-event-action="docs-premium"
        data-ga-event-label="doit.com"
        href="https://www.doit.com/?utm_source=materialui&utm_medium=referral"
        rel="noopener sponsored"
        target="_blank"
      >
        <Box
          component="img"
          src="/static/sponsors/doit-light.svg"
          alt="doit"
          title="Management Platform for Google Cloud and AWS"
          loading="lazy"
          sx={[
            {
              height: '29px',
              width: '70px',
            },
            (theme) =>
              theme.applyDarkStyles({
                content: `url(/static/sponsors/doit-dark.svg)`,
              }),
          ]}
        />
      </NativeLink>
      <Divider />
      <NativeLink
        data-ga-event-category="sponsor"
        data-ga-event-action="docs-premium"
        data-ga-event-label="marblism.com"
        href="https://www.marblism.com/?utm_source=mui"
        rel="noopener sponsored"
        target="_blank"
      >
        <Box
          component="img"
          src="/static/sponsors/marblism-light.svg"
          alt="marblism"
          title="AI web app generation"
          loading="lazy"
          sx={[
            {
              height: '27px',
              width: '90px',
            },
            (theme) =>
              theme.applyDarkStyles({
                content: `url(/static/sponsors/marblism-dark.svg)`,
              }),
          ]}
        />
      </NativeLink>
      <Divider />
      <Link
        href="/material-ui/discover-more/backers/#diamond-sponsors"
        sx={(theme) => ({
          height: 45,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px solid transparent',
          borderRadius: '0 0 11px 11px',
          outline: 'none !important', // override styles coming from the branding theme
          backgroundColor: alpha(theme.palette.primary[50], 0.5),
          transition: theme.transitions.create(['color', 'background-color']),
          '&:hover': {
            backgroundColor: (theme.vars || theme).palette.primary[50],
          },
          '&:focus-visible': {
            border: `3px solid ${alpha((theme.vars || theme).palette.primary[500], 0.5)}`,
          },
          ...theme.applyDarkStyles({
            backgroundColor: alpha(theme.palette.primaryDark[700], 0.2),
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary[700], 0.1),
            },
          }),
        })}
      >
        <Typography variant="caption" sx={{ fontWeight: 'medium' }}>
          {t('becomeADiamondSponsor')}
        </Typography>
      </Link>
    </Stack>
  );
}
