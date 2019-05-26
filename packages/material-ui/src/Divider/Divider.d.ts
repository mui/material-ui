import { OverridableComponent, SimplifiedPropsOf } from '../OverridableComponent';

declare const Divider: OverridableComponent<{
  props: {
    absolute?: boolean;
    light?: boolean;
    variant?: 'fullWidth' | 'inset' | 'middle';
  };
  defaultComponent: 'hr';
  classKey: DividerClassKey;
}>;

export type DividerClassKey = 'root' | 'absolute' | 'inset' | 'light' | 'middle';

export type DividerProps = SimplifiedPropsOf<typeof Divider>;

export default Divider;
