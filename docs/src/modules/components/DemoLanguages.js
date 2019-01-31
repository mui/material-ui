import React from 'react';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import JavascriptIcon from '@material-ui/docs/svgIcons/Javascript';
import TypescriptIcon from '@material-ui/docs/svgIcons/Typescript';
import HooksIcon from '@material-ui/docs/svgIcons/Hooks';
import { CODE_VARIANTS } from 'docs/src/modules/constants';

function DemoLanguages(props) {
  const { codeOpen, codeVariant, demo, gaEventCategory, onLanguageClick } = props;
  const hasHooksVariant = demo.rawHooks;
  const hasTSVariant = demo.rawTS;

  function renderedCodeVariant() {
    if (codeVariant === CODE_VARIANTS.TS && hasTSVariant) {
      return CODE_VARIANTS.TS;
    }
    if (codeVariant === CODE_VARIANTS.HOOK && hasHooksVariant) {
      return CODE_VARIANTS.HOOK;
    }
    return CODE_VARIANTS.JS;
  }

  return (
    <Fade in={codeOpen}>
      <div style={{ padding: '8px 0px' }}>
        <ToggleButtonGroup exclusive value={renderedCodeVariant()} onChange={onLanguageClick}>
          <ToggleButton
            value={CODE_VARIANTS.JS}
            aria-label="Show JavaScript source"
            data-ga-event-category={gaEventCategory}
            data-ga-event-action="source-js"
          >
            <JavascriptIcon />
          </ToggleButton>
          <ToggleButton
            value={CODE_VARIANTS.TS}
            disabled={!hasTSVariant}
            aria-label="Show TypeScript source"
            data-ga-event-category={gaEventCategory}
            data-ga-event-action="source-ts"
          >
            <TypescriptIcon />
          </ToggleButton>
          <ToggleButton
            value={CODE_VARIANTS.HOOK}
            disabled={!hasHooksVariant}
            aria-label="Show Hooks source"
            data-ga-event-category={gaEventCategory}
            data-ga-event-action="source-hooks"
          >
            <HooksIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </Fade>
  );
}

DemoLanguages.propTypes = {
  codeOpen: PropTypes.bool.isRequired,
  codeVariant: PropTypes.string.isRequired,
  demo: PropTypes.object.isRequired,
  gaEventCategory: PropTypes.string.isRequired,
  onLanguageClick: PropTypes.func,
};

export default DemoLanguages;
