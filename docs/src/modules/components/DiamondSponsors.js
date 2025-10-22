import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/docs/Link';
import { useTranslate } from '@mui/docs/i18n';

const NativeLink = styled('a')(({ theme }) => ({
  boxSizing: 'border-box', // TODO have CssBaseline in the Next.js layout
  width: '100%',
  height: 45,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderLeft: '1px solid',
  borderRight: '1px solid',
  borderBottom: 0,
  borderColor: (theme.vars || theme).palette.divider,
  transition: theme.transitions.create(['background-color']),
  '&:first-of-type': {
    borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
    borderRadius: '12px 12px 0 0',
  },
  '&:hover': {
    backgroundColor: (theme.vars || theme).palette.grey[50],
  },
  '&:focus-visible': {
    outline: `3px solid ${alpha(theme.palette.primary[500], 0.5)}`,
    outlineOffset: '-3px',
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
    <Stack direction="column" sx={{ mt: 2, mx: 0.5 }}>
      <NativeLink
        data-ga-event-category="sponsor"
        data-ga-event-action="docs-premium"
        data-ga-event-label="doit.com"
        href="https://www.doit.com/?utm_source=mui.com&utm_medium=referral"
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
      <NativeLink
        data-ga-event-category="sponsor"
        data-ga-event-action="docs-premium"
        data-ga-event-label="kombai.com"
        href="https://kombai.com/integrations/mui/?utm_source=MUI&utm_medium=website&utm_campaign=sponsor&utm_content=docs"
        rel="noopener sponsored"
        target="_blank"
      >
        <Box
          component="img"
          src="/static/sponsors/kombai-light.svg"
          alt="kombai"
          title="AI agent for Frontend - turn Figma, text, or images into clean MUI code"
          loading="lazy"
          sx={[
            {
              height: '29px',
              width: '80%',
            },
            (theme) =>
              theme.applyDarkStyles({
                content: `url(/static/sponsors/kombai-dark.svg)`,
              }),
          ]}
        />
      </NativeLink>
      <Link
        href="/material-ui/discover-more/backers/#diamond-sponsors"
        sx={(theme) => ({
          height: 45,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px dashed',
          borderColor: (theme.vars || theme).palette.grey[300],
          borderRadius: '0 0 12px 12px',
          backgroundColor: alpha(theme.palette.primary[50], 0.4),
          transition: theme.transitions.create(['color', 'background-color']),
          '&:hover': {
            backgroundColor: (theme.vars || theme).palette.primary[50],
            borderColor: (theme.vars || theme).palette.primary[200],
          },
          '&:focus-visible': {
            outlineOffset: '-3px',
          },
          ...theme.applyDarkStyles({
            backgroundColor: alpha(theme.palette.primaryDark[700], 0.3),
            borderColor: alpha(theme.palette.primaryDark[600], 0.5),
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary[700], 0.1),
              borderColor: alpha(theme.palette.primary[600], 0.4),
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
