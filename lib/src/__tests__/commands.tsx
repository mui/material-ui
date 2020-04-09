import { ReactWrapper } from 'enzyme';

export const clickOKButton = (component: ReactWrapper<any>) => {
  component
    .find('ForwardRef(DialogActions) WithStyles(ForwardRef(Button))')
    .at(1)
    .simulate('click');
};
