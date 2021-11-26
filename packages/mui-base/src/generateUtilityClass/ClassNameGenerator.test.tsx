import * as React from 'react';
import clsx from 'clsx';
import { expect } from 'chai';
import { createRenderer, screen } from 'test/utils';
import { ClassNameProvider, useClassNameGenerator, muiStateClasses } from './ClassNameGenerator';

describe('ClassNameGenerator', () => {
  const { render } = createRenderer();
  it('use `name` as default prefix if no Provider', () => {
    const MuiComponent = () => {
      const generateClassName = useClassNameGenerator({ name: 'MuiComponent' });
      return <div className={generateClassName('root')} />;
    };
    const { container } = render(<MuiComponent />);
    expect(container.firstChild).to.have.class('MuiComponent-root');
  });

  it('able to custom className via single Provider', () => {
    const MuiComponent = () => {
      const generateClassName = useClassNameGenerator({ name: 'MuiComponent' });
      return <div className={generateClassName('root')} />;
    };
    const generateClassName = (componentName: string) =>
      componentName.replace('MuiComponent', 'Foo');
    const { container } = render(
      <ClassNameProvider generateClassName={generateClassName}>
        <MuiComponent />
      </ClassNameProvider>,
    );
    expect(container.firstChild).not.to.have.class('MuiComponent-root');
    expect(container.firstChild).to.have.class('Foo-root');
  });

  it('does not change mui state classes', () => {
    const MuiComponent = () => {
      const generateClassName = useClassNameGenerator({ name: 'MuiComponent' });
      const muiStateClassNames = Object.keys(muiStateClasses).map((key) => generateClassName(key));
      return <div className={clsx(generateClassName('root'), ...muiStateClassNames)} />;
    };
    const generateClassName = (componentName: string) =>
      componentName.replace('MuiComponent', 'Foo');
    const { container } = render(
      <ClassNameProvider generateClassName={generateClassName}>
        <MuiComponent />
      </ClassNameProvider>,
    );
    expect(container.firstChild).to.have.class('Mui-active');
    expect(container.firstChild).to.have.class('Mui-checked');
    expect(container.firstChild).to.have.class('Mui-completed');
    expect(container.firstChild).to.have.class('Mui-disabled');
    expect(container.firstChild).to.have.class('Mui-error');
    expect(container.firstChild).to.have.class('Mui-expanded');
    expect(container.firstChild).to.have.class('Mui-focused');
    expect(container.firstChild).to.have.class('Mui-focusVisible');
    expect(container.firstChild).to.have.class('Mui-required');
    expect(container.firstChild).to.have.class('Mui-selected');
  });

  it('able to custom className via multiple Providers', () => {
    const MuiComponent = (props: any) => {
      const generateClassName = useClassNameGenerator({ name: 'MuiComponent' });
      return <div {...props} className={generateClassName('root')} />;
    };
    const generateFooClassName = (componentName: string) =>
      componentName.replace('MuiComponent', 'Foo');
    const generateBarClassName = (componentName: string) =>
      componentName.replace('MuiComponent', 'Bar');
    render(
      <div>
        <ClassNameProvider generateClassName={generateFooClassName}>
          <MuiComponent data-testid="foo" />
        </ClassNameProvider>
        <ClassNameProvider generateClassName={generateBarClassName}>
          <MuiComponent data-testid="bar" />
        </ClassNameProvider>
      </div>,
    );
    expect(screen.getByTestId('foo')).to.have.class('Foo-root');
    expect(screen.getByTestId('foo')).not.to.have.class('Bar-root');
    expect(screen.getByTestId('foo')).not.to.have.class('MuiComponent-root');

    expect(screen.getByTestId('bar')).to.have.class('Bar-root');
    expect(screen.getByTestId('bar')).not.to.have.class('Foo-root');
    expect(screen.getByTestId('bar')).not.to.have.class('MuiComponent-root');
  });
});
