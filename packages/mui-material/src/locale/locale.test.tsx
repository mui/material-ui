/// <reference types="vite/client" />
import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { createRenderer, screen, within } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Pagination from '@mui/material/Pagination';
import Rating from '@mui/material/Rating';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import * as locales from '@mui/material/locale';
import type { Localization } from './utils/LocaleTextApi';

type LocalizedComponentName = keyof NonNullable<Localization['components']>;

interface LocalizedStrings {
  // shown as text
  texts: React.ReactNode[];
  // shown as accessible labels
  labels: React.ReactNode[];
}

const localeFiles = import.meta.glob<Record<string, Localization>>(['./*.ts', '!./index.ts'], {
  eager: true,
});

// `enUS` is empty since the components already default to English, see #21098.
const localeEntries = Object.entries(locales).filter(
  (entry): entry is [string, Localization] => typeof entry[1] === 'object' && entry[0] !== 'enUS',
);

type LocalizedProps<Name extends LocalizedComponentName> = NonNullable<
  NonNullable<Localization['components']>[Name]
>['defaultProps'];

/**
 * How each localized prop shows up in the components rendered below, as text or as an accessible
 * label. Typed so every prop in `Localization` needs an entry: adding one fails type checking until
 * it's covered here.
 */
const localizedProps: {
  [Name in LocalizedComponentName]-?: {
    [Prop in keyof LocalizedProps<Name>]-?: (
      value: NonNullable<LocalizedProps<Name>[Prop]>,
    ) => Partial<LocalizedStrings>;
  };
} = {
  MuiAlert: {
    closeText: (value) => ({ labels: [value] }),
  },
  MuiAutocomplete: {
    clearText: (value) => ({ labels: [value] }),
    closeText: (value) => ({ labels: [value] }),
    loadingText: (value) => ({ texts: [value] }),
    noOptionsText: (value) => ({ texts: [value] }),
    openText: (value) => ({ labels: [value] }),
  },
  MuiBreadcrumbs: {
    expandText: (value) => ({ labels: [value] }),
  },
  MuiPagination: {
    'aria-label': (value) => ({ labels: [value] }),
    getItemAriaLabel: (getLabel) => ({
      labels: [
        getLabel('page', 1, false),
        getLabel('page', 2, true),
        getLabel('first', 1, false),
        getLabel('previous', 1, false),
        getLabel('next', 3, false),
        getLabel('last', 3, false),
      ],
    }),
  },
  MuiRating: {
    emptyLabelText: (value) => ({ labels: [value] }),
    getLabelText: (getLabel) => ({ labels: [getLabel(1), getLabel(5)] }),
  },
  MuiTablePagination: {
    getItemAriaLabel: (getLabel) => ({
      labels: [getLabel('first'), getLabel('previous'), getLabel('next'), getLabel('last')],
    }),
    labelDisplayedRows: (getLabel) => ({
      texts: [getLabel({ from: 11, to: 20, count: 100, page: 1 })],
    }),
    labelRowsPerPage: (value) => ({ texts: [value] }),
  },
};

/**
 * Gets the strings a locale translates for each component, as they show up in the components
 * rendered below. A locale can leave a string out, in which case the component falls back to English.
 */
function getLocalizedStrings({
  components = {},
}: Localization): Partial<Record<LocalizedComponentName, LocalizedStrings>> {
  const strings: Partial<Record<LocalizedComponentName, LocalizedStrings>> = {};

  Object.entries(components).forEach(([name, component]) => {
    if (!component) {
      return;
    }
    const getters: Record<string, (value: any) => Partial<LocalizedStrings>> =
      localizedProps[name as LocalizedComponentName];
    if (!getters) {
      throw new Error(`No test coverage for localized component ${name}`);
    }
    const componentStrings: LocalizedStrings = { texts: [], labels: [] };
    Object.entries(component.defaultProps).forEach(([prop, value]) => {
      if (!getters[prop]) {
        throw new Error(`No test coverage for localized prop ${name}.${prop}`);
      }
      if (value !== undefined) {
        const { texts = [], labels = [] } = getters[prop](value);
        componentStrings.texts.push(...texts);
        componentStrings.labels.push(...labels);
      }
    });
    strings[name as LocalizedComponentName] = componentStrings;
  });

  return strings;
}

function renderInput(params: object) {
  return <TextField {...params} />;
}

// Every component a locale can translate, each in its own container since locales reuse strings
// across components, in a state that shows each translated string.
const localizedComponents = (
  <React.Fragment>
    <div data-testid="MuiAlert">
      <Alert onClose={() => {}}>message</Alert>
    </div>
    <div data-testid="MuiAutocomplete">
      <Autocomplete open disablePortal options={[]} renderInput={renderInput} />
      <Autocomplete open disablePortal loading options={[]} renderInput={renderInput} />
      <Autocomplete options={['option']} defaultValue="option" renderInput={renderInput} />
    </div>
    <div data-testid="MuiBreadcrumbs">
      <Breadcrumbs maxItems={2}>
        <span>first</span>
        <span>second</span>
        <span>third</span>
      </Breadcrumbs>
    </div>
    <div data-testid="MuiPagination">
      <Pagination count={3} defaultPage={2} showFirstButton showLastButton />
    </div>
    <div data-testid="MuiRating">
      <Rating name="rating" />
    </div>
    <div data-testid="MuiTablePagination">
      <TablePagination
        component="div"
        count={100}
        page={1}
        rowsPerPage={10}
        onPageChange={() => {}}
        showFirstButton
        showLastButton
      />
    </div>
  </React.Fragment>
);

// Match text exactly, since some locales use non-breaking spaces that the default normalizer would collapse.
const exact = { normalizer: (text: string) => text };

function expectLocalized(locale: Localization) {
  Object.entries(getLocalizedStrings(locale)).forEach(([name, { texts, labels }]) => {
    const component = within(screen.getByTestId(name));
    texts.forEach((text) => {
      if (text !== undefined) {
        expect(component.getAllByText(text as string, exact).length).to.be.greaterThan(0);
      }
    });
    labels.forEach((label) => {
      if (label !== undefined) {
        expect(component.getAllByLabelText(label as string, exact).length).to.be.greaterThan(0);
      }
    });
  });
}

describe('locale', () => {
  const { render } = createRenderer();

  it('exports every locale file from the index', () => {
    const fileExports = Object.values(localeFiles).flatMap((module) => Object.keys(module));

    expect(fileExports.length).to.be.greaterThan(0);
    expect(Object.keys(locales)).to.include.members(fileExports);
  });

  it.each(localeEntries)('%s translates to non-empty strings', (_, locale) => {
    const strings = Object.values(getLocalizedStrings(locale)).flatMap(({ texts, labels }) => [
      ...texts,
      ...labels,
    ]);

    expect(strings.length).to.be.greaterThan(0);
    strings.forEach((text) => {
      if (text !== undefined) {
        expect(text).to.be.a('string').and.not.equal('');
      }
    });
  });

  it('localizes components through the theme', () => {
    render(
      <ThemeProvider theme={createTheme({}, locales.deDE)}>{localizedComponents}</ThemeProvider>,
    );

    expectLocalized(locales.deDE);
  });

  it('localizes components through a CSS variables theme', () => {
    render(
      <ThemeProvider theme={createTheme({ cssVariables: true }, locales.deDE)}>
        {localizedComponents}
      </ThemeProvider>,
    );

    expectLocalized(locales.deDE);
  });
});
