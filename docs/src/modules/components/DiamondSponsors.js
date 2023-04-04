import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import Link from 'docs/src/modules/components/Link';

const Root = styled('div')(({ theme }) => ({
  margin: theme.spacing(1, 2),
  '& img': {
    display: 'inline-block',
  },
}));

export default function DiamondSponsors() {
  const t = useTranslate();

  return (
    <Root>
      <Button
        component="a"
        href="/material-ui/discover-more/backers/#diamond"
        target="_blank"
        rel="noopener nofollow"
        size="small"
        endIcon={<InfoOutlinedIcon fontSize="small" />}
        sx={(theme) => ({
          mb: 1,
          fontSize: theme.typography.pxToRem(12.5),
          fontWeight: 500,
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
              borderColor: 'grey.200',
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
                borderColor: 'primaryDark.700',
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
            height="30px"
            src={`/static/sponsors/octopus-light.svg`}
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
            src={`/static/sponsors/doit-light.svg`}
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
            height="26px"
            src={'https://brand.zesty.io/zesty-io-logo-horizontal.svg'}
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
    </Root>
  );
}
