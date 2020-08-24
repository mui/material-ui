import { expect } from 'chai';
import { getDependencies } from './helpers';

describe('docs getDependencies helpers', () => {
  const s1 = `
import * as React from 'react';
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
      '@material-ui/core': 'next',
      'prop-types': 'latest',
      'react-dom': 'latest',
      react: 'latest',
    });
  });

  it('should handle * dependencies', () => {
    const source = `
import * as React from 'react';
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
      '@material-ui/core': 'next',
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
      '@material-ui/core': 'next',
      'prop-types': 'latest',
      'react-dom': 'next',
      react: 'next',
    });
  });

  it('should support direct import', () => {
    const source = `
import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns";
import { LocalizationProvider as MuiPickersLocalizationProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
`;

    expect(getDependencies(source)).to.deep.equal({
      'date-fns': 'latest',
      '@material-ui/pickers': 'next',
      '@material-ui/core': 'next',
      'prop-types': 'latest',
      'react-dom': 'latest',
      react: 'latest',
    });
  });

  it('can collect required @types packages', () => {
    expect(getDependencies(s1, { codeLanguage: 'TS' })).to.deep.equal({
      '@foo-bar/bip': 'latest',
      '@material-ui/core': 'next',
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
import * as React from 'react';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';
import {
  LocalizationProvider as MuiPickersLocalizationProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
    `;

    expect(getDependencies(source)).to.deep.equal({
      'date-fns': 'latest',
      '@material-ui/core': 'next',
      '@material-ui/pickers': 'next',
      react: 'latest',
      'react-dom': 'latest',
    });
  });

  it('should include core if lab present', () => {
    const source = `
import lab from '@material-ui/lab';
    `;

    expect(getDependencies(source)).to.deep.equal({
      '@material-ui/core': 'next',
      '@material-ui/lab': 'next',
      react: 'latest',
      'react-dom': 'latest',
    });
  });

  it('should support the data-grid component', () => {
    const source = `
import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';
    `;

    expect(getDependencies(source, { codeLanguage: 'TS' })).to.deep.equal({
      '@material-ui/core': 'next',
      '@material-ui/lab': 'next',
      '@material-ui/icons': 'next',
      '@material-ui/data-grid': 'latest',
      '@material-ui/x-grid-data-generator': 'latest',
      '@types/react': 'latest',
      '@types/react-dom': 'latest',
      react: 'latest',
      'react-dom': 'latest',
      typescript: 'latest',
    });
  });
});
