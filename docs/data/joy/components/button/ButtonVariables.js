import * as React from 'react';
import Button from '@mui/joy/Button';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import JoyVariablesDemo from 'docs/src/modules/components/JoyVariablesDemo';

export default function ButtonVariables() {
  return (
    <JoyVariablesDemo
      componentName="Button"
      renderCode={(formattedSx) => `<Button
  startDecorator={<FavoriteBorder />}${formattedSx ? `${formattedSx}>` : '\n>'}`}
      data={[
        {
          var: '--Button-gap',
          defaultValue: '8px',
        },
      ]}
      renderDemo={(sx) => (
        <Button sx={sx} startDecorator={<FavoriteBorder />}>
          Favorite
        </Button>
      )}
    />
  );
}
