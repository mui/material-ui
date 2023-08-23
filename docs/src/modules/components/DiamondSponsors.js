import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import Link from 'docs/src/modules/components/Link';

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
        startIcon={<DiamondOutlinedIcon fontSize="small" />}
        sx={(theme) => ({
          width: 'fit-content',
          fontSize: theme.typography.pxToRem(12.5),
          fontWeight: theme.typography.fontWeightSemiBold,
          color: (theme.vars || theme).palette.primary[600],
          '& svg': {
            width: 14,
            height: 14,
          },
          ...theme.applyDarkStyles({
            color: (theme.vars || theme).palette.primary[300],
          }),
        })}
      >
        {t('diamondSponsors')}
      </Button>
      <Stack
        spacing={1}
        sx={[
          (theme) => ({
            '& a': {
              width: '100%',
              height: 45,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '12px',
              boxSizing: 'border-box', // TODO have CssBaseline in the Next.js layout
              transition: theme.transitions.create(['color', 'border-color']),
              boxShadow: `inset 0 1px 2px ${
                (theme.vars || theme).palette.grey[50]
              }, 0 1px 0.5px ${alpha(theme.palette.grey[100], 0.6)}`,
              '&:hover': {
                backgroundColor: 'grey.50',
              },
              '& img': {
                display: 'inline-block',
              },
            },
          }),
          (theme) =>
            theme.applyDarkStyles({
              '& a': {
                boxShadow: `inset 0 1px 1px ${
                  (theme.vars || theme).palette.primaryDark[900]
                }, 0 1px 0.5px ${(theme.vars || theme).palette.common.black}`,
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primaryDark[800],
                  borderColor: (theme.vars || theme).palette.primaryDark[600],
                },
              },
            }),
        ]}
      >
        <a
          data-ga-event-category="sponsor"
          data-ga-event-action="drawer"
          data-ga-event-label="octopus"
          href="https://octopus.com/?utm_source=materialui&utm_medium=referral"
          rel="noopener noreferrer sponsored"
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
        </a>
        <a
          data-ga-event-category="sponsor"
          data-ga-event-action="drawer"
          data-ga-event-label="doit"
          href="https://www.doit.com/flexsave/?utm_source=materialui&utm_medium=referral"
          rel="noopener noreferrer sponsored"
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
        </a>
        <Link
          aria-label={t('diamondSponsors')}
          rel="noopener noreferrer"
          href="/material-ui/discover-more/backers/#diamond"
          fontSize={14}
          color="text.secondary"
          // eslint-disable-next-line material-ui/no-hardcoded-labels
        >
          +1
        </Link>
      </Stack>
    </Stack>
  );
}
