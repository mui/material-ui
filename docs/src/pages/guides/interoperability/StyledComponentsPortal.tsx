import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))`
  & .MuiTooltip-tooltip {
    background: pink;
  }
`;

export default function StyledComponentsPortal() {
  return (
    <StyledTooltip title="I am pink">
      <Button variant="contained" color="secondary">
        Styled tooltip
      </Button>
    </StyledTooltip>
  );
}
