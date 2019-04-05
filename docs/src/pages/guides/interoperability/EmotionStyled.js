import React from 'react';
import styled from '@emotion/styled';
import Button from '@material-ui/core/Button';
import NoSsr from '@material-ui/core/NoSsr';

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
`;

function EmotionStyled() {
  return (
    <NoSsr>
      <div>
        <Button>Material-UI</Button>
        <StyledButton>Emotion</StyledButton>
      </div>
    </NoSsr>
  );
}

export default EmotionStyled;
