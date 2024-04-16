import path from 'node:path';
import { runTransformation, expect } from '../testUtils';

describe('Pigment CSS - Box', () => {
  it('should transform and render sx prop', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, 'fixtures/box.input.js'),
    );

    expect(output.js).to.equal(fixture.js);
    expect(output.css).to.equal(fixture.css);
  });
});
