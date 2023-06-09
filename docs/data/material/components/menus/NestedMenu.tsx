import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Icon, Typography } from '@mui/material';

const options = [
  {
    value: 'a',
    menuLevel: 0,
  },
  {
    value: 'b',
    menuLevel: 0,
    nestedOptions: [
      {
        value: 'e',
        menuLevel: 1,
        nestedOptions: [
          {
            value: 'h',
            menuLevel: 2,
          },
          {
            value: 'i',
            menuLevel: 2,
          },
          {
            value: 'j',
            menuLevel: 2,
          },
        ],
      },
      {
        value: 'f',
        menuLevel: 1,
      },
      {
        value: 'g',
        menuLevel: 1,
      },
    ],
  },
  {
    value: 'c',
    menuLevel: 0,
  },
  {
    value: 'd',
    menuLevel: 0,
    nestedOptions: [
      {
        value: 'm',
        menuLevel: 1,
      },
      {
        value: 'n',
        menuLevel: 1,
      },
      {
        value: '0',
        menuLevel: 1,
      },
    ],
  },
];

export default function BasicMenu() {
  const MENU_LEVELS = 3;

  const [anchors, setAnchors] = React.useState({
    elements: new Array(MENU_LEVELS).fill(null),
    options: new Array(MENU_LEVELS).fill(null),
  });

  const handleClick = (event, level = 0, nestedOptions = options) => {
    const target = event.currentTarget;

    setAnchors((prevAnchors) => ({
      elements: prevAnchors.elements.map((element, index) =>
        index === level ? target : element,
      ),
      options: prevAnchors.options.map((element, index) =>
        index === level ? nestedOptions : element,
      ),
    }));
  };
  const handleClose = (level) => {
    setAnchors((prevAnchors) => ({
      elements: prevAnchors.elements.map((element, index) =>
        index >= level ? null : element,
      ),
      options: prevAnchors.options.map((element, index) =>
        index >= level ? null : element,
      ),
    }));
  };

  return (
    <React.Fragment>
      <Button
        onClick={(event) => {
          handleClick(event);
        }}
      >
        Dashboard
      </Button>

      {anchors.elements.map((anchorElement, index) =>
        anchorElement ? (
          <Menu
            id="basic-menu"
            anchorEl={anchorElement}
            open={Boolean(anchorElement)}
            onClose={() => handleClose(0)}
            {...(index > 0
              ? {
                  anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                  },
                }
              : {})}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {(anchors.options[index] || []).map((option) => (
              <MenuItem
                key={option.value}
                onClick={(event) => {
                  if (option.nestedOptions) {
                    handleClick(event, option.menuLevel + 1, option.nestedOptions);
                  } else {
                    handleClose(0);
                  }
                }}
                onKeyDown={(event) => {
                  if (option.nestedOptions) {
                    if (event.key === 'ArrowRight') {
                      handleClick(event, option.menuLevel + 1, option.nestedOptions);
                    }
                  }
                  if (event.key === 'ArrowLeft' && option.menuLevel > 0) {
                    handleClose(option.menuLevel);
                  }
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <Typography>{option.value}</Typography>
                  {option.nestedOptions ? (
                    <Icon>
                      <ChevronRightIcon />
                    </Icon>
                  ) : null}
                </Box>
              </MenuItem>
            ))}
          </Menu>
        ) : null,
      )}
    </React.Fragment>
  );
}
