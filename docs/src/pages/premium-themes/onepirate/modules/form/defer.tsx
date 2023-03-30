import * as React from 'react';

export default function defer<P>(Component: React.ComponentType<P>) {
  function Defer(props: P) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    return <Component mounted={mounted} {...props} />;
  }

  return Defer;
}
