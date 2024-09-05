type Type = 'one' | 'two' | 'three'

interface ParentProps<T extends Type> {
  optionalType?: T;
  requiredType: T
}

interface ChildProps extends ParentProps<'one' | 'two'> {}

export function Foo(props: ChildProps): React.JSX.Element;
