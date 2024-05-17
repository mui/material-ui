// from `packages/mui-system/src/styleFunctionSx/defaultSxConfig.js`
const defaultSxConfig = {
  // borders
  border: {},
  borderTop: {},
  borderRight: {},
  borderBottom: {},
  borderLeft: {},
  borderColor: {},
  borderTopColor: {},
  borderRightColor: {},
  borderBottomColor: {},
  borderLeftColor: {},
  outline: {},
  outlineColor: {},
  borderRadius: {},
  color: {},
  bgcolor: {},
  backgroundColor: {},
  p: {},
  pt: {},
  pr: {},
  pb: {},
  pl: {},
  px: {},
  py: {},
  padding: {},
  paddingTop: {},
  paddingRight: {},
  paddingBottom: {},
  paddingLeft: {},
  paddingX: {},
  paddingY: {},
  paddingInline: {},
  paddingInlineStart: {},
  paddingInlineEnd: {},
  paddingBlock: {},
  paddingBlockStart: {},
  paddingBlockEnd: {},

  m: {},
  mt: {},
  mr: {},
  mb: {},
  ml: {},
  mx: {},
  my: {},
  margin: {},
  marginTop: {},
  marginRight: {},
  marginBottom: {},
  marginLeft: {},
  marginX: {},
  marginY: {},
  marginInline: {},
  marginInlineStart: {},
  marginInlineEnd: {},
  marginBlock: {},
  marginBlockStart: {},
  marginBlockEnd: {},

  // display
  displayPrint: {},
  display: {},
  overflow: {},
  textOverflow: {},
  visibility: {},
  whiteSpace: {},

  // flexbox
  flexBasis: {},
  flexDirection: {},
  flexWrap: {},
  justifyContent: {},
  alignItems: {},
  alignContent: {},
  order: {},
  flex: {},
  flexGrow: {},
  flexShrink: {},
  alignSelf: {},
  justifyItems: {},
  justifySelf: {},

  // grid
  gap: {},
  rowGap: {},
  columnGap: {},
  gridColumn: {},
  gridRow: {},
  gridAutoFlow: {},
  gridAutoColumns: {},
  gridAutoRows: {},
  gridTemplateColumns: {},
  gridTemplateRows: {},
  gridTemplateAreas: {},
  gridArea: {},

  // positions
  position: {},
  zIndex: {},
  top: {},
  right: {},
  bottom: {},
  left: {},

  // shadows
  boxShadow: {},

  // sizing
  width: {},
  maxWidth: {},
  minWidth: {},
  height: {},
  maxHeight: {},
  minHeight: {},
  boxSizing: {},

  // typography
  font: {},
  fontFamily: {},
  fontSize: {},
  fontStyle: {},
  fontWeight: {},
  letterSpacing: {},
  textTransform: {},
  lineHeight: {},
  textAlign: {},
  typography: {},
};
const systemProps = Object.keys(defaultSxConfig);
const components = ['Box', 'Stack', 'Typography', 'Link', 'Grid'];

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function removeSystemProps(file, api, options) {
  if (file.path?.endsWith('.json') || file.path?.endsWith('.d.ts')) {
    return file.source;
  }
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const deprecatedElements = [];
  const customReplacement = {
    Typography: {
      matcher: (key, val) =>
        key !== 'color' ||
        (val.value?.includes('.') && val.value !== 'inherit') ||
        val.value === 'divider',
    },
    Link: {
      matcher: (key) => key !== 'color',
    },
  };
  const elementReplacement = {};

  root
    .find(j.ImportDeclaration, (decl) => decl.source.value.includes('@mui'))
    .forEach((decl) => {
      decl.node.specifiers.forEach((spec) => {
        if (spec.type === 'ImportSpecifier') {
          if (components.includes(spec.imported.name)) {
            deprecatedElements.push(spec.local.name);
          }
        }
        if (spec.type === 'ImportDefaultSpecifier') {
          const name = decl.node.source.value.split('/').pop();
          if (components.includes(name)) {
            deprecatedElements.push(spec.local.name);
            if (customReplacement[name]) {
              elementReplacement[spec.local.name] = customReplacement[name];
            }
          }
        }
      });
    });

  root
    .find(j.JSXElement, {
      openingElement: {
        name: {
          name: (name) => {
            return deprecatedElements.includes(name);
          },
        },
      },
    })
    .forEach((el) => {
      const sx = j.objectExpression([]);
      const elementName = el.value?.openingElement?.name?.name;

      const attrNodes = j(el)
        .find(j.JSXAttribute)
        .filter(
          (path) =>
            path.parent.parent.node === el.node && systemProps.includes(path.node.name.name),
        );

      const sxNodes = j(el)
        .find(j.JSXAttribute)
        .filter((path) => path.parent.parent.node === el.node && path.node.name.name === 'sx');

      const sxNodesArray = sxNodes.nodes() || [];
      const existingSxValue = sxNodesArray[0]?.value?.expression;

      attrNodes.forEach((attr, index) => {
        const key = attr?.value?.name?.name;
        const literal = attr?.value?.value;
        const val = literal.type === 'JSXExpressionContainer' ? literal.expression : literal;
        const shouldPrune =
          !elementReplacement[elementName] || elementReplacement[elementName].matcher(key, val);
        if (key && val) {
          if (shouldPrune) {
            sx.properties.push(j.property('init', j.identifier(key), val));
          }
        }
        if (index + 1 !== attrNodes.length) {
          if (shouldPrune) {
            attr.prune();
          }
        } else if (sx.properties.length > 0) {
          sxNodes.forEach((node) => node.prune());
          if (!existingSxValue) {
            j(attr).replaceWith(
              j.jsxAttribute(j.jsxIdentifier('sx'), j.jsxExpressionContainer(sx)),
            );
          } else if (existingSxValue?.type === 'ObjectExpression') {
            sx.properties.push(...existingSxValue.properties);
            j(attr).replaceWith(
              j.jsxAttribute(j.jsxIdentifier('sx'), j.jsxExpressionContainer(sx)),
            );
          } else if (existingSxValue?.type === 'ArrayExpression') {
            existingSxValue.elements = [sx, ...existingSxValue.elements];
            j(attr).replaceWith(
              j.jsxAttribute(j.jsxIdentifier('sx'), j.jsxExpressionContainer(existingSxValue)),
            );
          } else {
            j(attr).replaceWith(
              j.jsxAttribute(
                j.jsxIdentifier('sx'),
                j.jsxExpressionContainer(
                  j.arrayExpression([
                    sx,
                    existingSxValue.type === 'Identifier'
                      ? j.spreadElement(
                          j.conditionalExpression(
                            j.callExpression(
                              j.memberExpression(j.identifier('Array'), j.identifier('isArray')),
                              [existingSxValue],
                            ),
                            existingSxValue,
                            j.arrayExpression([existingSxValue]),
                          ),
                        )
                      : existingSxValue,
                  ]),
                ),
              ),
            );
          }
        }
      });
    });

  return root.toSource(printOptions);
}
