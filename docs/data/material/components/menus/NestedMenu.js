import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {
  Box,
  ClickAwayListener,
  Grow,
  Icon,
  MenuList,
  Paper,
  Popper,
  Typography,
} from '@mui/material';

function sign(px, py, qx, qy, rx, ry) {
  return (px - rx) * (qy - ry) - (qx - rx) * (py - ry);
}

function pointInTriangle(currentMouseCoordinates, triangleCoordinates) {
  const [x1, y1, x2, y2, x3, y3] = triangleCoordinates;
  const [x, y] = currentMouseCoordinates;

  const b1 = sign(x, y, x1, y1, x2, y2) <= 0;
  const b2 = sign(x, y, x2, y2, x3, y3) <= 0;
  const b3 = sign(x, y, x3, y3, x1, y1) <= 0;

  return b1 === b2 && b2 === b3;
}

function SubMenu({ options, menuLevels, onOptionClick }) {
  const [anchors, setAnchors] = React.useState({
    elements: new Array(menuLevels).fill(null),
    options: new Array(menuLevels).fill(null),
  });

  const mouseEntered = React.useRef({});

  const mouseLeftCordinates = React.useRef([]);

  const buttonRef = React.useRef(null);

  const mouseIdleTimer = React.useRef(null);

  const handleOpen = (event, level = 0, nestedOptions = options) => {
    const target = event.target;

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

  const handleClickAway = (event) => {
    if (event.target === buttonRef.current) {
      handleClose(0);
      return;
    }

    const optionWithoutSubMenu = anchors.elements.every(
      (element) => !event.composedPath().includes(element),
    );

    if (optionWithoutSubMenu) {
      handleClose(0);
    }
  };

  const handleClickOption = (option) => {
    if (!option.nestedOptions) {
      handleClose(0);
    }
    onOptionClick(option);
  };

  const handleMouseMove = (event, option, optIndex) => {
    let shouldComputeSubMenuOpenLogic = true;
    const submenu = document.querySelector(`#nested-menu-${option.menuLevel + 1}`);

    function computeSubMenuLogic() {
      if (!mouseEntered.current[getId(option, optIndex)]) {
        mouseEntered.current[getId(option, optIndex)] = true;
        // if mouse moved from option which has submenu to current option which doesn't have submenu, then all submenu should be closed
        if (!option.nestedOptions) {
          handleClose(option.menuLevel + 1);
        } else if (
          // if mouse moved from option which has submenu to current option which have submenu, then open current option submenu and close previous option submenu
          option.nestedOptions &&
          anchors.options[option.menuLevel + 1] &&
          !option.nestedOptions.every(
            (val, i) =>
              val.value === anchors.options[option.menuLevel + 1]?.[i].value,
          )
        ) {
          handleClose(option.menuLevel + 1);
          handleOpen(event, option.menuLevel + 1, option.nestedOptions);
        } else {
          handleOpen(event, option.menuLevel + 1, option.nestedOptions);
        }
      }
    }

    if (mouseLeftCordinates.current.length > 0 && submenu) {
      const { x, y, height } = submenu.getBoundingClientRect();

      const [x1, y1] = [
        {
          x,
          y: -y,
        },
        {
          x,
          y: -(y + height),
        },
      ];

      const currentMouseCoordinates = [event.clientX, -event.clientY];
      const virtualTriangleCordinates = [
        x1.x,
        x1.y,
        y1.x,
        y1.y,
        mouseLeftCordinates.current[0],
        mouseLeftCordinates.current[1],
      ];

      if (pointInTriangle(currentMouseCoordinates, virtualTriangleCordinates)) {
        shouldComputeSubMenuOpenLogic = false;
        if (mouseIdleTimer.current) {
          clearTimeout(mouseIdleTimer.current);
        }
        mouseIdleTimer.current = setTimeout(() => {
          computeSubMenuLogic();
        }, 50);
      } else {
        shouldComputeSubMenuOpenLogic = true;
      }
    }

    if (shouldComputeSubMenuOpenLogic) {
      if (mouseIdleTimer.current) {
        clearTimeout(mouseIdleTimer.current);
      }
      computeSubMenuLogic();
    }
  };

  const handleMouseLeave = (event, option, optIndex) => {
    mouseLeftCordinates.current = [event.clientX, -event.clientY];

    if (mouseIdleTimer.current) {
      clearInterval(mouseIdleTimer.current);
    }
    mouseEntered.current[getId(option, optIndex)] = false;
  };

  const handleKeyDown = (event, option) => {
    if (option.nestedOptions) {
      if (event.key === 'ArrowRight' || event.key === 'Enter') {
        handleOpen(event, option.menuLevel + 1, option.nestedOptions);
      }
    }
    if (event.key === 'ArrowLeft' && option.menuLevel > 0) {
      handleClose(option.menuLevel);
      anchors.elements[option.menuLevel]?.focus();
    }

    if (event.key === 'Escape') {
      handleClose(0);
    }
  };

  const getId = (option, index) => {
    return `${index}-${option.menuLevel}`;
  };

  return (
    <React.Fragment>
      <Button
        ref={buttonRef}
        onClick={(event) => {
          handleOpen(event);
        }}
      >
        Menu
      </Button>

      {anchors.elements.map((anchorElement, index) =>
        anchorElement ? (
          <Popper
            open={Boolean(anchorElement)}
            anchorEl={anchorElement}
            key={`${anchorElement.innerText} menu`}
            role={undefined}
            placement={index > 0 ? 'right-start' : 'bottom-start'}
            transition
          >
            {({ TransitionProps }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: 'left top',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClickAway}>
                    <MenuList
                      autoFocusItem={Boolean(anchorElement)}
                      id={`nested-menu-${index}`}
                      aria-labelledby="nested-button"
                    >
                      {(anchors.options[index] ?? []).map((option, optIndex) => (
                        <MenuItem
                          key={option.value}
                          aria-haspopup={!!option.nestedOptions ?? undefined}
                          aria-expanded={
                            option.nestedOptions
                              ? anchors.elements.some(
                                  (element) => element?.innerText === option.value,
                                )
                              : undefined
                          }
                          onClick={() => handleClickOption(option)}
                          onMouseMove={(event) =>
                            handleMouseMove(event, option, optIndex)
                          }
                          onMouseLeave={(event) =>
                            handleMouseLeave(event, option, optIndex)
                          }
                          onKeyDown={(event) => handleKeyDown(event, option)}
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
                              <Icon fontSize="small">chevron_right</Icon>
                            ) : null}
                          </Box>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        ) : null,
      )}
    </React.Fragment>
  );
}

SubMenu.propTypes = {
  menuLevels: PropTypes.number.isRequired,
  onOptionClick: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      menuLevel: PropTypes.number.isRequired,
      nestedOptions: PropTypes.arrayOf(PropTypes.object),
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default function NestedMenu() {
  const handleClickOption = (option) => {
    console.log(`You clicked on ${option.value}`);
  };

  const options = [
    {
      value: 'Food',
      menuLevel: 0,
    },
    {
      value: 'Drinks',
      menuLevel: 0,
      nestedOptions: [
        {
          value: 'Non-Alcoholic',
          menuLevel: 1,
          nestedOptions: [
            {
              value: 'Soda',
              menuLevel: 2,
            },
            {
              value: 'Iced Tea',
              menuLevel: 2,
            },
            {
              value: 'Lemonade',
              menuLevel: 2,
            },
            {
              value: 'Mocktail',
              menuLevel: 2,
            },
            {
              value: 'Smoothie',
              menuLevel: 2,
            },
            {
              value: 'Herbal tea',
              menuLevel: 2,
            },
          ],
        },
        {
          value: 'Alcoholic',
          menuLevel: 1,
        },
      ],
    },
    {
      value: 'Desserts',
      menuLevel: 0,
      nestedOptions: [
        {
          value: 'Cakes',
          menuLevel: 1,
        },
        {
          value: 'Ice Cream',
          menuLevel: 1,
        },
        {
          value: 'Pastries',
          menuLevel: 1,
        },
      ],
    },
  ];

  return (
    <SubMenu options={options} menuLevels={3} onOptionClick={handleClickOption} />
  );
}
