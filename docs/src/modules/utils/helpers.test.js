import { assert } from 'chai';
import { getDependencies } from './helpers';

const s1 = `import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input, { InputLabel } from '@material-ui/core/Input';
import { FormControl, FormHelperText } from '@material-ui/core/Form';
import Select from '@material-ui/core/Select';
import FooBar, { Qux } from '@foo-bar/bip';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formContro
`;

const s2 = `import React from 'react';
import PropTypes from 'prop-types';
import * as _ from '@unexisting/thing';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { MenuItem } from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';

const suggestions = [`;

describe('docs getDependencies helpers', () => {
  it('generate the right npm dependencies', () => {
    assert.deepEqual(getDependencies(s1), {
      '@foo-bar/bip': 'latest',
      '@material-ui/core': 'latest',
      'prop-types': 'latest',
      'react-dom': 'latest',
      react: 'latest',
    });
    assert.deepEqual(getDependencies(s2), {
      '@material-ui/core': 'latest',
      '@unexisting/thing': 'latest',
      'autosuggest-highlight': 'latest',
      'prop-types': 'latest',
      'react-autosuggest': 'latest',
      'react-dom': 'latest',
      react: 'latest',
    });
  });
});
