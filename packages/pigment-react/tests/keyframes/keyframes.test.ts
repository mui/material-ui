import { expect } from 'chai';
import { runTransformation } from '../testUtils';

const CUSTOM_ERROR =
  'The file contents have changed. Run "test:update" command to update the file if this is expected.';

describe('Pigment CSS - keyframes', () => {
  it('basics', async () => {
    const { output, fixture } = await runTransformation('./fixtures/keyframes.input.js');

    expect(output.js, CUSTOM_ERROR).to.equal(fixture.js);
    expect(output.css, CUSTOM_ERROR).to.equal(fixture.css);
  });
});
