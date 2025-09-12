import * as chai from 'chai';
import chaiDom from 'chai-dom';

chai.use(chaiDom);

// Enable missing act warnings: https://github.com/reactwg/react-18/discussions/102
(globalThis as any).jest = null;
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
