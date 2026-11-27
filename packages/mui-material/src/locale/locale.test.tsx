import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import OTPField from '@mui/material/OTPField';
import TablePagination from '@mui/material/TablePagination';
import * as locales from '@mui/material/locale';

describe('locale', () => {
  const { render } = createRenderer();

  [false, true].forEach((cssVariables) => {
    it(`localizes components through createTheme (cssVariables: ${cssVariables})`, () => {
      render(
        <ThemeProvider theme={createTheme({ cssVariables }, locales.deDE)}>
          <Alert onClose={() => {}}>message</Alert>
          <OTPField label="Bestätigungscode" length={4} />
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
      const [first, second] = screen.getAllByRole('textbox');
      expect(first).toHaveAccessibleName('Bestätigungscode');
      expect(second).toHaveAccessibleName('Zeichen 2 von 4');
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
