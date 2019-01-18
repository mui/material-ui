import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

function EditPage(props) {
  const { markdownLocation, options, sourceCodeRootUrl } = props;

  if (options.userLanguage === 'zh') {
    return (
      <Button component="a" href="https://translate.material-ui.com/">
        {'将此页面翻译成中文'}
      </Button>
    );
  }

  if (options.userLanguage === 'pt') {
    return (
      <Button component="a" href="https://translate.material-ui.com/">
        {'Ajude a traduzir esta página'}
      </Button>
    );
  }

  return (
    <Button component="a" href={`${sourceCodeRootUrl}${markdownLocation}`}>
      {'Edit this page'}
    </Button>
  );
}

EditPage.propTypes = {
  markdownLocation: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  sourceCodeRootUrl: PropTypes.string.isRequired,
};

export default connect(state => ({ options: state.options }))(EditPage);
