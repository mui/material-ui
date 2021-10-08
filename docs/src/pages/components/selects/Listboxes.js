import * as React from 'react';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import { useListbox } from '@mui/core/ListboxUnstyled';
import { styled } from '@mui/system';

const options = [
  'Mercury',
  'Venus',
  'Earth',
  'Mars',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune',
  'Pluto',
];

const List = styled('ul')`
  box-shadow: 0 4px 6px -2px rgba(0, 0, 0, 0.15);
  padding: 0;
  margin: 20px 0;

  > li {
    list-style: none;
    padding: 4px 12px;
    margin: 0;
    min-width: 150px;
    color: rgba(0, 0, 0, 0.85);
    cursor: default;

    &.highlighted {
      background-color: #cde;
      border-left: 4px solid #567;
      padding-left: 8px;
    }

    &:hover {
      background-color: #cde;
    }

    &.selected {
      background-color: #345;
      color: #fff;
      font-weight: bold;
    }

    &.disabled {
      opacity: 0.5;
    }
  }
`;

function renderOption(optionState, optionProps) {
  const { selected, disabled, highlighted, option } = optionState;
  const classes = {
    selected,
    disabled,
    highlighted,
  };

  return (
    <li key={option} {...optionProps} className={clsx(classes)}>
      {option}
    </li>
  );
}

function CustomListbox(props) {
  const listRef = React.useRef(null);

  const { getRootProps, getOptionProps, getOptionState } = useListbox(
    props,
    listRef,
  );

  return (
    <List {...getRootProps()} ref={listRef}>
      {options.map((option, index) =>
        renderOption(getOptionState(index), getOptionProps(index)),
      )}
    </List>
  );
}

// allows to select at most two items

const customReducer = (state, action, internalReducer) => {
  const newState = internalReducer(state, action);
  if (Array.isArray(newState.selectedValue) && newState.selectedValue.length > 2) {
    return {
      ...newState,
      selectedValue: newState.selectedValue.slice(-2),
    };
  }

  return newState;
};

export default function Listboxes() {
  const [selectedPlanet, setSelectedPlanet] = React.useState('Earth');
  const [selectedPlanets, setSelectedPlanets] = React.useState(['Earth']);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Box m={4}>
        <h3>Single select</h3>
        <CustomListbox
          defaultValue={'Earth'}
          onChange={(event, value) =>
            console.log('Single select onChange', { event, value })
          }
          options={options}
          isOptionDisabled={(option) => option === 'Pluto'}
        />
      </Box>
      <Box m={4}>
        <h3>Multi select</h3>
        <CustomListbox
          defaultValue={['Uranus', 'Jupiter']}
          options={options}
          selectMultiple
          isOptionDisabled={(option) => option.length <= 5}
        />
      </Box>
      <Box m={4}>
        <h3>Controlled single select</h3>
        <CustomListbox
          value={selectedPlanet}
          onChange={(_, value) => setSelectedPlanet(value)}
          options={options}
        />
        <p>Selected planet: {selectedPlanet}</p>
      </Box>
      <Box m={4}>
        <h3>Controlled multi select</h3>
        <CustomListbox
          value={selectedPlanets}
          selectMultiple
          onChange={(_, value) => setSelectedPlanets(value)}
          options={options}
        />
        <p>
          Selected planets:
          {selectedPlanets.join(', ')}
        </p>
      </Box>
      <Box m={4}>
        <h3>Custom state reducer</h3>
        <p>Allows at most 2 options</p>
        <CustomListbox
          selectMultiple
          options={options}
          stateReducer={customReducer}
        />
      </Box>
    </div>
  );
}
