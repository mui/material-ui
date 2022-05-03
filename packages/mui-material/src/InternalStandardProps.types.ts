import { DistributiveOmit } from '@mui/types';
import { StyledComponentProps } from './styles/StyledComponentProps.types';

/**
 * @internal
 * ONLY USE FROM WITHIN mui/material-ui
 *
 * Internal helper type for conform (describeConformance) components
 * However, we don't declare classes on this type.
 * It is recommended to declare them manually with an interface so that each class can have a separate JSDoc.
 */
export type InternalStandardProps<C, Removals extends keyof C = never> = DistributiveOmit<
  C,
  'classes' | Removals
> &
  // each component declares it's classes in a separate interface for proper JSDoc
  StyledComponentProps<never> & {
    ref?: C extends { ref?: infer RefType } ? RefType : React.Ref<unknown>;
    // TODO: Remove implicit props. Up to each component.
    className?: string;
    style?: React.CSSProperties;
  };
