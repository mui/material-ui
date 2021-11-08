import * as React from 'react';

function TabsListUnstyled(props: { children?: React.ReactNode }) {
  const { children } = props;

  return (
    <>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        const { value } = child.props;
        if (value != null) {
          return child;
        }

        return React.cloneElement(child, {
          value: index,
        });
      })}
    </>
  );
}

export default TabsListUnstyled;
