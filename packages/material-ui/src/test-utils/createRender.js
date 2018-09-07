import { render as enzymeRender } from 'enzyme';

// Generate a render to string function.
export default function createRender(options1 = {}) {
  const { render = enzymeRender, ...other1 } = options1;

  const renderWithContext = function renderWithContext(node, options2 = {}) {
    return render(node, {
      ...other1,
      ...options2,
    });
  };

  return renderWithContext;
}
