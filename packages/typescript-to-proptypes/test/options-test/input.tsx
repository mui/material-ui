type DeepOptions = {
  PropB: string;
};

type Options = {
  /**
   * This jsdoc will be ignored
   */
  PropA: string;
  TestProps: DeepOptions;
};

export default function Foo(props: Options) {
  const { PropA, TestProps } = props;
  return <div></div>;
}
