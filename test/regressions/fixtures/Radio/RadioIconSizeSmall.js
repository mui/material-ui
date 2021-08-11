import * as React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

export default function RadioIconSizeSmall() {
  return (
    <div>
      <Radio size="small" />
      <Radio size="small" icon={<RadioButtonUncheckedIcon />} />
    </div>
  );
}
