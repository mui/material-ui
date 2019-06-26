import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { JavaScript as JavaScriptIcon, TypeScript as TypeScriptIcon } from '@material-ui/docs';
import { CODE_VARIANTS } from 'docs/src/modules/constants';
import compose from 'docs/src/modules/utils/compose';
import { connect } from 'react-redux';

const styles = {
  toggleButtonGroup: {
    margin: '8px 0',
  },
  toggleButton: {
    height: 32,
  },
};

function DemoLanguages(props) {
  const { classes, codeOpen, codeVariant, demo, gaEventCategory, onLanguageClick, t } = props;
  const hasTSVariant = demo.rawTS;

  function renderedCodeVariant() {
    if (codeVariant === CODE_VARIANTS.TS && hasTSVariant) {
      return CODE_VARIANTS.TS;
    }
    return CODE_VARIANTS.JS;
  }

  return (
    <Fade in={codeOpen}>
      <ToggleButtonGroup
        className={classes.toggleButtonGroup}
        exclusive
        value={renderedCodeVariant()}
        onChange={onLanguageClick}
      >
        <ToggleButton
          className={classes.toggleButton}
          value={CODE_VARIANTS.JS}
          aria-label={t('showJSSource')}
          data-ga-event-category={gaEventCategory}
          data-ga-event-action="source-js"
        >
          <JavaScriptIcon />
        </ToggleButton>
        <ToggleButton
          className={classes.toggleButton}
          value={CODE_VARIANTS.TS}
          disabled={!hasTSVariant}
          aria-label={t('showTSSource')}
          data-ga-event-category={gaEventCategory}
          data-ga-event-action="source-ts"
        >
          <TypeScriptIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Fade>
  );
}

DemoLanguages.propTypes = {
  classes: PropTypes.object.isRequired,
  codeOpen: PropTypes.bool.isRequired,
  codeVariant: PropTypes.string.isRequired,
  demo: PropTypes.object.isRequired,
  gaEventCategory: PropTypes.string.isRequired,
  onLanguageClick: PropTypes.func,
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(
    state => ({
      t: state.options.t,
    }),
    {},
  ),
  withStyles(styles),
)(DemoLanguages);
