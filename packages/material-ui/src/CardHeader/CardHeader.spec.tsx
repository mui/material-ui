import React from 'react';
import CardHeader from '@material-ui/core/CardHeader';

declare var yada: () => void;

const CardHeaderTest = () => {
  const FunctionComponent: React.FC<{ prop1: string; prop2: number }> = () => <div />;
  function notAnElementType(): void {
    yada();
  }
  function SimpleFunctionComponent() {
    return <div />;
  }
  return (
    <div>
      <CardHeader />
      <CardHeader
        titleTypographyProps={{ align: 'center' }}
        subheaderTypographyProps={{ align: 'center' }}
      />
      <CardHeader
        titleTypographyProps={{ align: 'center', component: 'h1' }}
        subheaderTypographyProps={{ align: 'center', component: 'p' }}
      />
      <CardHeader
        titleTypographyProps={{ align: 'center', component: FunctionComponent }}
        subheaderTypographyProps={{ align: 'center', component: FunctionComponent }}
      />
      <CardHeader
        titleTypographyProps={{ align: 'center', component: SimpleFunctionComponent }}
        subheaderTypographyProps={{ align: 'center', component: SimpleFunctionComponent }}
      />
      // $ExpectError
      <CardHeader
        titleTypographyProps={{ align: 'center', component: notAnElementType }}
        subheaderTypographyProps={{ align: 'center', component: notAnElementType }}
      />
      // $ExpectError
      <CardHeader
        titleTypographyProps={{ align: 'center', component: 'my-element' }}
        subheaderTypographyProps={{ align: 'center', component: 'my-element' }}
      />
    </div>
  );
};
