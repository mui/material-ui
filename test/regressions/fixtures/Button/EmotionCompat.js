import * as React from 'react';
import { ClassNames } from '@emotion/react';
import Button from '@mui/material/Button';

export default function EmotionCompat() {
  return (
    <ClassNames>
      {({ css }) => (
        <React.Fragment>
          <Button color="primary" classes={{ root: css({ color: 'pink' }) }}>
            This text should be pink
          </Button>
          <Button
            color="primary"
            className={css({ color: 'red' })}
            classes={{ root: css({ color: 'pink' }) }}
          >
            This text should be red
          </Button>
          <Button color="primary" classes={{ text: css({ color: 'pink' }) }}>
            This text should be pink
          </Button>
        </React.Fragment>
      )}
    </ClassNames>
  );
}
