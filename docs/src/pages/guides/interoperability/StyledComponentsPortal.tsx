import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))`
  & .MuiTooltip-tooltip {
    background: navy;
  }
`;

export default function StyledComponentsPortal() {
  return (
    <StyledTooltip title="I am navy">
      <Button variant="contained" color="primary">
        Styled tooltip
      </Button>
    </StyledTooltip>
  );
}
