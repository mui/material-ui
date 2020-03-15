import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';

declare var yada: () => void;

const ListItemTextTest = () => {
  const CustomComponent: React.FC<{ prop1: string; prop2: number }> = () => <div />;
  function notAnElementType(): void {
    yada();
  }
  function MyComponent() {
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
        primaryTypographyProps={{ align: 'center', component: CustomComponent }}
        secondaryTypographyProps={{ align: 'center', component: CustomComponent }}
      />
      <ListItemText
        primaryTypographyProps={{ align: 'center', component: MyComponent }}
        secondaryTypographyProps={{ align: 'center', component: MyComponent }}
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

// Just so the linter doesn't complain about unused component.
export default ListItemTextTest;
