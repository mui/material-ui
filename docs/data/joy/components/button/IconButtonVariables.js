import * as React from 'react';
import JoyVariablesDemo from 'docs/src/modules/components/JoyVariablesDemo';
import IconButton from '@mui/joy/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

export default function IconButtonVariables() {
  return (
    <JoyVariablesDemo
      componentName="IconButton"
      renderCode={(formattedSx) =>
        `<IconButton${formattedSx ? `${formattedSx}>` : '\n>'}
  <FavoriteBorder />
</IconButton>`
      }
      data={[
        {
          var: '--IconButton-size',
          defaultValue: '40px',
        },
      ]}
      renderDemo={(sx) => (
        <IconButton sx={sx}>
          <FavoriteBorder />
        </IconButton>
      )}
    />
  );
}
