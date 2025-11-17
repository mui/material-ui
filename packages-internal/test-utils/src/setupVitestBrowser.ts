import * as chai from 'chai';
import chaiDom from 'chai-dom';

chai.use(chaiDom);

// Enable missing act warnings: https://github.com/reactwg/react-18/discussions/102
(globalThis as any).jest = null;
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

// Not yet supported: https://github.com/jsdom/jsdom/issues/2152
(globalThis as any).window.Touch ??= class Touch {
  instance: any;

  constructor(instance: any) {
    this.instance = instance;
  }

  get identifier() {
    return this.instance.identifier;
  }

  get pageX() {
    return this.instance.pageX;
  }

  get pageY() {
    return this.instance.pageY;
  }

  get clientX() {
    return this.instance.clientX;
  }

  get clientY() {
    return this.instance.clientY;
  }
};
