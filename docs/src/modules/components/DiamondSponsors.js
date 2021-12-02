import * as React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Link from 'docs/src/modules/components/Link';
import Typography from '@mui/material/Typography';
import { useTheme, styled } from '@mui/material/styles';
import { useTranslate } from 'docs/src/modules/utils/i18n';

const Root = styled('div')(({ theme }) => ({
  margin: theme.spacing(2, 2),
  '& img': {
    display: 'inline-block',
  },
}));

export default function DiamondSponsors(props) {
  const { spot } = props;
  const theme = useTheme();
  const t = useTranslate();

  return (
    <Root>
      <Typography variant="caption" color="primary.main" display="block" sx={{ mb: 2 }}>
        <Link href="/discover-more/backers/#diamond">{t('diamondSponsors')}</Link>
      </Typography>
      <Stack
        spacing={1.5}
        sx={{
          '& a': {
            width: '100%',
            height: 52,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            transition: theme.transitions.create(['color', 'border-color']),
            '&:hover': {
              borderColor: 'currentColor',
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.primary[300]
                  : theme.palette.primary[500],
            },
          },
        }}
      >
        <a
          data-ga-event-category="sponsor"
          data-ga-event-action={spot}
          data-ga-event-label="octopus"
          href="https://octopus.com/?utm_source=materialui&utm_medium=referral"
          rel="noopener noreferrer sponsored"
          target="_blank"
        >
          <img
            width="137"
            height="30"
            src={`/static/sponsors/octopus-${theme.palette.mode}.svg`}
            alt="octopus"
            title="Repeatable, reliable deployments"
            loading="lazy"
          />
        </a>
        <a
          data-ga-event-category="sponsor"
          data-ga-event-action={spot}
          data-ga-event-label="doit"
          href="https://www.doit-intl.com/?utm_source=materialui&utm_medium=referral"
          rel="noopener noreferrer sponsored"
          target="_blank"
        >
          <img
            width="60"
            height="25"
            src={`/static/sponsors/doit.svg`}
            alt="doit-intl"
            title="Management Platform for Google Cloud and AWS"
            loading="lazy"
          />
        </a>
        <a
          data-ga-event-category="sponsor"
          data-ga-event-action={spot}
          data-ga-event-label="aptugo"
          href="https://www.aptugo.com/?utm_source=materialui&utm_medium=referral"
          rel="noopener noreferrer sponsored"
          target="_blank"
        >
          <img
            width="137"
            height="30"
            src={`/static/sponsors/aptugo-${theme.palette.mode}.svg`}
            alt="aptugo"
            title="Augmented Software Development Platform"
            loading="lazy"
          />
        </a>
      </Stack>
    </Root>
  );
}

DiamondSponsors.propTypes = {
  spot: PropTypes.string.isRequired,
};
