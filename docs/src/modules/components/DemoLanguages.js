import React from 'react';
import PropTypes from 'prop-types';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
// import Tooltip from '@material-ui/core/Tooltip';
import JavascriptIcon from '@material-ui/docs/svgIcons/Javascript';
import TypescriptIcon from '@material-ui/docs/svgIcons/Typescript';
import HooksIcon from '@material-ui/docs/svgIcons/Hooks';
import { CODE_VARIANTS } from 'docs/src/modules/constants';

function DemoLanguages(props) {
  const { codeOpen, codeVariant, demo, gaEventCategory, onLanguageClick } = props;
  const hasHooksVariant = demo.rawHooks;
  const hasTSVariant = demo.rawTS;

  return (
    <React.Fragment>
      {codeOpen ? (
        <div style={{ padding: '8px 0px' }}>
          <ToggleButtonGroup exclusive value={codeVariant} onChange={onLanguageClick}>
            {/* <Tooltip title="Show JavaScript source" placement="top"> */}
            <ToggleButton
              value={CODE_VARIANTS.JS}
              aria-label="Show JavaScript source"
              data-ga-event-category={gaEventCategory}
              data-ga-event-action="source-js"
            >
              <JavascriptIcon />
            </ToggleButton>
            {/* </Tooltip> */}
            {/* <Tooltip title="Show TypeScript source" placement="top"> */}
            <ToggleButton
              value={CODE_VARIANTS.TS}
              disabled={!hasTSVariant}
              aria-label="Show TypeScript source"
              data-ga-event-category={gaEventCategory}
              data-ga-event-action="source-ts"
            >
              <TypescriptIcon />
            </ToggleButton>
            {/* </Tooltip> */}
            {/* <Tooltip title="Show Hooks source" placement="top"> */}
            <ToggleButton
              value={CODE_VARIANTS.HOOK}
              disabled={!hasHooksVariant}
              aria-label="Show Hooks source"
              data-ga-event-category={gaEventCategory}
              data-ga-event-action="source-hooks"
            >
              <HooksIcon />
            </ToggleButton>
            {/* </Tooltip> */}
          </ToggleButtonGroup>
        </div>
      ) : (
        <div />
      )}
    </React.Fragment>
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
