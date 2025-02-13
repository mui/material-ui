export interface BaseProps {
  value?: unknown;
}

export interface StandardProps extends BaseProps {
  variant?: 'standard';
}

export interface OutlinedProps extends BaseProps {
  variant: 'outlined';
}

export interface FilledProps extends BaseProps {
  variant: 'filled';
}

export type TextFieldProps = StandardProps | OutlinedProps | FilledProps;

export default function TextField(props: TextFieldProps): React.JSX.Element;
