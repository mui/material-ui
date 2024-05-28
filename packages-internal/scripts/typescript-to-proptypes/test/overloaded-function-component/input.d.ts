import * as React from 'react';

interface ButtonProps {
  variant?: string;
}

interface Component<C extends React.ElementType = 'div'> {
  (props: ButtonProps): React.JSX.Element;
  (props: { component: C } & ButtonProps): React.JSX.Element;
}

// a component using overloading and intersection of function signature
declare const ButtonBase: Component & ((props: { href: string } & ButtonProps) => React.JSX.Element);
