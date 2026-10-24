import { describe, it, expect } from 'vitest';
import { khKH, kmKH } from './index';

describe('Khmer locale', () => {
  it('exports the locale under its ISO language and country codes', () => {
    expect(kmKH.components?.MuiTablePagination?.defaultProps?.labelRowsPerPage).to.equal(
      'ចំនួនជួរដេកក្នុងមួយទំព័រ:',
    );
  });

  it('preserves the previous locale name as an alias', () => {
    expect(khKH).to.equal(kmKH);
  });
});
