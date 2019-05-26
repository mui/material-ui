import { assert } from 'chai';
import { getDependencies } from './helpers';

describe('docs getDependencies helpers', () => {
  const s1 = `
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import FooBar, { Qux } from '@foo-bar/bip';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formContro
`;

  it('should handle @ dependencies', () => {
    assert.deepEqual(getDependencies(s1), {
      '@foo-bar/bip': 'latest',
      '@material-ui/core': 'latest',
      'prop-types': 'latest',
      'react-dom': 'latest',
      react: 'latest',
    });
  });

  it('should handle * dependencies', () => {
    const s2 = `
import React from 'react';
import PropTypes from 'prop-types';
import * as _ from '@unexisting/thing';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
const suggestions = [
`;

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

  it('should support next dependencies', () => {
    assert.deepEqual(getDependencies(s1, { reactVersion: 'next' }), {
      '@foo-bar/bip': 'latest',
      '@material-ui/core': 'latest',
      'prop-types': 'latest',
      'react-dom': 'next',
      react: 'next',
    });
  });

  it('should support direct import', () => {
    const s3 = `
import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from '@material-ui/pickers';
`;

    assert.deepEqual(getDependencies(s3), {
      'date-fns': 'next',
      '@date-io/date-fns': 'latest',
      '@material-ui/pickers': 'latest',
      '@material-ui/core': 'latest',
      'prop-types': 'latest',
      'react-dom': 'latest',
      react: 'latest',
    });
  });

  it('can collect required @types packages', () => {
    assert.deepEqual(getDependencies(s1, { codeLanguage: 'TS' }), {
      '@foo-bar/bip': 'latest',
      '@material-ui/core': 'latest',
      'prop-types': 'latest',
      'react-dom': 'latest',
      react: 'latest',
      '@types/foo-bar__bip': 'latest',
      '@types/prop-types': 'latest',
      '@types/react-dom': 'latest',
      '@types/react': 'latest',
      typescript: 'latest',
    });
  });
});
