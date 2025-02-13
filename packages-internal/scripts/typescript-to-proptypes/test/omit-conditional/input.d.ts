type TextFieldProps<A extends boolean> = A extends true ? { testProp: string } : { testProp: boolean }

type Props<A extends boolean = false> = Omit<TextFieldProps<A>, 'b'>

export function Foo<A extends boolean = false>(props: Props<A>): React.JSX.Element;
