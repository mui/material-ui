import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import JSLogo from '@material-ui/docs/svgIcons/JSLogo';
import TSLogo from '@material-ui/docs/svgIcons/TSLogo';
import HookLogo from '@material-ui/docs/svgIcons/HookLogo';
import { CODE_VARIANTS } from 'docs/src/modules/constants';

function DemoLanguages(props) {
  const { demo, onLanguageClick } = props;
  const hasHooksVariant = demo.rawHooks;
  const hasTSVariant = demo.rawTS;
  const hasMultipleLanguages = hasHooksVariant || hasTSVariant;

  if (!hasMultipleLanguages) {
    return null;
  }

  return (
    <>
      {hasHooksVariant && (
        <Tooltip title="Set source using React Hooks" placement="top">
          <IconButton
            aria-label="Set source using React Hooks"
            onClick={onLanguageClick}
            value={CODE_VARIANTS.HOOK}
          >
            <HookLogo />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="Set source in JavaScript" placement="top">
        <IconButton
          aria-label="Set source in JavaScript"
          onClick={onLanguageClick}
          value={CODE_VARIANTS.JS}
        >
          <JSLogo />
        </IconButton>
      </Tooltip>
      {hasTSVariant && (
        <Tooltip title="Set source in TypeScript" placement="top">
          <IconButton
            aria-label="Set source in TypeScript"
            onClick={onLanguageClick}
            value={CODE_VARIANTS.TS}
          >
            <TSLogo />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
}

DemoLanguages.propTypes = {
  demo: PropTypes.object.isRequired,
  onLanguageClick: PropTypes.func,
  outdatedTS: PropTypes.bool,
};

export default DemoLanguages;
