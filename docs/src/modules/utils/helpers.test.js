import { expect } from 'chai';
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
    expect(getDependencies(s1)).to.deep.equal({
      '@foo-bar/bip': 'latest',
      '@material-ui/core': 'latest',
      'prop-types': 'latest',
      'react-dom': 'latest',
      react: 'latest',
    });
  });

  it('should handle * dependencies', () => {
    const source = `
import React from 'react';
import PropTypes from 'prop-types';
import * as _ from '@unexisting/thing';
import Draggable from 'react-draggable';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
const suggestions = [
`;

    expect(getDependencies(source)).to.deep.equal({
      '@material-ui/core': 'latest',
      '@unexisting/thing': 'latest',
      'autosuggest-highlight': 'latest',
      'prop-types': 'latest',
      'react-draggable': 'latest',
      'react-dom': 'latest',
      react: 'latest',
    });
  });

  it('should support next dependencies', () => {
    expect(getDependencies(s1, { reactVersion: 'next' })).to.deep.equal({
      '@foo-bar/bip': 'latest',
      '@material-ui/core': 'latest',
      'prop-types': 'latest',
      'react-dom': 'next',
      react: 'next',
    });
  });

  it('should support direct import', () => {
    const source = `
import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from '@material-ui/pickers';
`;

    expect(getDependencies(source)).to.deep.equal({
      'date-fns': 'latest',
      '@date-io/date-fns': 'v1',
      '@material-ui/pickers': 'latest',
      '@material-ui/core': 'latest',
      'prop-types': 'latest',
      'react-dom': 'latest',
      react: 'latest',
    });
  });

  it('can collect required @types packages', () => {
    expect(getDependencies(s1, { codeLanguage: 'TS' })).to.deep.equal({
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

  it('should handle multilines', () => {
    const source = `
import 'date-fns';
import React from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
    `;

    expect(getDependencies(source)).to.deep.equal({
      'date-fns': 'latest',
      '@material-ui/pickers': 'latest',
      react: 'latest',
      'react-dom': 'latest',
    });
  });

  it('should include core if lab present', () => {
    const source = `
import lab from '@material-ui/lab';
    `;

    expect(getDependencies(source)).to.deep.equal({
      '@material-ui/core': 'latest',
      '@material-ui/lab': 'latest',
      react: 'latest',
      'react-dom': 'latest',
    });
  });
});
