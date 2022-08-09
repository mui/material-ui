import * as React from 'react';
import { ClassNames } from '@emotion/react';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';

export default function EmotionCompat() {
  return (
    <ClassNames>
      {({ css }) => (
        <React.Fragment>
          <Tab
            icon={<PhoneIcon />}
            label="Background should be green"
            classes={{
              root: css({
                backgroundColor: 'red',
              }),
              labelIcon: css({ backgroundColor: 'green' }),
            }}
          />
          <Tab
            icon={<PhoneIcon />}
            label="Background should be green"
            className={css({ backgroundColor: 'red' })}
            classes={{
              labelIcon: css({
                backgroundColor: 'green',
              }),
            }}
          />
        </React.Fragment>
      )}
    </ClassNames>
  );
}
