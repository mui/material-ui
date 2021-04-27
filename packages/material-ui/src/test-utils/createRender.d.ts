import { render } from 'enzyme';

export interface RenderOptions {
  render: typeof render;
}

/**
 * @deprecated
 * @param options
 */
export default function createRender(options?: Partial<RenderOptions>): typeof render;
