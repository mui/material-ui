import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Stack, Tooltip } from '@mui/material';

export default function DifferentChildren() {
  return (
      <Stack spacing={2}>
        {/* It has one button with href which is rendered as anchor tag */}
        <ButtonGroup aria-label="split button">
          <Button href="##">{'Create a merge commit'}</Button>
          <Button size="small" aria-label="select merge strategy" aria-haspopup="menu">
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>

        {/* With tooltip */}
        <ButtonGroup>
          <Tooltip title="tooltip">
            <span>
              <Button>Enabled</Button>
            </span>
          </Tooltip>
          <Tooltip title="tooltip">
            <span>
              <Button disabled>Disabled</Button>
            </span>
          </Tooltip>
        </ButtonGroup>
      </Stack>
  );
}
