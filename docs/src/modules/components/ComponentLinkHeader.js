import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import SketchIcon from 'docs/src/modules/components/SketchIcon';
import FigmaIcon from 'docs/src/modules/components/FigmaIcon';
import BundleSizeIcon from 'docs/src/modules/components/BundleSizeIcon';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import W3CIcon from 'docs/src/modules/components/W3CIcon';
import MaterialDesignIcon from 'docs/src/modules/components/MaterialDesignIcon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2),
    '& li': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function ComponentLinkHeader(props) {
  const {
    headers,
    headers: { packageName = '@material-ui/core' },
    options,
  } = props;
  const classes = useStyles();
  const t = useSelector((state) => state.options.t);

  if (headers.materialDesign && options.design === false) {
    throw new Error('missing design assets');
  }

  return (
    <ul className={classes.root}>
      {headers.githubLabel ? (
        <li>
          <Chip
            clickable
            role={undefined}
            component="a"
            variant="outlined"
            rel="nofollow"
            href={`https://github.com/mui-org/material-ui/labels/${encodeURIComponent(
              headers.githubLabel,
            )}`}
            icon={<InfoOutlinedIcon />}
            data-ga-event-category="ComponentLinkHeader"
            data-ga-event-action="click"
            data-ga-event-label={t('githubLabel')}
            data-ga-event-split="0.1"
            label={t('githubLabel')}
          />
        </li>
      ) : null}
      {headers.waiAria ? (
        <li>
          <Chip
            clickable
            role={undefined}
            component="a"
            variant="outlined"
            rel="nofollow"
            href={headers.waiAria}
            icon={<W3CIcon />}
            data-ga-event-category="ComponentLinkHeader"
            data-ga-event-action="click"
            data-ga-event-label="WAI-ARIA"
            data-ga-event-split="0.1"
            label="WAI-ARIA"
          />
        </li>
      ) : null}
      <li>
        <Tooltip title={t('bundleSizeTooltip')}>
          <Chip
            clickable
            role={undefined}
            component="a"
            variant="outlined"
            rel="nofollow"
            href={`https://bundlephobia.com/result?p=${packageName}@next`}
            icon={<BundleSizeIcon />}
            data-ga-event-category="ComponentLinkHeader"
            data-ga-event-action="click"
            data-ga-event-label={t('bundleSize')}
            data-ga-event-split="0.1"
            label={t('bundleSize')}
          />
        </Tooltip>
      </li>
      {headers.materialDesign ? (
        <li>
          <Chip
            clickable
            role={undefined}
            component="a"
            variant="outlined"
            rel="nofollow"
            href={headers.materialDesign}
            icon={<MaterialDesignIcon />}
            data-ga-event-category="ComponentLinkHeader"
            data-ga-event-action="click"
            data-ga-event-label="Material Design"
            data-ga-event-split="0.1"
            label="Material Design"
          />
        </li>
      ) : null}
      {options.design !== false ? (
        <React.Fragment>
          <li>
            <Chip
              clickable
              role={undefined}
              component="a"
              variant="outlined"
              rel="nofollow"
              href="https://material-ui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=component-link-header"
              icon={<SketchIcon />}
              data-ga-event-category="ComponentLinkHeader"
              data-ga-event-action="click"
              data-ga-event-label="Sketch"
              data-ga-event-split="0.1"
              label="Sketch"
            />
          </li>
          <li>
            <Chip
              clickable
              role={undefined}
              component="a"
              variant="outlined"
              rel="nofollow"
              href="https://material-ui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=component-link-header"
              icon={<FigmaIcon />}
              data-ga-event-category="ComponentLinkHeader"
              data-ga-event-action="click"
              data-ga-event-label="Figma"
              data-ga-event-split="0.1"
              label="Figma"
            />
          </li>
        </React.Fragment>
      ) : null}
    </ul>
  );
}

ComponentLinkHeader.propTypes = {
  headers: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
};
