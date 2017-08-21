// @flow

import React from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import PropTypes from 'prop-types';
import withWidth, { isWidthUp } from 'material-ui/utils/withWidth';
import Search from 'material-ui-icons/Search';
import { fade } from 'material-ui/styles/colorManipulator';
import { withStyles } from 'material-ui/styles';

let searchTimer;

function initDocsearch() {
  searchTimer = setInterval(() => {
    if (window.docsearch && document.querySelector('#docsearch-input')) {
      clearInterval(searchTimer);
      window.docsearch({
        apiKey: '1d8534f83b9b0cfea8f16498d19fbcab',
        indexName: 'material-ui',
        inputSelector: '#docsearch-input',
        debug: false, // Set debug to true if you want to inspect the dropdown
      });
    }
  }, 100);
}

function removeDocsearch() {
  clearInterval(searchTimer);
}

const styles = theme => ({
  '@global': {
    '.algolia-autocomplete': {
      fontFamily: theme.typography.fontFamily,
      '& .algolia-docsearch-suggestion--title': {
        ...theme.typography.title,
      },
      '& .algolia-docsearch-suggestion--text': {
        ...theme.typography.body1,
      },
      '& .ds-dropdown-menu': {
        boxShadow: theme.shadows[1],
        borderRadius: 2,
        '&::before': {
          display: 'none',
        },
        '& [class^=ds-dataset-]': {
          border: 0,
          borderRadius: 2,
        },
      },
    },
  },
  wrapper: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    borderRadius: 2,
    background: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      background: fade(theme.palette.common.white, 0.25),
    },
    '& $input': {
      transition: theme.transitions.create('width'),
      width: 200,
      '&:focus': {
        width: 250,
      },
    },
  },
  search: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    font: 'inherit',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme
      .spacing.unit * 9}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    color: 'inherit',
    width: '100%',
    '&:focus': {
      outline: 0,
    },
  },
});

function AppSearch(props) {
  const { classes, width } = props;

  if (!isWidthUp('sm', width)) {
    removeDocsearch();
    return null;
  }

  initDocsearch();

  return (
    <div className={classes.wrapper}>
      <div className={classes.search}>
        <Search />
      </div>
      <input id="docsearch-input" className={classes.input} />
    </div>
  );
}

AppSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

export default compose(
  withStyles(styles, {
    name: 'AppSearch',
  }),
  withWidth(),
  pure,
)(AppSearch);
