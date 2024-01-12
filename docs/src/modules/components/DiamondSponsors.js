import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import Link from 'docs/src/modules/components/Link';

const StyledAnchor = styled('a')(({ theme }) => ({
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
  boxShadow: `inset 0 1px 1px ${(theme.vars || theme).palette.grey[50]}, 0 1px 2px ${alpha(
    theme.palette.grey[100],
    0.6,
  )}`,
  '&:hover': {
    backgroundColor: (theme.vars || theme).palette.grey[50],
  },
  '& img': {
    display: 'inline-block',
  },
  ...theme.applyDarkStyles({
    boxShadow: `inset 0 1px 1px ${(theme.vars || theme).palette.primaryDark[900]}, 0 1px 0.5px ${
      (theme.vars || theme).palette.common.black
    }`,
    '&:hover': {
      backgroundColor: (theme.vars || theme).palette.primaryDark[800],
      borderColor: (theme.vars || theme).palette.primaryDark[600],
    },
  }),
}));

export default function DiamondSponsors() {
  const t = useTranslate();

  return (
    <Stack
      spacing={0.5}
      direction="column"
      sx={{
        mt: 1.5,
        pt: 1.5,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Button
        component="a"
        href="/material-ui/discover-more/backers/"
        target="_blank"
        rel="noopener nofollow"
        size="small"
        startIcon={<DiamondOutlinedIcon />}
        sx={{
          width: 'fit-content',
          fontSize: (theme) => theme.typography.pxToRem(12.5),
          '& svg': {
            marginRight: 0.5,
            width: 16,
            height: 16,
          },
        }}
      >
        {t('diamondSponsors')}
      </Button>
      <Stack spacing={1}>
        <StyledAnchor
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
        </StyledAnchor>
        <StyledAnchor
          data-ga-event-category="sponsor"
          data-ga-event-action="docs-premium"
          data-ga-event-label="doit.com"
          href="https://www.doit.com/flexsave/?utm_source=materialui&utm_medium=referral"
          rel="noopener sponsored"
          target="_blank"
        >
          <Box
            component="img"
            height="28px"
            width="68px"
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
        </StyledAnchor>
        <Link
          href="/material-ui/discover-more/backers/#diamond-sponsors"
          sx={(theme) => ({
            width: '100%',
            p: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 1,
            border: '1px dashed',
            transition: theme.transitions.create(['color', 'border-color', 'background-color']),
            backgroundColor: alpha(theme.palette.primary[50], 0.5),
            borderColor: (theme.vars || theme).palette.primary[200],
            boxShadow: `inset 0 1px 1px ${
              (theme.vars || theme).palette.grey[50]
            }, 0 1px 2px ${alpha(theme.palette.primary[100], 0.8)}`,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary[100], 0.5),
              borderColor: (theme.vars || theme).palette.primary[300],
            },
            ...theme.applyDarkStyles({
              backgroundColor: alpha(theme.palette.primary[400], 0.05),
              borderColor: alpha(theme.palette.primary[300], 0.3),
              boxShadow: `inset 0 1px 1px ${
                (theme.vars || theme).palette.primaryDark[800]
              }, 0 1px 0.5px ${(theme.vars || theme).palette.common.black}`,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary[400], 0.1),
                borderColor: (theme.vars || theme).palette.primary[400],
              },
            }),
          })}
        >
          <Typography variant="caption" fontWeight="semiBold" textAlign="center">
            {t('becomeADiamondSponsor')}
          </Typography>
          <Typography variant="caption" fontWeight="regular" color="text.secondary">
            {t('diamondSponsorVacancies')}
          </Typography>
        </Link>
      </Stack>
    </Stack>
  );
}
