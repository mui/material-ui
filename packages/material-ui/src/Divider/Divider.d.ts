import { OverridableComponent, SimplifiedPropsOf } from '../OverridableComponent';

declare const Divider: OverridableComponent<{
  props: {
    absolute?: boolean;
    light?: boolean;
    orientation?: 'horizontal' | 'vertical';
    variant?: 'fullWidth' | 'inset' | 'middle';
  };
  defaultComponent: 'hr';
  classKey: DividerClassKey;
}>;

export type DividerClassKey = 'root' | 'absolute' | 'inset' | 'light' | 'middle' | 'vertical';

export type DividerProps = SimplifiedPropsOf<typeof Divider>;

export default Divider;
