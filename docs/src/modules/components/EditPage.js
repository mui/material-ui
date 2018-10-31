import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Context from './context';

function EditPage(props) {
  const { markdownLocation, sourceCodeRootUrl } = props;

  return (
    <Context.Consumer>
      {({ userLanguage }) => {
        if (userLanguage === 'zh') {
          return (
            <Button component="a" href="https://translate.material-ui.com/project/material-ui-docs">
              {'将此页面翻译成中文'}
            </Button>
          );
        }

        return (
          <Button component="a" href={`${sourceCodeRootUrl}${markdownLocation}`}>
            {'Edit this page'}
          </Button>
        );
      }}
    </Context.Consumer>
  );
}

EditPage.propTypes = {
  markdownLocation: PropTypes.string.isRequired,
  sourceCodeRootUrl: PropTypes.string.isRequired,
};

export default EditPage;
