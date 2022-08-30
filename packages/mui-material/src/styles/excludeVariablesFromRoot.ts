/**
 * @internal These variables should not appear in the :root stylesheet when the `defaultMode="dark"`
 */
const excludeVariablesFromRoot = (cssVar: string) =>
  !!cssVar.match(/(overlays-[0-9]|palette-AppBar-darkBg|palette-AppBar-darkColor)/);

export default excludeVariablesFromRoot;
