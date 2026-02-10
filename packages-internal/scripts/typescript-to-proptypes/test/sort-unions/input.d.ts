type Breakpoint = 'xs' | 'md' | 'xl';

export interface Props {
  /**
   * will be sorted alphanumeric
   */
  color?: 'inherit' | 'default' | 'primary' | 'secondary';
  /**
   * will be sorted by viewport size descending
   */
  only?: Breakpoint | Breakpoint[];
}

export default function Hidden(props: Props): React.JSX.Element;
