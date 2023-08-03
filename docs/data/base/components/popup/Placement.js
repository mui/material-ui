import * as React from 'react';
import PropTypes from 'prop-types';
import Popup from '@mui/base/Popup';
import { styled, css } from '@mui/system';

function Radio({ value, ...props }) {
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

Radio.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
    PropTypes.string,
  ]),
};

function PlacementForm({ setPlacement }) {
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
              setPlacement(event.target.value);
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
                setPlacement(event.target.value);
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
                setPlacement(event.target.value);
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
              setPlacement(event.target.value);
            }}
          />
        ))}
      </div>
    </PlacementFormBackground>
  );
}

PlacementForm.propTypes = {
  setPlacement: PropTypes.func.isRequired,
};

export default function Placement() {
  const [anchor, setAnchor] = React.useState(null);
  const [placement, setPlacement] = React.useState('bottom');
  return (
    <div style={{ width: '100%' }}>
      <PlacementForm setPlacement={setPlacement} />
      <div style={{ padding: '4rem 0', textAlign: 'center' }}>
        <Anchor ref={setAnchor} aria-describedby="placement-popper">
          Anchor
        </Anchor>
        <Popup
          id="placement-popper"
          open={Boolean(anchor)}
          anchor={anchor}
          placement={placement}
          offset={4}
        >
          <PopupBody>The content of the Popup.</PopupBody>
        </Popup>
      </div>
    </div>
  );
}

const grey = {
  50: '#f6f8fa',
  200: '#d0d7de',
  500: '#6e7781',
  700: '#424a53',
  900: '#24292f',
};

const PopupBody = styled('div')(
  ({ theme }) => css`
    padding: 0.5rem 1rem;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
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
  ({ theme }) => css`
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
