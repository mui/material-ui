/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable material-ui/no-hardcoded-labels */
import * as React from 'react';
import PropTypes from 'prop-types';
import GitHubIcon from '@material-ui/icons/GitHub';
import SketchIcon from 'docs/src/modules/components/SketchIcon';
import FigmaIcon from 'docs/src/modules/components/FigmaIcon';
import BundleSizeIcon from 'docs/src/modules/components/BundleSizeIcon';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import W3CIcon from 'docs/src/modules/components/W3CIcon';
import MaterialDesignIcon from 'docs/src/modules/components/MaterialDesignIcon';
import { useSelector } from 'react-redux';
import { makeStyles, fade } from '@material-ui/core/styles';

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
      padding: theme.spacing(0.5, 1, 0.5, 0.5),
      border: `1px solid ${fade(theme.palette.action.active, 0.12)}`,
      borderRadius: theme.shape.borderRadius,
    },
    '& a': {
      color: theme.palette.text.primary,
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
    },
    '& svg': {
      marginRight: theme.spacing(1),
    },
  },
}));

export default function ComponentLinkHeader(props) {
  const { headers } = props;
  const classes = useStyles();
  const t = useSelector((state) => state.options.t);

  return (
    <ul className={classes.root}>
      <li>
        <a
          target="_blank"
          rel="noopener nofollow"
          href={`https://github.com/mui-org/material-ui/tree/next/packages/material-ui/src/${headers.components[0]}`}
        >
          <GitHubIcon />
          {t('viewGitHubSort')}
        </a>
      </li>
      {headers.materialDesign ? (
        <li>
          <a target="_blank" rel="noopener nofollow" href={headers.materialDesign}>
            <MaterialDesignIcon /> Material Design
          </a>
        </li>
      ) : null}
      <li>
        <a
          target="_blank"
          rel="noopener nofollow"
          href={`https://github.com/mui-org/material-ui/issues?q=is%3Aissue+label%3A%22${headers.githubLabel}%22`}
        >
          <InfoOutlinedIcon />
          Feedback
        </a>
      </li>
      {headers.waiAria ? (
        <li>
          <a target="_blank" rel="noopener nofollow" href={headers.waiAria}>
            <W3CIcon /> WAI-ARIA
          </a>
        </li>
      ) : null}
      <li>
        <a
          target="_blank"
          rel="noopener nofollow"
          href={`https://bundlephobia.com/result?p=${headers.package}@next#:~:text=${headers.components[0]}`}
        >
          <BundleSizeIcon />
          Bundle size
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noopener nofollow"
          href="https://material-ui.com/store/items/sketch-react/"
        >
          <SketchIcon />
          Sketch
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noopener nofollow"
          href="https://material-ui.com/store/items/figma-react/"
        >
          <FigmaIcon />
          Figma
        </a>
      </li>
    </ul>
  );
}

ComponentLinkHeader.propTypes = {
  headers: PropTypes.object.isRequired,
};
