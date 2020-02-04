import React from 'react';
import styled from 'styled-components';
import { TextField, NoSsr } from '@material-ui/core';

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
` as typeof TextField;

export default function GlobalClassName() {
  return (
    <NoSsr>
      <StyledTextField label="Deterministic" variant="outlined" id="deterministic-outlined-input" />
    </NoSsr>
  );
}
