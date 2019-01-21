import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import JavascriptIcon from '@material-ui/docs/svgIcons/Javascript';
import TypescriptIcon from '@material-ui/docs/svgIcons/Typescript';
import HooksIcon from '@material-ui/docs/svgIcons/Hooks';
import { CODE_VARIANTS } from 'docs/src/modules/constants';

function DemoLanguages(props) {
  const { demo, gaEventCategory, onLanguageClick } = props;
  const hasHooksVariant = demo.rawHooks;
  const hasTSVariant = demo.rawTS;
  const hasMultipleLanguages = hasHooksVariant || hasTSVariant;

  if (!hasMultipleLanguages) {
    return null;
  }

  return (
    <React.Fragment>
      {hasHooksVariant && (
        <Tooltip title="Show React Hooks source" placement="top">
          <IconButton
            aria-label="Show React Hooks source"
            data-ga-event-category={gaEventCategory}
            data-ga-event-action="source-hooks"
            onClick={onLanguageClick}
            value={CODE_VARIANTS.HOOK}
          >
            <HooksIcon />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="Show JavaScript source" placement="top">
        <IconButton
          aria-label="Show JavaScript source"
          data-ga-event-category={gaEventCategory}
          data-ga-event-action="source-js"
          onClick={onLanguageClick}
          value={CODE_VARIANTS.JS}
        >
          <JavascriptIcon />
        </IconButton>
      </Tooltip>
      {hasTSVariant && (
        <Tooltip title="Show TypeScript source" placement="top">
          <IconButton
            aria-label="ShowType Script source"
            data-ga-event-category={gaEventCategory}
            data-ga-event-action="source-ts"
            onClick={onLanguageClick}
            value={CODE_VARIANTS.TS}
          >
            <TypescriptIcon />
          </IconButton>
        </Tooltip>
      )}
    </React.Fragment>
  );
}

DemoLanguages.propTypes = {
  demo: PropTypes.object.isRequired,
  gaEventCategory: PropTypes.string.isRequired,
  onLanguageClick: PropTypes.func,
};

export default DemoLanguages;
