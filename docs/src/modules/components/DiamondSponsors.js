import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
// import Link from 'docs/src/modules/components/Link';

const Root = styled('div')(() => ({
  position: 'relative',
  width: '100%',
  '& img': {
    display: 'inline-block',
  },
}));

export default function DiamondSponsors() {
  const t = useTranslate();

  return (
    <Root>
      <Box
        sx={[
          {
            position: 'absolute',
            top: -40,
            height: 40,
            width: '100%',
            background: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFF 100%)`,
          },
          (theme) =>
            theme.applyDarkStyles({
              background: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, ${
                (theme.vars || theme).palette.primaryDark[900]
              } 100%)`,
            }),
        ]}
      />
      <Box
        sx={[
          (theme) => ({
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            padding: theme.spacing(1, 2, 2, 2),
            background: '#FFF',
            borderTop: '1px solid',
            borderColor: (theme.vars || theme).palette.grey[100],
          }),
          (theme) =>
            theme.applyDarkStyles({
              background: (theme.vars || theme).palette.primaryDark[900],
              borderColor: (theme.vars || theme).palette.primaryDark[700],
            }),
        ]}
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
          spacing={1.5}
          sx={[
            (theme) => ({
              '& a': {
                width: '100%',
                height: 52,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box', // TODO have CssBaseline in the Next.js layout
                border: `1px solid`,
                borderColor: 'divider',
                fontSize: theme.typography.pxToRem(14),
                fontWeight: 700,
                borderRadius: 1,
                transition: theme.transitions.create(['color', 'border-color']),
                '&:hover': {
                  color: 'primary.500',
                  borderColor: 'grey.300',
                  backgroundColor: 'grey.50',
                },
              },
            }),
            (theme) =>
              theme.applyDarkStyles({
                '& a': {
                  borderColor: 'divider',
                  '&:hover': {
                    color: 'primary.300',
                    borderColor: 'primaryDark.600',
                    backgroundColor: alpha(theme.palette.primaryDark[700], 0.4),
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
              height="27px"
              width="123px"
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
              height="26px"
              width="62px"
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
          <a
            data-ga-event-category="sponsor"
            data-ga-event-action="drawer"
            data-ga-event-label="zesty.io"
            href="https://www.zesty.io/integrations/mui-nextjs/?utm_source=mui&utm_medium=referral&utm_campaign=sponsor"
            rel="noopener noreferrer sponsored"
            target="_blank"
          >
            <Box
              component="img"
              height="20px"
              width="74px"
              src="https://brand.zesty.io/zesty-io-logo-horizontal.svg"
              alt="zesty.io"
              title="The only Next.js CMS you need"
              loading="lazy"
              sx={(theme) =>
                theme.applyDarkStyles({
                  content: `url(https://brand.zesty.io/zesty-io-logo-horizontal-light-color.svg)`,
                })
              }
            />
          </a>
          {/*
        <Link
          aria-label={t('diamondSponsors')}
          rel="noopener noreferrer"
          href="/material-ui/discover-more/backers/#diamond"
          // eslint-disable-next-line material-ui/no-hardcoded-labels
        >
          +1
        </Link>
        */}
        </Stack>
      </Box>
    </Root>
  );
}
