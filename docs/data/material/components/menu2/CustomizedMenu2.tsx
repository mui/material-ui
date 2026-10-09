import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ArchiveIcon from '@mui/icons-material/Archive';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu, { Menu2Props as MenuProps } from '@mui/material/Unstable_Menu2';
import MenuItem from '@mui/material/Unstable_Menu2Item';
import MenuSeparator from '@mui/material/Unstable_Menu2Separator';

const StyledMenu = styled((props: MenuProps) => (
  <Menu elevation={0} align="end" sideOffset={8} {...props} />
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
    <StyledMenu
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
      <MenuItem>
        <EditIcon />
        Edit
      </MenuItem>
      <MenuItem>
        <FileCopyIcon />
        Duplicate
      </MenuItem>
      <MenuSeparator />
      <MenuItem>
        <ArchiveIcon />
        Archive
      </MenuItem>
    </StyledMenu>
  );
}
