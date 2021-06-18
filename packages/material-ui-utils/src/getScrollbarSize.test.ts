import { expect } from 'chai';
import getScrollbarSize from './getScrollbarSize';

describe('getScrollbarSize', () => {
  it('should return correct value when using a custom scrollbar', function test() {
    if (/jsdom/.test(window.navigator.userAgent) || !/WebKit/.test(window.navigator.userAgent)) {
      this.skip();
    }

    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      ::-webkit-scrollbar {
        width: 5px;
      }
    `;
    document.head.appendChild(styleSheet);
    const div = document.createElement('div');
    div.style.height = '2000px';
    document.body.appendChild(div);
    expect(getScrollbarSize(document)).to.equal(5);
  });
});
