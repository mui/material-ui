import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import NoSsr from '@material-ui/core/NoSsr';

const StyledButton = styled(({ color, ...other }) => <Button {...other} />)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);

  & .MuiButton-label {
    color: ${props => props.color};
  }
`;

function StyledComponentsDeep() {
  return (
    <NoSsr>
      <div>
        <Button>Material-UI</Button>
        <StyledButton color="papayawhip">Styled Components</StyledButton>
      </div>
    </NoSsr>
  );
}

export default StyledComponentsDeep;
