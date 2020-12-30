import React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils';
import styled from '../';
import Global from './Global';

describe('Global', () => {
  const render = createClientRender();

  it('should add global styles', function() {
    if (/jsdom/.test(window.navigator.userAgent)) this.skip();

    const { container } = render(
      <div>
        <Global styles={`span { color: rgb(0, 0, 255); }`} />
        <span>Blue text</span>
      </div>,
    );

    expect(container.getElementsByTagName('span')[0]).toHaveComputedStyle({
      color: 'rgb(0, 0, 255)',
    });
  });

  it('should give presedence to styled()', function() {
    if (/jsdom/.test(window.navigator.userAgent)) this.skip();

    const Span = styled('span')`
      color: rgb(255, 0, 0);
    `;

    const { container } = render(
      <div>
        <Global styles={`span { color: rgb(0, 0, 255); }`} />
        <Span>Red text</Span>
      </div>,
    );

    expect(container.getElementsByTagName('span')[0]).toHaveComputedStyle({
      color: 'rgb(255, 0, 0)',
    });
  });
});
