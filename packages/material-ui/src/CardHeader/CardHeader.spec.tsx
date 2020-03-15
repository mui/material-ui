import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

declare var yada: () => void;

const CardHeaderTest = () => {
  // eslint-disable-next-line react/jsx-filename-extension
  const CustomComponent: React.FC<{ prop1: string; prop2: number }> = () => <div />;
  function notAnElementType(): void {
    yada();
  }
  function MyComponent() {
    return <div />;
  }
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <Card>
        <CardHeader />
      </Card>
      <Card>
        <CardHeader
          titleTypographyProps={{ align: 'center' }}
          subheaderTypographyProps={{ align: 'center' }}
        />
      </Card>
      <Card>
        <CardHeader
          titleTypographyProps={{ align: 'center', component: 'h1' }}
          subheaderTypographyProps={{ align: 'center', component: 'p' }}
        />
      </Card>
      <Card>
        <CardHeader
          titleTypographyProps={{ align: 'center', component: CustomComponent }}
          subheaderTypographyProps={{ align: 'center', component: CustomComponent }}
        />
      </Card>
      <Card>
        <CardHeader
          titleTypographyProps={{ align: 'center', component: MyComponent }}
          subheaderTypographyProps={{ align: 'center', component: MyComponent }}
        />
      </Card>
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      <Card>
        // $ExpectError
        <CardHeader
          titleTypographyProps={{ align: 'center', component: notAnElementType }}
          subheaderTypographyProps={{ align: 'center', component: notAnElementType }}
        />
      </Card>
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      <Card>
        // $ExpectError
        <CardHeader
          titleTypographyProps={{ align: 'center', component: 'my-element' }}
          subheaderTypographyProps={{ align: 'center', component: 'my-element' }}
        />
      </Card>
    </div>
  );
};

// Just so the linter doesn't complain about unused component.
export default CardHeaderTest;
