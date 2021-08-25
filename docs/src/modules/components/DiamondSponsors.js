import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useTheme, styled } from '@material-ui/core/styles';
import { useTranslate } from 'docs/src/modules/utils/i18n';

const Root = styled('div')(({ theme }) => ({
  '& img': {
    display: 'inline-block',
  },
}));

const Placeholder = styled('a')(({ theme }) => ({
  width: 40,
  height: 40,
  fontSize: "14px", 
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
    color: theme.palette.mode === 'dark'
      ? theme.palette.primary[300]
      : theme.palette.primary[500],
  },
}));

export default function DiamondSponsors(props) {
  const { spot } = props;
  const theme = useTheme();
  const t = useTranslate();

  return (
    <Root>
      <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
        <Box
          sx={{
            display: 'inline-block',
            mr: 1,
            borderRadius: 1,
            width: 12,
            height: 12,
            bgcolor: (theme) => theme.palette.primary[500],
            border: '3px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.primary[800]
                : theme.palette.primary[100],
          }}
        />
        <Typography variant="caption" color="primary.main" display="block">
          {t('diamondSponsors')}
        </Typography>
      </Box>
      <Grid container direction="row" alignItems="center" gap={2}>
        <Box
          component="a"
          data-ga-event-category="sponsor"
          data-ga-event-action={spot}
          data-ga-event-label="octopus"
          href="https://octopus.com/?utm_source=materialui&utm_medium=referral"
          rel="noopener noreferrer sponsored"
          target="_blank"
          style={{ width: 40, height: 40 }}
        >
          <img
            width="40"
            height="40"
            src="/static/sponsors/octopus.png"
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
            width: 40,
            height: 40,
            pt: '10px',
            pl: '5px',
            border: `1px solid ${
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[700]
                : theme.palette.grey[300]
            }`,
            borderRadius: 0.5,
          }}
        >
          <img
            width="30"
            height="15"
            src={`/static/sponsors/doit.png`}
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
        >
          +1
        </Placeholder>
      </Grid>
    </Root>
  );
}

DiamondSponsors.propTypes = {
  spot: PropTypes.string.isRequired,
};
