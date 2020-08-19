import * as React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import SketchIcon from 'docs/src/modules/components/SketchIcon';
import FigmaIcon from 'docs/src/modules/components/FigmaIcon';
import BundleSizeIcon from 'docs/src/modules/components/BundleSizeIcon';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import W3CIcon from 'docs/src/modules/components/W3CIcon';
import MaterialDesignIcon from 'docs/src/modules/components/MaterialDesignIcon';
import { useSelector } from 'react-redux';
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
  const { headers } = props;
  const classes = useStyles();
  const t = useSelector((state) => state.options.t);

  let folder;

  if (headers.package === '@material-ui/lab') {
    folder = 'material-ui-lab';
  } else {
    folder = 'material-ui';
  }

  return (
    <ul className={classes.root}>
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
      <li>
        <Chip
          clickable
          role={undefined}
          component="a"
          variant="outlined"
          rel="nofollow"
          href={`https://github.com/mui-org/material-ui/issues?q=is%3Aissue+is%3Aopen+label%3A%22${headers.githubLabel}%22`}
          icon={<InfoOutlinedIcon />}
          data-ga-event-category="ComponentLinkHeader"
          data-ga-event-action="click"
          data-ga-event-label="Feedback"
          data-ga-event-split="0.1"
          label="Feedback"
        />
      </li>
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
        <Tooltip title="Scroll down to 'Exports Analysis' for a more detailed report.">
          <Chip
            clickable
            role={undefined}
            component="a"
            variant="outlined"
            rel="nofollow"
            href={`https://bundlephobia.com/result?p=${headers.package}@next`}
            icon={<BundleSizeIcon />}
            data-ga-event-category="ComponentLinkHeader"
            data-ga-event-action="click"
            data-ga-event-label="Bundle size"
            data-ga-event-split="0.1"
            label="Bundle size"
          />
        </Tooltip>
      </li>
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
    </ul>
  );
}

ComponentLinkHeader.propTypes = {
  headers: PropTypes.object.isRequired,
};
