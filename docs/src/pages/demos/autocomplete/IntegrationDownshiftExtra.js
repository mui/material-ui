import React from 'react';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import Paper from '@material-ui/core/Paper';
import { suggestions, renderInput, renderSuggestion, useStyles } from './IntegrationDownshift';

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  let count = 0;

  // search for all string instead of
  // only the beginning
  return suggestions.filter(suggestion => {
    const keep = count < 5 && suggestion.label.toLowerCase().includes(inputValue);

    if (keep) {
      count += 1;
    }

    return keep;
  });
}

function IntegrationDownshiftExtra() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Downshift id="downshift-simple">
        {({
          clearSelection,
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          openMenu,
          selectedItem,
        }) => (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                onFocus: openMenu,
                onChange: e => {
                  if (e.target.value === '') {
                    clearSelection();
                  }
                },
                placeholder: 'Search a country (start with a)',
              }),
            })}
            <div {...getMenuProps()}>
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {getSuggestions(inputValue).map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion.label }),
                      highlightedIndex,
                      selectedItem,
                    }),
                  )}
                </Paper>
              ) : null}
            </div>
          </div>
        )}
      </Downshift>
    </div>
  );
}

export default IntegrationDownshiftExtra;
