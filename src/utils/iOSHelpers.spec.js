/* eslint-env mocha */
import {isIOS} from './iOSHelpers';
import {assert} from 'chai';

describe('IOS detection helper', () => {
  // skip tests on PhantomJS because __defineGetter__ method doesn't work
  if (/PhantomJS/.test(window.navigator.userAgent)) {
    return;
  }

  /* eslint-disable max-len */
  const userAgentsWithIOS = [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53',
    'Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53',
    'Mozilla/5.0 (iPod; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/3A101a Safari/419.3',
  ];
  const nonIOSuserAgents = [
    'Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)',
    'Mozilla/5.0 (Linux; Android 4.4.4; Nexus 7 Build/KTU84Q) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Safari/537.36',
    'Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+',
  ];
  /* eslint-enable max-len */

  userAgentsWithIOS.forEach((agent) => {
    it('should detect IOS', () => {
      window.navigator.__defineGetter__('userAgent', () => agent); // eslint-disable-line no-underscore-dangle,max-len
      assert.strictEqual(isIOS(), true);
    });
  });

  nonIOSuserAgents.forEach((agent) => {
    it('should NOT detect IOS', () => {
      window.navigator.__defineGetter__('userAgent', () => agent); // eslint-disable-line no-underscore-dangle,max-len
      assert.strictEqual(isIOS(), false);
    });
  });

  after(() => {
    window.navigator.__defineGetter__('userAgent', function getUserAgent() { // eslint-disable-line no-underscore-dangle,max-len
      return `${this.appCodeName}/${this.appVersion}`;
    });
  });
});
