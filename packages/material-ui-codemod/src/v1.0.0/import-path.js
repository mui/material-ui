const entryModuleToFlatten = [
  'BottomNavigation',
  'BottomNavigationAction',
  'Card',
  'CardActions',
  'CardContent',
  'CardHeader',
  'CardMedia',
  'CircularProgress',
  'Collapse',
  'Dialog',
  'DialogActions',
  'DialogContent',
  'DialogContentText',
  'DialogTitle',
  'ExpansionPanel',
  'ExpansionPanelActions',
  'ExpansionPanelDetails',
  'ExpansionPanelSummary',
  'Fade',
  'Form',
  'FormControl',
  'FormControlLabel',
  'FormGroup',
  'FormHelperText',
  'FormLabel',
  'GridList',
  'GridListTile',
  'Grow',
  'Input',
  'InputLabel',
  'LinearProgress',
  'List',
  'ListItem',
  'ListItemAvatar',
  'ListItemIcon',
  'ListItemSecondaryAction',
  'ListItemText',
  'Menu',
  'MenuItem',
  'Progress',
  'Radio',
  'RadioGroup',
  'Slide',
  'Step',
  'StepButton',
  'StepContent',
  'Stepper',
  'Stepper',
  'Tab',
  'Table',
  'TableBody',
  'TableCell',
  'TableFooter',
  'TablePagination',
  'TableRow',
  'Tabs',
  'withMobileDialog',
];

export default function transformer(fileInfo, api, options) {
  const j = api.jscodeshift;
  let hasModifications = false;
  const printOptions = options.printOptions || {
    quote: 'single',
    trailingComma: true,
  };

  const importModule = options.importModule || 'material-ui';
  const targetModule = options.targetModule || 'material-ui';

  const root = j(fileInfo.source);
  const importRegExp = new RegExp(`^${importModule}/(.+)$`);

  root.find(j.ImportDeclaration).forEach(path => {
    const importPath = path.value.source.value;
    let entryModule = importPath.match(importRegExp);

    // Remove non-Material-UI imports
    if (!entryModule) {
      return;
    }
    entryModule = entryModule[1].split('/');
    entryModule = entryModule[entryModule.length - 1];

    // No need to flatten
    if (!entryModuleToFlatten.includes(entryModule)) {
      return;
    }

    hasModifications = true;
    // console.log('entryModule', entryModule);

    path.node.specifiers.forEach(specifier => {
      const localName = specifier.local.name;
      const importedName = specifier.imported ? specifier.imported.name : null;

      if (!importedName) {
        const importStatement = j.importDeclaration(
          [j.importDefaultSpecifier(j.identifier(localName))],
          j.literal(`${targetModule}/${entryModule}`),
        );

        j(path).insertBefore(importStatement);
      } else {
        const importStatement = j.importDeclaration(
          [j.importDefaultSpecifier(j.identifier(localName))],
          j.literal(`${targetModule}/${importedName}`),
        );

        j(path).insertBefore(importStatement);
      }
    });

    path.prune();
  });

  return hasModifications ? root.toSource(printOptions) : null;
}
