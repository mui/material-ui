import { StyledComponentProps } from '@mui/styles/withStyles';
import { DistributiveOmit } from '@mui/types';

/**
 * All standard components exposed by `material-ui` are `StyledComponents` with
 * certain `classes`, on which one can also set a top-level `className` and inline
 * `style`.
 * @deprecated will be removed in v5 for internal usage only
 */
type StandardProps<C, ClassKey extends string, Removals extends keyof C = never> = DistributiveOmit<
  C,
  'classes' | Removals
> &
  StyledComponentProps<ClassKey> & {
    className?: string;
    ref?: C extends { ref?: infer RefType } ? RefType : React.Ref<unknown>;
    style?: React.CSSProperties;
  };

export default StandardProps;
