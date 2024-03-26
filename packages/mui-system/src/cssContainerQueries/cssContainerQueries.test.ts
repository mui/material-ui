import { expect } from 'chai';

import createTheme from '@mui/system/createTheme';
import cssContainerQueries, {
  sortContainerQueries,
  getContainerQuery,
} from '@mui/system/cssContainerQueries';

describe('cssContainerQueries', () => {
  it('should have `up`, `down`, `between`, `only`, and `not` functions', () => {
    const theme = cssContainerQueries(createTheme());

    expect(theme.cq.up('sm')).to.equal('@container (min-width:600px)');
    expect(theme.cq.down('sm')).to.equal('@container (max-width:599.95px)');
    expect(theme.cq.between('sm', 'md')).to.equal(
      '@container (min-width:600px) and (max-width:899.95px)',
    );
    expect(theme.cq.only('sm')).to.equal('@container (min-width:600px) and (max-width:899.95px)');
    expect(theme.cq.not('xs')).to.equal('@container (min-width:600px)');
    expect(theme.cq.not('xl')).to.equal('@container (max-width:1535.95px)');
    expect(theme.cq.not('md')).to.equal('@container (width<900px) and (width>1199.95px)');
  });

  it('should be able to create named containment context', () => {
    const theme = cssContainerQueries(createTheme());

    expect(theme.cq('sidebar').up('sm')).to.equal('@container sidebar (min-width:600px)');
    expect(theme.cq('sidebar').down('sm')).to.equal('@container sidebar (max-width:599.95px)');
    expect(theme.cq('sidebar').between('sm', 'md')).to.equal(
      '@container sidebar (min-width:600px) and (max-width:899.95px)',
    );
    expect(theme.cq('sidebar').only('sm')).to.equal(
      '@container sidebar (min-width:600px) and (max-width:899.95px)',
    );
    expect(theme.cq('sidebar').not('xs')).to.equal('@container sidebar (min-width:600px)');
    expect(theme.cq('sidebar').not('xl')).to.equal('@container sidebar (max-width:1535.95px)');
    expect(theme.cq('sidebar').not('sm')).to.equal(
      '@container sidebar (width<600px) and (width>899.95px)',
    );
  });

  it('should sort container queries', () => {
    const theme = cssContainerQueries(createTheme());

    const css = {
      '@container (min-width:960px)': {},
      '@container (min-width:1280px)': {},
      '@container (min-width:0px)': {},
      '@container (min-width:600px)': {},
    };

    const sorted = sortContainerQueries(theme, css);

    expect(Object.keys(sorted)).to.deep.equal([
      '@container (min-width:0px)',
      '@container (min-width:600px)',
      '@container (min-width:960px)',
      '@container (min-width:1280px)',
    ]);
  });

  it('should sort container queries with other unit', () => {
    const theme = cssContainerQueries(createTheme());

    const css = {
      '@container (min-width:30.5rem)': {},
      '@container (min-width:20rem)': {},
      '@container (min-width:50.5rem)': {},
      '@container (min-width:40rem)': {},
    };

    const sorted = sortContainerQueries(theme, css);

    expect(Object.keys(sorted)).to.deep.equal([
      '@container (min-width:20rem)',
      '@container (min-width:30.5rem)',
      '@container (min-width:40rem)',
      '@container (min-width:50.5rem)',
    ]);
  });

  it('should throw an error if shorthand is invalid', () => {
    expect(() => {
      const theme = cssContainerQueries(createTheme());
      getContainerQuery(theme, 'cq0');
    }).to.throw(
      'MUI: The provided shorthand (cq0) is invalid. The format should be `cq@<breakpoint | number>` or `cq@<breakpoint | number>/<container>`.\n' +
        'For example, `cq@sm` or `cq@600` or `cq@40rem/sidebar`.',
    );
  });
});
