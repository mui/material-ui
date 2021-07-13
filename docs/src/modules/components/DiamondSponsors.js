import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { useTheme, styled } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { useTranslate } from 'docs/src/modules/utils/i18n';

const Root = styled('div')(({ theme }) => ({
  '& a': {
    display: 'block',
    marginBottom: theme.spacing(1),
  },
  '& img': {
    display: 'inline-block',
  },
}));

const Placeholder = styled('a')(({ theme }) => ({
  width: 125,
  height: 35,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.divider,
  border: `1px dashed ${theme.palette.divider}`,
  transition: theme.transitions.create(['color', 'border-color']),
  '&&': {
    display: 'flex',
  },
  '&:hover': {
    borderColor: 'currentColor',
    color: theme.palette.text.secondary,
  },
}));

export default function DiamondSponsors(props) {
  const { spot } = props;
  const theme = useTheme();
  const t = useTranslate();

  return (
    <Root>
      <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
        {t('diamondSponsors')}
      </Typography>
      <a
        data-ga-event-category="sponsor"
        data-ga-event-action={spot}
        data-ga-event-label="octopus"
        href="https://octopus.com/?utm_source=materialui&utm_medium=referral"
        rel="noopener noreferrer sponsored"
        target="_blank"
        style={{ width: 125, height: 35 }}
      >
        <img
          width="125"
          height="35"
          src={`/static/sponsors/octopus-${theme.palette.mode}.png`}
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
        style={{ width: 125, height: 35 }}
      >
        <img
          width="125"
          height="35"
          src={`/static/sponsors/doit-intl.png`}
          alt="doit-intl"
          title="Management Platform for Google Cloud and AWS"
          loading="lazy"
        />
      </a>
      <Placeholder
        aria-label={t('diamondSponsors')}
        rel="noopener noreferrer"
        target="_blank"
        href="/discover-more/backers/#diamond"
      >
        <AddIcon />
      </Placeholder>
    </Root>
  );
}

DiamondSponsors.propTypes = {
  spot: PropTypes.string.isRequired,
};
