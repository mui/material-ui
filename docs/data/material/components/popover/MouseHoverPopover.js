import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

export default function MouseHoverPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handlePopoverMouseMove = (event) => {
    const x = event.clientX;
    const y = event.clientY;

    if (!typographyRef.current || !paperRef.current) {
      return;
    }

    const isMouseInsideTypography =
      x > typographyRef.current?.getBoundingClientRect().left &&
      x < typographyRef.current?.getBoundingClientRect().right &&
      y > typographyRef.current?.getBoundingClientRect().top &&
      y < typographyRef.current?.getBoundingClientRect().bottom;

    const isMouseInsidePaper =
      x > paperRef.current?.getBoundingClientRect().left &&
      x < paperRef.current?.getBoundingClientRect().right &&
      y > paperRef.current?.getBoundingClientRect().top &&
      y < paperRef.current?.getBoundingClientRect().bottom;

    if (!isMouseInsideTypography && !isMouseInsidePaper) {
      handlePopoverClose();
    }
  };

  const open = Boolean(anchorEl);

  const paperRef = React.useRef(null);
  const typographyRef = React.useRef(null);

  return (
    <div>
      <Typography
        ref={typographyRef}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverMouseMove}
      >
        Hover with a Popover.
      </Typography>

      <Popover
        onMouseMove={handlePopoverMouseMove}
        slotProps={{
          paper: {
            ref: paperRef,
          },
        }}
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>I use Popover.</Typography>
      </Popover>
    </div>
  );
}
