import * as React from 'react';

export default function defer(Component) {
  function Defer(props) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    return <Component mounted={mounted} {...props} />;
  }

  return Defer;
}
