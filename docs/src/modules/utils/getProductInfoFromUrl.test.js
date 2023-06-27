import { expect } from 'chai';
import getProductInfoFromUrl from './getProductInfoFromUrl';

describe('getProductInfoFromUrl', () => {
  it('get material-ui', () => {
    expect(getProductInfoFromUrl('/material-ui/react-button/').productId).to.equal('material-ui');
    expect(getProductInfoFromUrl('/zh/material-ui/react-button/').productId).to.equal(
      'material-ui',
    );
  });

  it('get base-ui', () => {
    expect(getProductInfoFromUrl('/base-ui/react-button/').productId).to.equal('base-ui');
    expect(getProductInfoFromUrl('/zh/base-ui/react-button/').productId).to.equal('base-ui');
  });

  it('get joy-ui', () => {
    expect(getProductInfoFromUrl('/joy-ui/react-button/').productId).to.equal('joy-ui');
    expect(getProductInfoFromUrl('/zh/joy-ui/react-button/').productId).to.equal('joy-ui');
  });

  it('get system', () => {
    expect(getProductInfoFromUrl('/system/').productId).to.equal('system');
    expect(getProductInfoFromUrl('/zh/system/getting-started/').productId).to.equal('system');
  });

  it('get data-grid', () => {
    expect(getProductInfoFromUrl('/x/react-data-grid/components').productId).to.equal(
      'x-data-grid',
    );
    expect(getProductInfoFromUrl('/zh/x/react-data-grid/components').productId).to.equal(
      'x-data-grid',
    );
  });

  it('get date-picker', () => {
    expect(getProductInfoFromUrl('/x/react-date-picker/components').productId).to.equal(
      'x-date-picker',
    );
    expect(getProductInfoFromUrl('/zh/x/react-date-picker/components').productId).to.equal(
      'x-date-picker',
    );
  });
});
