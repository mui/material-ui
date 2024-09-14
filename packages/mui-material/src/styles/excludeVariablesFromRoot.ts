/**
 * @internal These variables should not appear in the :root stylesheet when the `defaultColorScheme="dark"`
 */
const excludeVariablesFromRoot = (cssVarPrefix?: string) => [
  ...[...Array(25)].map(
    (_, index) => `--${cssVarPrefix ? `${cssVarPrefix}-` : ''}overlays-${index}`,
  ),
  `--${cssVarPrefix ? `${cssVarPrefix}-` : ''}palette-AppBar-darkBg`,
  `--${cssVarPrefix ? `${cssVarPrefix}-` : ''}palette-AppBar-darkColor`,
];

export default excludeVariablesFromRoot;
