import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
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
  borderRadius: 12,
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  transition: theme.transitions.create(['color', 'border-color']),
  boxShadow: `${alpha(theme.palette.grey[100], 0.3)} 0 -2px 0 inset`,
  '&:hover': {
    backgroundColor: (theme.vars || theme).palette.grey[50],
  },
  '&:focus-visible': {
    outline: `3px solid ${alpha((theme.vars || theme).palette.primary[500], 0.5)}`,
    outlineOffset: '2px',
  },
  '& img': {
    display: 'inline-block',
  },
  ...theme.applyDarkStyles({
    boxShadow: `${alpha(theme.palette.primaryDark[600], 0.1)} 0 2px 0 inset, ${(theme.vars || theme).palette.common.black} 0 -2px 0 inset`,
    '&:hover': {
      backgroundColor: (theme.vars || theme).palette.primaryDark[800],
      borderColor: (theme.vars || theme).palette.primary[900],
    },
  }),
}));

export default function DiamondSponsors() {
  const t = useTranslate();

  return (
    <Stack direction="column" mt={2} spacing={1} useFlexGap>
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
          height="25px"
          width="116px"
          src="/static/sponsors/octopus-light.svg"
          alt="octopus"
          title="Repeatable, reliable deployments"
          loading="lazy"
          sx={(theme) =>
            theme.applyDarkStyles({
              content: `url(/static/sponsors/octopus-dark.svg)`,
            })
          }
        />
      </NativeLink>
      <NativeLink
        data-ga-event-category="sponsor"
        data-ga-event-action="docs-premium"
        data-ga-event-label="doit.com"
        href="https://www.doit.com/flexsave/?utm_source=materialui&utm_medium=referral"
        rel="noopener sponsored"
        target="_blank"
      >
        <Box
          component="img"
          height="29px"
          width="70px"
          src="/static/sponsors/doit-light.svg"
          alt="doit"
          title="Management Platform for Google Cloud and AWS"
          loading="lazy"
          sx={(theme) =>
            theme.applyDarkStyles({
              content: `url(/static/sponsors/doit-dark.svg)`,
            })
          }
        />
      </NativeLink>
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
          height="27px"
          width="90px"
          src="/static/sponsors/marblism-light.svg"
          alt="marblism"
          title="AI web app generation"
          loading="lazy"
          sx={(theme) =>
            theme.applyDarkStyles({
              content: `url(/static/sponsors/marblism-dark.svg)`,
            })
          }
        />
      </NativeLink>
      <Link
        href="/material-ui/discover-more/backers/#diamond-sponsors"
        sx={(theme) => ({
          p: 1.5,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 1,
          border: '1px dashed',
          transition: theme.transitions.create(['color', 'border-color', 'background-color']),
          backgroundColor: alpha(theme.palette.grey[50], 0.5),
          borderColor: (theme.vars || theme).palette.grey[300],
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary[100], 0.5),
            borderColor: (theme.vars || theme).palette.primary[300],
          },
          ...theme.applyDarkStyles({
            backgroundColor: alpha(theme.palette.primaryDark[700], 0.2),
            borderColor: (theme.vars || theme).palette.primaryDark[700],
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary[700], 0.2),
              borderColor: (theme.vars || theme).palette.primary[800],
            },
          }),
        })}
      >
        <Typography variant="caption" fontWeight="semiBold" textAlign="center">
          {t('becomeADiamondSponsor')}
        </Typography>
        {/* <Typography variant="caption" fontWeight="regular" color="text.secondary">
              {t('diamondSponsorVacancies')}
            </Typography> */}
      </Link>
    </Stack>
  );
}
