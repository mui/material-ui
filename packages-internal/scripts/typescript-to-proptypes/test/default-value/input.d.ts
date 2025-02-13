interface Props {
  /**
   * The type of the button relevant to its `<form>`.
   * @default 'button'
   */
  type?: 'button' | 'reset' | 'submit';
}

export function Foo(props: Props): React.JSX.Element;
