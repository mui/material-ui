import React from 'react';
import PropTypes from 'prop-types';
import Showcase from 'docs/src/modules/components/Showcase';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ErrorIcon from '@material-ui/icons/Error';

function TextFieldDemo(props) {
  const { selectedVariant, options } = props;
  const [text, setText] = React.useState('');
  const showLI = options.indexOf('Leading Icon') !== -1;
  const showTI = options.indexOf('Trailing Icon') !== -1;

  const handleTextChange = e => {
    setText(e.target.value);
  };

  const startAdornment = (
    <InputAdornment position="start">
      <FavoriteIcon />
    </InputAdornment>
  );
  let endAdornment = (
    <InputAdornment position="end">
      <VisibilityIcon />
    </InputAdornment>
  );

  if (options.indexOf('Error Text') !== -1) {
    endAdornment = (
      <InputAdornment position="end">
        <ErrorIcon color="error" />
      </InputAdornment>
    );
  }

  let helperText = null;

  if (options.indexOf('Helper Text') !== -1) {
    helperText = 'Helper Text';
  } else if (options.indexOf('Error Text') !== -1) {
    helperText = 'Error Text';
  }

  return (
    <TextField
      label="Label"
      variant={selectedVariant.toLowerCase()}
      value={text}
      onChange={handleTextChange}
      InputProps={{
        startAdornment: showLI ? startAdornment : null,
        endAdornment: showTI ? endAdornment : null,
      }}
      key={`${showLI}${showTI}`}
      helperText={helperText}
      error={options.indexOf('Error Text') !== -1}
    />
  );
}

TextFieldDemo.propTypes = {
  options: PropTypes.array,
  selectedVariant: PropTypes.string,
};

export default function TextFieldShowcase() {
  const variants = [{ name:'Filled' }, { name: 'Outlined'}, { name: 'Standard', deprecated: true}];
  const [selectedOptions, setOptions] = React.useState([]);
  const [selectedVariant, setVariant] = React.useState('Filled');
  const options = [
    {
      title: 'Options',
      options: [
        { name: 'Character Counter', disabled: true },
        { name: 'Leading Icon' },
        { name: 'Trailing Icon' },
      ],
    },
    {
      title: 'Assistive Text',
      exclusive: true,
      options: [{ name: 'None' }, { name: 'Helper Text' }, { name: 'Error Text' }],
      defaultValue: 'None',
    },
  ];

  return (
    <Showcase
      variants={variants}
      selectedVariant={selectedVariant}
      onVariantChange={setVariant}
      options={options}
      onOptionChange={setOptions}
      selectedOptions={selectedOptions}
    >
      <TextFieldDemo selectedVariant={selectedVariant} options={selectedOptions} />
    </Showcase>
  );
}
