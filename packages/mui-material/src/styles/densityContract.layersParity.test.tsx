import * as React from 'react';
import { describe, test, expect } from 'vitest';
import { createRenderer, isJsdom } from '@mui/internal-test-utils';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import { createTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import enhanceDensity from './enhanceDensity';
import {
  FIELDS,
  SIZES,
  TABLE_PAGINATION,
  TITLED_DIALOG_CONTENT,
  autocompleteField,
  byName,
  cases,
  css,
  grid,
  inTheme,
  selectField,
  sideBySide,
} from '../../test/densityContract';

type Read = { node: React.ReactNode; selector: string; properties: string[] };

const OPTIONS = ['Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry'];

const READS: Record<string, Read> = {
  'Select caret': {
    node: selectField(undefined, 'plain', 'A long selected option', { sx: { width: 160 } }),
    selector: '.MuiSelect-select',
    properties: ['padding-right'],
  },
  'Select multiple with wrapping chips': {
    node: (
      <Select
        multiple
        value={OPTIONS}
        sx={{ width: 160 }}
        renderValue={(selected) => (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} size="small" />
            ))}
          </div>
        )}
      >
        {OPTIONS.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    ),
    selector: '.MuiSelect-select',
    properties: ['height'],
  },
  'native Select multiple': {
    node: (
      <Select native multiple value={OPTIONS} onChange={() => {}}>
        {OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    ),
    selector: 'select',
    properties: ['height'],
  },
  ...Object.fromEntries(
    (['outlined', 'filled'] as const).flatMap((variant) => [
      [
        `native ${variant} Select caret`,
        {
          node: (
            <Select native variant={variant} value="a" onChange={() => {}} sx={{ width: 160 }}>
              <option value="a">A long selected option</option>
            </Select>
          ),
          selector: 'select',
          properties: ['padding-right'],
        },
      ],
      [
        `${variant} Select with an end adornment`,
        {
          node: selectField(variant, 'adornment'),
          selector: '.MuiInputBase-root',
          properties: ['padding-right'],
        },
      ],
    ]),
  ),
  'DialogContent under a DialogTitle': {
    node: TITLED_DIALOG_CONTENT,
    selector: '.MuiDialogContent-root',
    properties: ['padding-top'],
  },
  ...Object.fromEntries(
    SIZES.flatMap((size) => [
      [
        `Chip ${size} avatar`,
        {
          node: <Chip size={size} avatar={<Avatar>M</Avatar>} label="Chip" />,
          selector: '.MuiChip-avatar',
          properties: ['font-size'],
        },
      ],
      [
        `Chip ${size} delete icon`,
        {
          node: <Chip size={size} label="Chip" onDelete={() => {}} />,
          selector: '.MuiChip-deleteIcon',
          properties: ['font-size'],
        },
      ],
    ]),
  ),
  ...Object.fromEntries(
    ['root', 'toolbar'].map((slot) => [
      `TablePagination ${slot}`,
      {
        node: TABLE_PAGINATION,
        selector: `.MuiTablePagination-${slot}`,
        properties: ['padding-left', 'padding-right'],
      },
    ]),
  ),
  ...Object.fromEntries(
    Object.entries(
      grid([['small', 'medium', 'large']], (size) => <Pagination size={size} count={3} />),
    ).map(([size, node]) => [
      `Pagination ${size} icon`,
      { node, selector: '.MuiPaginationItem-icon', properties: ['font-size'] },
    ]),
  ),
  ...Object.fromEntries(
    FIELDS.map((name) => [
      `Autocomplete ${name}`,
      {
        node: autocompleteField(name, { multiple: true }),
        selector: '.MuiAutocomplete-inputRoot',
        properties: ['padding-top', 'padding-bottom'],
      },
    ]),
  ),
};

describe.skipIf(isJsdom())('density contract parity with modularCssLayers', () => {
  const { render } = createRenderer();

  test('density styles render the same with and without layers', () => {
    const names = Object.keys(READS);
    const read = (theme: Theme) => {
      const { unmount } = render(
        sideBySide({ only: theme }, cases(byName(names, (name) => READS[name].node))),
      );
      const values = byName(names, (name) =>
        READS[name].properties.map((property) =>
          css(READS[name].selector, inTheme('only', name)).getPropertyValue(property),
        ),
      );
      unmount();
      return values;
    };
    const unlayered = read(enhanceDensity(createTheme()));

    expect(read(enhanceDensity(createTheme({ modularCssLayers: true })))).to.deep.equal(unlayered);
  });
});
