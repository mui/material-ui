import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ArchiveIcon from '@mui/icons-material/Archive';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2Separator from '@mui/material/Unstable_Menu2Separator';

const StyledMenu2 = styled((props) => (
  <Menu2 elevation={0} align="end" sideOffset={8} {...props} />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    minWidth: 180,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[3],
  },
  '& .MuiMenu2Item-root': {
    '& .MuiSvgIcon-root': {
      fontSize: 18,
      color: theme.palette.text.secondary,
      marginRight: theme.spacing(1.5),
    },
    '&:active': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity,
      ),
    },
  },
}));

export default function CustomizedMenu2() {
  return (
    <StyledMenu2
      trigger={
        <Button
          variant="contained"
          disableElevation
          endIcon={<KeyboardArrowDownIcon />}
        >
          Options
        </Button>
      }
    >
      <Menu2Item>
        <EditIcon />
        Edit
      </Menu2Item>
      <Menu2Item>
        <FileCopyIcon />
        Duplicate
      </Menu2Item>
      <Menu2Separator />
      <Menu2Item>
        <ArchiveIcon />
        Archive
      </Menu2Item>
    </StyledMenu2>
  );
}
