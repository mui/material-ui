import * as React from 'react';
import IconButton from '@mui/joy/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import JoyVariablesDemo from 'docs/src/modules/components/JoyVariablesDemo';

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
          defaultValue: '36px',
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
