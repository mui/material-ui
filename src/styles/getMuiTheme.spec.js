/* eslint-env mocha */
import {expect} from 'chai';
import getMuiTheme from './getMuiTheme';

describe('./styles/getMuiTheme', () => {
  // Test backward compatibility
  it('should work when we use two parameters', () => {
    const muiTheme = getMuiTheme({
      palette: {
        accent1Color: 'Colors.deepOrange500',
      },
    }, {
      userAgent: 'all',
      appBar: {
        height: 56,
      },
    });

    expect(muiTheme.userAgent).to.equal('all');
    expect(muiTheme.palette.accent1Color).to.equal('Colors.deepOrange500');
    expect(muiTheme.appBar.height).to.equal(56);
  });

  it('should work when we use one parameter', () => {
    const muiTheme = getMuiTheme({
      palette: {
        accent1Color: 'Colors.deepOrange500',
      },
      userAgent: 'all',
      appBar: {
        height: 56,
      },
    });

    expect(muiTheme.userAgent).to.equal('all');
    expect(muiTheme.palette.accent1Color).to.equal('Colors.deepOrange500');
    expect(muiTheme.appBar.height).to.equal(56);
  });

  it('should work when we mutate the muiTheme', () => {
    const muiTheme1 = getMuiTheme({
      palette: {
        accent1Color: 'Colors.deepOrange500',
      },
      userAgent: 'all',
    });

    const muiTheme2 = getMuiTheme(muiTheme1, {
      palette: {
        accent1Color: 'Colors.deepOrange600',
      },
      appBar: {
        height: 56,
      },
    });

    expect(muiTheme2.userAgent).to.equal('all');
    expect(muiTheme2.palette.accent1Color).to.equal('Colors.deepOrange600');
    expect(muiTheme2.appBar.height).to.equal(56);
  });

  describe('prepareStyles', () => {
    const MSIE9_USER_AGENT = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 7.1; Trident/5.0)';
    const MSIE10_USER_AGENT = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)';

    describe('prefixer', () => {
      it('should prefix for all when userAgent is all', () => {
        const muiTheme = getMuiTheme({}, {
          userAgent: 'all',
        });

        const stylePrepared = muiTheme.prepareStyles({
          transform: 'rotate(90)',
        });

        expect(stylePrepared).to.deep.equal({
          transform: 'rotate(90)',
          muiPrepared: true,
          WebkitTransform: 'rotate(90)',
          msTransform: 'rotate(90)',
        });
      });

      it('should prefix for the userAgent when we provid a valid one', () => {
        const muiTheme = getMuiTheme({}, {
          userAgent: MSIE9_USER_AGENT,
        });

        const stylePrepared = muiTheme.prepareStyles({
          transform: 'rotate(90)',
        });

        expect(stylePrepared).to.deep.equal({
          muiPrepared: true,
          msTransform: 'rotate(90)',
        });
      });

      it('should not prefix when userAgent is false', () => {
        const muiTheme = getMuiTheme({}, {
          userAgent: false,
        });

        const stylePrepared = muiTheme.prepareStyles({
          transform: 'rotate(90)',
        });

        expect(stylePrepared).to.deep.equal({
          transform: 'rotate(90)',
          muiPrepared: true,
        });
      });

      it('should not delete ‘display’ property on IE10', () => {
        const muiTheme = getMuiTheme({}, {
          userAgent: MSIE10_USER_AGENT,
        });

        const stylePrepared = muiTheme.prepareStyles({
          display: 'inline-block',
        });

        expect(stylePrepared).to.deep.equal({
          display: 'inline-block',
          muiPrepared: true,
        });
      });
    });
  });
});
