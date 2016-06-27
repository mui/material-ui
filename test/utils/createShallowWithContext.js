import {createDefaultContext} from 'src/styles/MuiThemeProvider';
import {shallow as enzymeShallow} from 'enzyme';

export default function createShallowWithContext(
  shallow = enzymeShallow,
  props = {},
  otherContext = {}
) {
  const {theme, styleManager} = createDefaultContext(props);
  const context = {theme, styleManager, ...otherContext};
  const shallowWithContext = function shallowWithContext(node) {
    return shallow(node, {context});
  };
  shallowWithContext.context = context;
  return shallowWithContext;
}
