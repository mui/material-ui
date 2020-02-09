import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface DividerTypeMap<P = {}, D extends React.ElementType = 'hr'> {
  props: P & {
    absolute?: boolean;
    flexItem?: boolean;
    light?: boolean;
    orientation?: 'horizontal' | 'vertical';
    variant?: 'fullWidth' | 'inset' | 'middle';
  };
  defaultComponent: D;
  classKey: DividerClassKey;
}

declare const Divider: OverridableComponent<DividerTypeMap>;

export type DividerClassKey = 'root' | 'absolute' | 'inset' | 'light' | 'middle' | 'vertical';

export type DividerProps<
  D extends React.ElementType = DividerTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<DividerTypeMap<P, D>, D>;

export default Divider;
