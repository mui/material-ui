import { User } from './models';

export interface ButtonProps {
  onClick?: () => void;
  label: string;
  user?: User;
}

export declare function Button(props: ButtonProps): JSX.Element;
