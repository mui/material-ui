import * as React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme, styled } from '@mui/material/styles';
import { useTranslate } from 'docs/src/modules/utils/i18n';

const Root = styled('div')(({ theme }) => ({
  margin: theme.spacing(2, 3),
  '& img': {
    display: 'inline-block',
  },
}));

const Placeholder = styled('a')(({ theme }) => ({
  width: '100%',
  height: 55,
  fontSize: '14px',
  fontWeight: 600,
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[800],
  border: `1px dashed ${theme.palette.divider}`,
  transition: theme.transitions.create(['color', 'border-color']),
  '&&': {
    display: 'flex',
  },
  '&:hover': {
    borderColor: 'currentColor',
    color: theme.palette.mode === 'dark' ? theme.palette.primary[300] : theme.palette.primary[500],
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.primaryDark[800] : theme.palette.primary[50],
  },
}));

export default function DiamondSponsors(props) {
  const { spot } = props;
  const theme = useTheme();
  const t = useTranslate();

  return (
    <Root>
      <Typography variant="caption" color="primary.main" display="block" sx={{ mb: 2 }}>
        {t('diamondSponsors')}
      </Typography>
      <Stack spacing={1.5}>
        <Box
          component="a"
          data-ga-event-category="sponsor"
          data-ga-event-action={spot}
          data-ga-event-label="octopus"
          href="https://octopus.com/?utm_source=materialui&utm_medium=referral"
          rel="noopener noreferrer sponsored"
          target="_blank"
          sx={{
            width: '100%',
            height: 55,
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
          }}
        >
          <img
            width="42"
            height="42"
            src="/static/sponsors/octopus.svg"
            alt="octopus"
            title="Repeatable, reliable deployments"
            loading="lazy"
          />
        </Box>
        <Box
          component="a"
          data-ga-event-category="sponsor"
          data-ga-event-action={spot}
          data-ga-event-label="doit"
          href="https://www.doit-intl.com/?utm_source=materialui&utm_medium=referral"
          rel="noopener noreferrer sponsored"
          target="_blank"
          sx={{
            width: '100%',
            height: 55,
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
          }}
        >
          <img
            width="60"
            height="25"
            src={`/static/sponsors/doit.svg`}
            alt="doit-intl"
            title="Management Platform for Google Cloud and AWS"
            loading="lazy"
          />
        </Box>
        <Placeholder
          aria-label={t('diamondSponsors')}
          rel="noopener noreferrer"
          target="_blank"
          href="/discover-more/backers/#diamond"
          // eslint-disable-next-line material-ui/no-hardcoded-labels
        >
          +1
        </Placeholder>
      </Stack>
    </Root>
  );
}

DiamondSponsors.propTypes = {
  spot: PropTypes.string.isRequired,
};
