import * as React from 'react';
import styled, { StyledProps } from '@material-ui/styles/styled';

{
  // styled
  const StyledButton = styled('button')({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  });
  const renderedStyledButton = <StyledButton classes={{ root: 'additonal-root-class' }} />;
  // $ExpectError
  const nonExistingClassKey = <StyledButton classes={{ notRoot: 'additonal-root-class' }} />;

  interface MyTheme {
    fontFamily: string;
  }

  interface MyComponentProps extends StyledProps {
    defaulted: string;
  }
  class MyComponent extends React.Component<MyComponentProps> {
    static defaultProps = {
      defaulted: 'Hello, World!',
    };
    render() {
      const { className, defaulted } = this.props;
      return <div className={className}>Greeted?: {defaulted.startsWith('Hello')}</div>;
    }
  }
  const StyledMyComponent = styled(MyComponent)((theme: MyTheme) => ({
    fontFamily: theme.fontFamily,
  }));
  const renderedMyComponent = (
    <>
      <MyComponent className="test" />
      <StyledMyComponent />
    </>
  );

  // will not catch type mismatch
  interface ClassNumberProps {
    className: number;
  }
  styled(({ className }: ClassNumberProps) => <div>{className.toFixed(2)}</div>)({});
}
