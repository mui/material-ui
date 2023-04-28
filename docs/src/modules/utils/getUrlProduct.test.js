import { expect } from 'chai';
import getUrlProduct from './getUrlProduct';

describe('getUrlProduct', () => {
  it('get material-ui', () => {
    expect(getUrlProduct('/material-ui/react-button/')).to.equal('material-ui');
    expect(getUrlProduct('/zh/material-ui/react-button/')).to.equal('material-ui');
  });

  it('get base', () => {
    expect(getUrlProduct('/base/react-button/')).to.equal('base');
    expect(getUrlProduct('/zh/base/react-button/')).to.equal('base');
  });

  it('get joy-ui', () => {
    expect(getUrlProduct('/joy-ui/react-button/')).to.equal('joy-ui');
    expect(getUrlProduct('/zh/joy-ui/react-button/')).to.equal('joy-ui');
  });

  it('get system', () => {
    expect(getUrlProduct('/system/')).to.equal('system');
    expect(getUrlProduct('/zh/system/getting-started/overview/')).to.equal('system');
  });

  it('get data-grid', () => {
    expect(getUrlProduct('/x/react-data-grid/components')).to.equal('data-grid');
    expect(getUrlProduct('/zh/x/react-data-grid/components')).to.equal('data-grid');
  });

  it('get date-picker', () => {
    expect(getUrlProduct('/x/react-date-picker/components')).to.equal('date-picker');
    expect(getUrlProduct('/zh/x/react-date-picker/components')).to.equal('date-picker');
  });
});
