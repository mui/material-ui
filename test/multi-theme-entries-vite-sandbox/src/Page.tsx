import * as React from 'react';
import type MuiButton from '@mui/material/Button';
import type MuiSlider from '@mui/material/Slider';

interface PageProps {
  Button: typeof MuiButton;
  Slider?: typeof MuiSlider;
  description: string;
  title: string;
}

export default function Page({ Button, Slider, description, title }: PageProps) {
  const [value, setValue] = React.useState(45);

  return (
    <main>
      <p className="eyebrow">Generated themed JavaScript entries</p>
      <h1>{title}</h1>
      <p className="description">{description}</p>

      <nav aria-label="Entry point scenarios">
        <a href="./index.html">Direct component</a>
        <a href="./barrel.html">Single barrel export</a>
        <a href="./multiple.html">Multiple barrel exports</a>
      </nav>

      <section>
        <h2>Button</h2>
        <div className="row">
          <Button disableRipple variant="contained">
            Themed button
          </Button>
          <Button disableRipple variant="outlined">
            Outlined
          </Button>
        </div>
      </section>

      {Slider ? (
        <section>
          <h2>Slider</h2>
          <Slider
            aria-label="Themed slider"
            marks
            value={value}
            valueLabelDisplay="auto"
            onChange={(_event, nextValue) => setValue(nextValue as number)}
          />
        </section>
      ) : null}
    </main>
  );
}
