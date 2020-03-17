import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';

declare var yada: () => void;

const ListItemTextTest = () => {
  const FunctionComponent: React.FC<{ prop1: string; prop2: number }> = () => <div />;
  function notAnElementType(): void {
    yada();
  }
  function SimpleFunctionComponent() {
    return <div />;
  }
  return (
    <div>
      <ListItemText />
      <ListItemText disableTypography />
      <ListItemText
        primaryTypographyProps={{ align: 'center' }}
        secondaryTypographyProps={{ align: 'center' }}
      />
      <ListItemText
        primaryTypographyProps={{ align: 'center', component: 'h1' }}
        secondaryTypographyProps={{ align: 'center', component: 'p' }}
      />
      <ListItemText
        primaryTypographyProps={{ align: 'center', component: FunctionComponent }}
        secondaryTypographyProps={{ align: 'center', component: FunctionComponent }}
      />
      <ListItemText
        primaryTypographyProps={{ align: 'center', component: SimpleFunctionComponent }}
        secondaryTypographyProps={{ align: 'center', component: SimpleFunctionComponent }}
      />
      // $ExpectError
      <ListItemText
        primaryTypographyProps={{ align: 'center', component: notAnElementType }}
        secondaryTypographyProps={{ align: 'center', component: notAnElementType }}
      />
      // $ExpectError
      <ListItemText
        primaryTypographyProps={{ align: 'center', component: 'my-element' }}
        secondaryTypographyProps={{ align: 'center', component: 'my-element' }}
      />
    </div>
  );
};
