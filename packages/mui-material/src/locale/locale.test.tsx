import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import TablePagination from '@mui/material/TablePagination';
import * as locales from '@mui/material/locale';

describe('locale', () => {
  const { render } = createRenderer();

  [false, true].forEach((cssVariables) => {
    it(`localizes components through createTheme (cssVariables: ${cssVariables})`, () => {
      render(
        <ThemeProvider theme={createTheme({ cssVariables }, locales.deDE)}>
          <Alert onClose={() => {}}>message</Alert>
          <TablePagination
            component="div"
            count={100}
            page={0}
            rowsPerPage={10}
            onPageChange={() => {}}
          />
        </ThemeProvider>,
      );

      expect(screen.getByRole('button', { name: 'Schließen' })).not.to.equal(null);
      expect(screen.getByText('Zeilen pro Seite:')).not.to.equal(null);
      expect(screen.getByRole('button', { name: 'Zur nächsten Seite' })).not.to.equal(null);
    });
  });

  it('has no empty translations', () => {
    Object.entries(locales).forEach(([name, locale]) => {
      Object.values(locale.components ?? {}).forEach((component) => {
        Object.entries(component?.defaultProps ?? {}).forEach(([prop, value]) => {
          expect(value, `${name} ${prop}`).not.to.equal('');
        });
      });
    });
  });
});
