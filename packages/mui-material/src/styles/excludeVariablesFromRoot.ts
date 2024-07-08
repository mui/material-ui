/**
 * @internal These variables should not appear in the :root stylesheet when the `defaultColorScheme="dark"`
 */
const excludeVariablesFromRoot = (cssVarPrefix?: string) => [
  ...[...Array(24)].map(
    (_, index) => `--${cssVarPrefix ? `${cssVarPrefix}-` : ''}overlays-${index + 1}`,
  ),
  `--${cssVarPrefix ? `${cssVarPrefix}-` : ''}palette-AppBar-darkBg`,
  `--${cssVarPrefix ? `${cssVarPrefix}-` : ''}palette-AppBar-darkColor`,
];

export default excludeVariablesFromRoot;
