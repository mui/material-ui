import { render } from 'enzyme';

export interface RenderOptions {
  render: typeof render;
}

/**
 * @deprecated
 */
export default function createRender(options?: Partial<RenderOptions>): typeof render;
