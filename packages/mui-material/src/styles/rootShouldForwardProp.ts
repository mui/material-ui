import slotShouldForwardProp from './slotShouldForwardProp';

const rootShouldForwardProp = (prop: string) => slotShouldForwardProp(prop) && prop !== 'classes';

export default rootShouldForwardProp;
