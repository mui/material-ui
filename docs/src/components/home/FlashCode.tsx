import { keyframes, shouldForwardProp } from '@material-ui/system';
import { styled } from '@material-ui/core/styles';

const flashCodeKeyframe = keyframes`
  0% {
    background-color: rgba(0, 127, 255, 0.2);
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

const FlashCode = styled('div', {
  shouldForwardProp: (prop) =>
    shouldForwardProp(prop) && prop !== 'endLine' && prop !== 'startLine',
})<{ endLine?: number; startLine?: number }>(({ theme, startLine = 0, endLine = 1 }) => ({
  borderRadius: 2,
  pointerEvents: 'none',
  position: 'absolute',
  left: 0,
  right: 0,
  top: startLine * 20,
  height: (endLine - startLine) * 20,
  ...theme.typography.body2,
  animationName: flashCodeKeyframe,
  animationDuration: '1s',
}));

export default FlashCode;
