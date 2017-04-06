/* eslint-disable flowtype/require-valid-file-annotation */
import Switch from './Switch';
import withSwitchLabel from '../internal/withSwitchLabel';

export default from './Switch';
export Switch from './Switch';

const LabelSwitch = withSwitchLabel(Switch);
export { LabelSwitch };
