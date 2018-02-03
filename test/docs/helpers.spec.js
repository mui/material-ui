import { assert } from 'chai';
import { getDependencies } from 'docs/src/modules/utils/helpers';

const s1 = `import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formContro
`;

const s2 = `import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

const suggestions = [`;

describe('docs getDependencies helpers', () => {
  it('generate the right npm dependencies', () => {
    assert.deepEqual(getDependencies(s1), {
      react: 'latest',
      'react-dom': 'latest',
      'material-ui': 'next',
      'prop-types': 'latest',
    });
    assert.deepEqual(getDependencies(s2), {
      react: 'latest',
      'react-dom': 'latest',
      'material-ui': 'next',
      'prop-types': 'latest',
      'react-autosuggest': 'latest',
      'autosuggest-highlight': 'latest',
    });
  });
});
