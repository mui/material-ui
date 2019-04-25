import React from 'react';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import ReactAutosuggest, {
  ChangeEvent,
  GetSuggestionValue,
  // InputProps,
  OnSuggestionsClearRequested,
  RenderSuggestionParams,
  RenderSuggestionsContainerParams,
  SuggestionsFetchRequested,
} from 'react-autosuggest';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
}));

export interface AutosuggestProps<TSuggestion> {
  getSuggestionValue: GetSuggestionValue<TSuggestion>;

  // Called every time the input value changes
  onChange(event: React.FormEvent<any>, params: ChangeEvent): void;

  // Will be called every time you need to recalculate suggestions
  onSuggestionsFetchRequested: SuggestionsFetchRequested;

  // Will be called every time you need to set suggestions to []
  onSuggestionsClearRequested?: OnSuggestionsClearRequested;

  // These are the suggestions that will be displayed.
  // Items can take an arbitrary shape.
  suggestions: TSuggestion[];

  value: string;
}

function Autosuggest<TSuggestion>({
  getSuggestionValue,
  onChange,
  value,
  ...rest
}: AutosuggestProps<TSuggestion>) {
  const classes = useStyles();

  const inputProps = {
    classes,
    onChange,
    value,
  };

  // const renderInputComponent = <TSuggestion extends {}>(
  //     inputProps: InputProps<TSuggestion>
  // ) => {
  //     const { classes, inputRef = () => {}, ref, ...rest } = inputProps;
  //
  //     return (
  //         <TextField
  //             fullWidth
  //             InputProps={{
  //                 inputRef: node => {
  //                     ref(node);
  //                     inputRef(node);
  //                 },
  //                 classes: {
  //                     input: classes.input
  //                 }
  //             }}
  //             {...rest}
  //         />
  //     );
  // };

  const renderSuggestion = (
    suggestion: TSuggestion,
    { query, isHighlighted }: RenderSuggestionParams,
  ) => {
    const text = getSuggestionValue(suggestion);
    const matches = match(text, query);
    const parts = parse(text, matches);

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map(part => (
            <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
              {part.text}
            </span>
          ))}
        </div>
      </MenuItem>
    );
  };

  const renderSuggestionsContainer = (params: RenderSuggestionsContainerParams) => (
    <Paper {...params.containerProps} square>
      {params.children}
    </Paper>
  );

  const theme = {
    container: classes.container,
    suggestion: classes.suggestion,
    suggestionsContainerOpen: classes.suggestionsContainerOpen,
    suggestionsList: classes.suggestionsList,
  };

  return (
    <ReactAutosuggest
      getSuggestionValue={getSuggestionValue}
      inputProps={inputProps}
      renderSuggestion={renderSuggestion}
      renderSuggestionsContainer={renderSuggestionsContainer}
      theme={theme}
      {...rest}
    />
  );
}

export default Autosuggest;
