import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { expect } from 'chai';
import { createClientRender } from 'test/utils/createClientRender';
import TabContext, { useTabContext } from './TabContext';

describe('<TabContext />', () => {
  const render = createClientRender();

  it('is null by default', () => {
    let value;
    function Tabs() {
      value = useTabContext();
      return null;
    }

    render(<Tabs />);

    expect(value).to.equal(null);
  });

  it('provides tab and panel prefixes for IDREFs and the active value', () => {
    function Tabs() {
      const { panelPrefix, tabPrefix, value } = useTabContext();
      return (
        <React.Fragment>
          <div data-testid="active-value" data-value={value} />
          <div role="tab" id={tabPrefix} />
          <div role="tabpanel" id={panelPrefix} />
        </React.Fragment>
      );
    }

    const { getByRole, getByTestId } = render(
      <TabContext value={0}>
        <Tabs />
      </TabContext>,
    );

    const tabId = getByRole('tab').id;
    const tabpanelId = getByRole('tabpanel').id;
    expect(tabId.length).to.at.least(1);
    expect(tabpanelId.length).to.at.least(1);
    expect(tabId).not.to.equal(tabpanelId);
    expect(getByTestId('active-value')).to.have.attribute('data-value', '0');
  });

  it('provides undefined tab and panel prefixes and the active value when ssr', () => {
    function Tabs() {
      const { panelPrefix, tabPrefix, value } = useTabContext();
      return (
        <React.Fragment>
          <div data-testid="active-value" data-value={value} />
          <div role="tab" id={tabPrefix} />
          <div role="tabpanel" id={panelPrefix} />
        </React.Fragment>
      );
    }

    const markup = ReactDOMServer.renderToStaticMarkup(
      <TabContext value={0}>
        <Tabs />
      </TabContext>,
    );

    expect(markup).to.equal(
      '<div data-testid="active-value" data-value="0"></div><div role="tab"></div><div role="tabpanel"></div>',
    );
  });

  it('hydrates tab and tabpanel prefixes', () => {
    function Tabs() {
      const { panelPrefix, tabPrefix } = useTabContext();
      return (
        <React.Fragment>
          <div role="tab" id={tabPrefix} />
          <div role="tabpanel" id={panelPrefix} />
        </React.Fragment>
      );
    }
    const reactElement = (
      <TabContext value={0}>
        <Tabs />
      </TabContext>
    );
    const markup = ReactDOMServer.renderToString(reactElement);
    const container = document.createElement('div');
    container.innerHTML = markup;

    const { getByRole } = render(reactElement, { container, hydrate: true });

    const tabId = getByRole('tab').id;
    const tabpanelId = getByRole('tabpanel').id;
    expect(tabId.length).to.at.least(1);
    expect(tabpanelId.length).to.at.least(1);
    expect(tabId).not.to.equal(tabpanelId);
  });
});
