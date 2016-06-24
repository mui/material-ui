import {createDefaultContext} from 'src/styles/MuiThemeProvider';
import {shallow as enzymeShallow} from 'enzyme';

export default function createShallowWithContext(shallow = enzymeShallow, props = {}) {
  const {theme, styleManager} = createDefaultContext(props);
  return function shallowWithContext(node) {
    return shallow(node, {context: {theme, styleManager}});
  };
}
