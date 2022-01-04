import * as React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTheme, styled, alpha } from '@mui/material/styles';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

const Root = styled('div')(({ theme }) => ({
  margin: theme.spacing(1, 2, 2),
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
      <Button
        component="a"
        href="/discover-more/backers/#diamond"
        target="_blank"
        rel="noopener nofollow"
        size="small"
        endIcon={<KeyboardArrowRightRoundedIcon />}
        sx={{
          fontSize: theme.typography.pxToRem(12.5),
          fontWeight: 500,
          color:
            theme.palette.mode === 'dark' ? theme.palette.primary[300] : theme.palette.primary[600],
          mb: 0.5,
          '& svg': {
            ml: -0.5,
          },
        }}
      >
        {t('diamondSponsors')}
      </Button>
      <Stack
        spacing={1.5}
        sx={{
          '& a': {
            width: '100%',
            height: 52,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[700]
                : theme.palette.grey[200]
            }`,
            borderRadius: 1,
            transition: theme.transitions.create(['color', 'border-color']),
            '&:hover': {
              borderColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[600]
                  : theme.palette.grey[300],
              background:
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.primaryDark[700], 0.4)
                  : theme.palette.grey[50],
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
