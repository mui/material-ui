import slotShouldForwardProp from './slotShouldForwardProp';

const rootShouldForwardProp = (prop) => slotShouldForwardProp(prop) && prop !== 'classes';

export default rootShouldForwardProp;