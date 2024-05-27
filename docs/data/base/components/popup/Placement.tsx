import * as React from 'react';
import {
  Unstable_Popup as BasePopup,
  PopupPlacement,
} from '@mui/base/Unstable_Popup';
import { styled, css, Theme } from '@mui/system';

function Radio({ value, ...props }: React.JSX.IntrinsicElements['input']) {
  return (
    <span>
      <input
        type="radio"
        id={`placement-${value}-radio`}
        name="placement"
        value={value}
        style={{ margin: '0 0.375rem 0 1rem' }}
        {...props}
      />
      <label htmlFor={`placement-${value}-radio`}>{value}</label>
    </span>
  );
}

function PlacementForm({
  setPlacement,
}: {
  setPlacement: (placement: PopupPlacement) => void;
}) {
  return (
    <PlacementFormBackground>
      <div style={{ textAlign: 'center' }}>
        <b>Placement value:</b>
      </div>
      <div style={{ textAlign: 'center', padding: '0.5rem 0px' }}>
        {['top-start', 'top', 'top-end'].map((value) => (
          <Radio
            key={value}
            value={value}
            onChange={(event) => {
              setPlacement(event.target.value as PopupPlacement);
            }}
          />
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0.5rem 0px',
        }}
      >
        <div>
          {['left-start', 'left', 'left-end'].map((value) => (
            <Radio
              key={value}
              value={value}
              onChange={(event) => {
                setPlacement(event.target.value as PopupPlacement);
              }}
            />
          ))}
        </div>
        <div>
          {['right-start', 'right', 'right-end'].map((value) => (
            <Radio
              key={value}
              value={value}
              onChange={(event) => {
                setPlacement(event.target.value as PopupPlacement);
              }}
            />
          ))}
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '0.5rem 0px' }}>
        {['bottom-start', 'bottom', 'bottom-end'].map((value) => (
          <Radio
            key={value}
            value={value}
            defaultChecked={value === 'bottom'}
            onChange={(event) => {
              setPlacement(event.target.value as PopupPlacement);
            }}
          />
        ))}
      </div>
    </PlacementFormBackground>
  );
}

export default function Placement() {
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const [placement, setPlacement] = React.useState<PopupPlacement>('bottom');
  return (
    <div style={{ width: '100%' }}>
      <PlacementForm setPlacement={setPlacement} />
      <div style={{ padding: '4rem 0', textAlign: 'center' }}>
        <Anchor ref={setAnchor} aria-describedby="placement-popper">
          Anchor
        </Anchor>
        <BasePopup
          id="placement-popper"
          open={Boolean(anchor)}
          anchor={anchor}
          placement={placement}
          offset={4}
        >
          <PopupBody>The content of the Popup.</PopupBody>
        </BasePopup>
      </div>
    </div>
  );
}

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const PopupBody = styled('div')(
  ({ theme }: { theme: Theme }) => css`
    padding: 0.5rem 1rem;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    box-shadow: ${theme.palette.mode === 'dark'
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`};
    min-height: 3rem;
    display: flex;
    align-items: center;
  `,
);

const Anchor = styled('span')(
  ({ theme }: { theme: Theme }) => css`
    display: inline-block;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
  `,
);

const PlacementFormBackground = styled('div')`
  background-color: rgb(0 0 0 / 0.05);
  border-radius: 8px;
  padding: 0.5rem;
  font-family: 'IBM Plex Sans', sans-serif;

  & input {
    font-family: inherit;
  }
`;
