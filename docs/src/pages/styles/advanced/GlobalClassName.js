import * as React from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import { NoSsr } from '@material-ui/unstyled';

const StyledTextField = styled(TextField)`
  label.Mui-focused {
    color: green;
  }

  .MuiOutlinedInput-root {
    fieldset {
      border-color: red;
    }

    &:hover fieldset {
      border-color: yellow;
    }

    &.Mui-focused fieldset {
      border-color: green;
    }
  }
`;

export default function GlobalClassName() {
  return (
    <NoSsr>
      <StyledTextField
        label="Deterministic"
        variant="outlined"
        id="deterministic-outlined-input"
      />
    </NoSsr>
  );
}
