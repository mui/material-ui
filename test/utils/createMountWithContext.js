import canUseDom from 'dom-helpers/util/inDOM';
import {mount as enzymeMount} from 'enzyme';
import {createDefaultContext} from 'src/styles/MuiThemeProvider';

export default function createMountWithContext(mount = enzymeMount, props = {}) {
  const attachTo = window.document.createElement('div');

  attachTo.className = 'app';
  window.document.body.insertBefore(attachTo, window.document.body.firstChild);

  const {theme, styleManager} = createDefaultContext(props);
  const context = {theme, styleManager};

  const mountWithContext = function mountWithContext(node) {
    return mount(node, {context, attachTo});
  };

  mountWithContext.context = context;

  mountWithContext.cleanUp = () => {
    attachTo.parentNode.removeChild(attachTo);
  };

  return mountWithContext;
}
