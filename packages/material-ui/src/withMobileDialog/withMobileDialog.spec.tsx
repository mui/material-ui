import * as React from 'react';
import withMobileDialog, { WithMobileDialog } from '@material-ui/core/withMobileDialog';

interface SimpleProps extends WithMobileDialog {
  note: string;
  title: string;
}

function Component(props: SimpleProps) {
  const { fullScreen, note, title } = props;
  return (
    <div>
      {title} is fullscreen? {fullScreen}
      <br />
      {note}
    </div>
  );
}

Component.defaultProps = {
  note: 'nothing special',
};

// Missing fullscreen, width
<Component title="Not responsive yet!" />; // $ExpectError

const ResponsiveComponent = withMobileDialog()(Component);

<ResponsiveComponent title="Not responsive yet!" />;
