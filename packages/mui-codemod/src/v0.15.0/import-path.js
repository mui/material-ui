const pathConversion = {
  'app-bar': 'AppBar',
  'auto-complete': 'AutoComplete',
  avatar: 'Avatar',
  badge: 'Badge',
  'flat-button': 'FlatButton',
  'raised-button': 'RaisedButton',
  'floating-action-button': 'FloatingActionButton',
  'icon-button': 'IconButton',
  'card/card': 'Card/Card',
  'card/card-actions': 'Card/CardActions',
  'card/card-header': 'Card/CardHeader',
  'card/card-media': 'Card/CardMedia',
  'card/card-title': 'Card/CardTitle',
  'card/card-text': 'Card/CardText',
  'date-picker/date-picker': 'DatePicker',
  dialog: 'Dialog',
  divider: 'Divider',
  'grid-list/grid-list': 'GridList/GridList',
  'grid-list/grid-tile': 'GridList/GridTile',
  'font-icon': 'FontIcon',
  'svg-icon': 'SvgIcon',
  'left-nav': 'Drawer',
  'lists/list': 'List/List',
  'lists/list-item': 'List/ListItem',
  'menus/menu': 'Menu',
  'menus/menu-item': 'MenuItem',
  'menus/icon-menu': 'IconMenu',
  paper: 'Paper',
  'popover/popover': 'Popover',
  'circular-progress': 'CircularProgress',
  'linear-progress': 'LinearProgress',
  'refresh-indicator': 'RefreshIndicator',
  'select-field': 'SelectField',
  slider: 'Slider',
  checkbox: 'Checkbox',
  'radio-button': 'RadioButton',
  'radio-button-group': 'RadioButton/RadioButtonGroup',
  toggle: 'Toggle',
  snackbar: 'Snackbar',
  'table/table': 'Table/Table',
  'table/table-header-column': 'Table/TableHeaderColumn',
  'table/table-row': 'Table/TableRow',
  'table/table-header': 'Table/TableHeader',
  'table/table-row-column': 'Table/TableRowColumn',
  'table/table-body': 'Table/TableBody',
  'table/table-footer': 'Table/TableFooter',
  'tabs/tab': 'Tabs/Tab',
  'tabs/tabs': 'Tabs/Tabs',
  'text-field': 'TextField',
  'time-picker/time-picker': 'TimePicker',
  'toolbar/toolbar': 'Toolbar/Toolbar',
  'toolbar/toolbar-group': 'Toolbar/ToolbarGroup',
  'toolbar/toolbar-separator': 'Toolbar/ToolbarSeparator',
  'toolbar/toolbar-title': 'Toolbar/ToolbarTitle',
  MuiThemeProvider: 'styles/MuiThemeProvider',
};

const pathBaseSource = ['material-ui/src/', 'material-ui/src/'];
const pathBasePackage = ['material-ui/lib/', 'material-ui/'];

function getPathsBase(path) {
  if (path.indexOf(pathBaseSource[0]) === 0) {
    return pathBaseSource;
  }

  if (path.indexOf(pathBasePackage[0]) === 0) {
    return pathBasePackage;
  }

  return new Error('Wrong path');
}

export default function transformer(fileInfo, api) {
  const j = api.jscodeshift;

  return j(fileInfo.source)
    .find(j.ImportDeclaration)
    .filter((path) => path.value.source.value.indexOf('material-ui/') === 0)
    .replaceWith((path) => {
      const pathOld = path.value.source.value;
      const pathsBase = getPathsBase(pathOld);
      const pathSuffix = pathOld.substring(pathsBase[0].length);

      let pathNew;

      if (pathConversion[pathSuffix]) {
        pathNew = pathsBase[1] + pathConversion[pathSuffix];
      } else {
        pathNew = pathsBase[1] + pathSuffix;
      }

      return j.importDeclaration(path.node.specifiers, j.literal(pathNew));
    })
    .toSource({
      quote: 'single',
    });
}
