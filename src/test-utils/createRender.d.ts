import { render } from 'enzyme';

export interface RenderOptions {
  render: typeof render;
}

export default function createRender(
  options?: Partial<RenderOptions>
): typeof render & { cleanUp: Function };
