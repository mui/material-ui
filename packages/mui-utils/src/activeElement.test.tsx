import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { expect } from 'chai';
import { act, createRenderer } from 'test/utils';
import { activeElement } from '@mui/utils';

describe('activeElement', () => {
  const { render } = createRenderer();

  function createNodeInShadowDom(parent: HTMLElement, element?: React.ReactNode, shadowHostId: string = 'shadow-host'): HTMLSpanElement {
    const shadowHost = document.createElement('div');
    shadowHost.setAttribute('id', shadowHostId);
    const shadowContainer = shadowHost.attachShadow({ mode: 'open' });
    const shadowRoot = document.createElement('span');
    shadowContainer.appendChild(shadowRoot);
    parent.appendChild(shadowHost);
    if (element) {
      act(() => {
        createRoot(shadowRoot).render(element);
      });
    }

    return shadowRoot;
  }

  afterEach(() => {
    document.body.innerHTML = '';
  });
  it('should find activeElement when no Shadow DOM exists', () => {
    const { getByTestId } = render(<input data-testid="auto-focus" autoFocus />);

    expect(activeElement()).to.equal(getByTestId('auto-focus'));
  });

  it('should find nested activeElement when no Shadow DOM exists', () => {
    const { getByTestId } = render(
      <div>
        <span>
          <div>
            <input id="input1" />
            <span>
              <input data-testid="auto-focus" autoFocus />
            </span>
          </div>
          <input id="input3" />
        </span>
      </div>
    );

    expect(activeElement()).to.equal(getByTestId('auto-focus'));
  });

  it('should find activeElement inside Shadow DOM', () => {
    createNodeInShadowDom(document.body, <input id="auto-focus" autoFocus />);
    expect(activeElement()).to.equal(
      document.getElementById('shadow-host')!.shadowRoot!.getElementById('auto-focus'),
    );
  });

  it('should find nested activeElement inside Shadow DOM', () => {
    createNodeInShadowDom(
      document.body,
      <div>
        <span>
          <div>
            <input id="input1" />
            <span>
              <input id="auto-focus" autoFocus />
            </span>
          </div>
          <input id="input3" />
        </span>
      </div>
    );
    expect(activeElement()).to.equal(
      document.getElementById('shadow-host')!.shadowRoot!.getElementById('auto-focus'),
    );
  });

  it('should find activeElement inside nested Shadow DOMs', () => {
    // test tree stucture
    // <div id="shadow-host1">
    //   #shadow-root
    //     <span>
    //       <input id="input1"/>
    //       <div id="shadow-host2">
    //         #shadow-root
    //           <span>
    //             <input id="input2"/>
    //             <div id="shadow-host3">
    //               #shadow-root
    //                 <span>
    //                   <input id="input3"/>
    //                 </span>
    //             </div>
    //             <div id="shadow-host4">
    //               #shadow-root
    //                 <span>
    //                   <input id="input4"/>
    //                   <div id="shadow-host5">
    //                     #shadow-root
    //                       <span>
    //                         <input id="auto-focus"/>
    //                       </span>
    //                     <input id="input"/>
    //                   </div>
    //                 </span>
    //             </div>
    //           </span>
    //       </div>
    //     </span>
    // </div>
    const host1 = createNodeInShadowDom(document.body, <input id="input1" />, 'shadow-host1');
    const host2 = createNodeInShadowDom(host1, <input id="input2" />, 'shadow-host2');
    createNodeInShadowDom(host2, <input id="input3" />, 'shadow-host3');
    const host4 = createNodeInShadowDom(host2, <input id="input4" />, 'shadow-host4');
    const host5 = createNodeInShadowDom(host4, <input id="auto-focus" autoFocus />, 'shadow-host5');
    const input6 = document.createElement('input');
    input6.setAttribute('id', 'input6');
    host5.appendChild(input6);
    expect(activeElement()).to.equal(
      document
        .getElementById('shadow-host1')!.shadowRoot!
        .getElementById('shadow-host2')!.shadowRoot!
        .getElementById('shadow-host4')!.shadowRoot!
        .getElementById('shadow-host5')!.shadowRoot!
        .getElementById('auto-focus')
    );
  });
});
