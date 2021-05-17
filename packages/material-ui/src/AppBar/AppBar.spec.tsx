import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> = () => <div />;

const AppBarTest = () => (
  <div>
    <AppBar />
    <AppBar elevation={4} />

    <AppBar component="a" href="test" />
    <AppBar component={CustomComponent} stringProp="test" numberProp={0} />
    {/* @ts-expect-error missing stringProp and numberProp */}
    <AppBar component={CustomComponent} />
  </div>
);
