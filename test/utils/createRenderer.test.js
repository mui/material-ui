import { expect } from 'chai';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createRenderer } from './createRenderer';

describe('createRenderer', () => {
  const { render } = createRenderer();

  it('allows querying descriptions', () => {
    function Component() {
      return (
        <React.Fragment>
          <div id="target" aria-describedby="r:1 r:2 r:3">
            I have a description.
          </div>
          {ReactDOM.createPortal(<div id="r:1">Description 1</div>, document.body)}
          {/* The ID format is important here. It would fail `querySelectorAll('#r:2')` and ensures we use `getElementById` */}
          <div id="r:2">Description 2</div>
          <div id="r:3">Description 3</div>
        </React.Fragment>
      );
    }
    const { getAllDescriptionsOf } = render(<Component />);

    const descriptions = getAllDescriptionsOf(document.getElementById('target'));
    expect(descriptions).to.have.length(3);
    expect(descriptions[0]).to.have.property('id', 'r:1');
    expect(descriptions[1]).to.have.property('id', 'r:2');
    expect(descriptions[2]).to.have.property('id', 'r:3');
  });
});
