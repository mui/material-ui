import { describe, it, expect } from 'vitest';
import type { PropDescriptor } from 'react-docgen';
import createDescribeableProp from './createDescribeableProp';

function createProp(description: string): PropDescriptor {
  return { description, required: false, type: { name: 'bool' } };
}

describe('createDescribeableProp', () => {
  it('describes a documented prop', () => {
    const prop = createDescribeableProp(createProp('If `true`, the thing.'), 'thing');
    expect(prop?.annotation.description).to.equal('If `true`, the thing.');
  });

  it('throws for a prop without a description', () => {
    expect(() => createDescribeableProp(createProp(''), 'thing')).to.throw(
      'The "thing" prop is missing a description.',
    );
  });

  it('throws for a prop with only tags', () => {
    expect(() => createDescribeableProp(createProp('@deprecated'), 'thing')).to.throw(
      'The "thing" prop is missing a description.',
    );
  });

  it('ignores a prop with @ignore', () => {
    expect(createDescribeableProp(createProp('@ignore'), 'thing')).to.equal(null);
  });

  it('ignores a prop with @internal', () => {
    expect(createDescribeableProp(createProp('@internal\nUsed by the parent.'), 'thing')).to.equal(
      null,
    );
  });
});
