import getMuiTheme from 'styles/getMuiTheme';

const MSIE9_USER_AGENT = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 7.1; Trident/5.0)';

describe('prepareStyles', () => {
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
        MozTransform: 'rotate(90)',
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
  });
});
