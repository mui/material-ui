import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { samePageLinkNavigation } from 'docs/src/modules/components/MarkdownLinks';
import TableOfContents, { TOC_WIDTH } from 'docs/src/modules/components/TableOfContents';

function flatten(headings) {
  const items = [];
  headings.forEach((item) => {
    items.push({ ...item, level: 1 });
    if (item.children.length > 0) {
      item.children.forEach((subitem) => {
        items.push({ ...subitem, level: 2 });
      });
    }
  });
  return items;
}

function getBarWidth(text, level) {
  const length = text.replace(/<[^>]*>/g, '').length;
  const base = level === 2 ? 8 : 10;
  const width = Math.min(base + length * 0.5, 24);
  return Math.round(width);
}

const Bar = styled('a', {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'barWidth' && prop !== 'level',
})(({ theme, barWidth }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '6px 0',
  cursor: 'pointer',
  '&::after': {
    content: '""',
    display: 'block',
    height: 3,
    width: barWidth,
    borderRadius: 2,
    backgroundColor: (theme.vars || theme).palette.grey[300],
    transition: 'background-color 0.15s ease',
  },
  '&:hover::after': {
    backgroundColor: (theme.vars || theme).palette.grey[500],
  },
  variants: [
    {
      props: { active: true },
      style: [
        {
          '&::after': {
            backgroundColor: (theme.vars || theme).palette.primary[400],
          },
          '&:hover::after': {
            backgroundColor: (theme.vars || theme).palette.primary[600],
          },
        },
        theme.applyDarkStyles({
          '&::after': {
            backgroundColor: (theme.vars || theme).palette.primary[500],
          },
          '&:hover::after': {
            backgroundColor: (theme.vars || theme).palette.primary[400],
          },
        }),
      ],
    },
    {
      props: { active: false },
      style: theme.applyDarkStyles({
        '&::after': {
          backgroundColor: (theme.vars || theme).palette.grey[700],
        },
        '&:hover::after': {
          backgroundColor: (theme.vars || theme).palette.grey[500],
        },
      }),
    },
  ],
}));

export default function MiniTableOfContents(props) {
  const { toc, activeState, itemLink, onItemClick } = props;
  const containerRef = React.useRef(null);
  const [popperOpen, setPopperOpen] = React.useState(false);

  const items = React.useMemo(() => flatten(toc), [toc]);

  const handleMouseEnter = () => {
    setPopperOpen(true);
  };

  const handleClose = () => {
    setPopperOpen(false);
  };

  const handleBarClick = (event, hash) => {
    if (samePageLinkNavigation(event)) {
      return;
    }
    event.preventDefault();
    onItemClick(hash)(event);
    const node = document.getElementById(hash);
    if (node) {
      node.scrollIntoView({ block: 'start' });
      window.history.pushState(null, '', `#${hash}`);
    }
  };

  const popperItemLink = (item, level) => itemLink(item, level, handleClose);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        sx={{
          position: 'sticky',
          top: '20%',
          transform: 'translateY(-20%)',
          height: 'fit-content',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          alignItems: 'stretch',
          py: 2,
          px: 1.5,
          cursor: 'pointer',
        }}
      >
        {items.map((item) => (
          <Bar
            key={item.hash}
            href={`#${item.hash}`}
            active={activeState === item.hash}
            barWidth={getBarWidth(item.text, item.level)}
            level={item.level}
            onClick={(event) => handleBarClick(event, item.hash)}
          />
        ))}
        <Popper
          open={popperOpen}
          anchorEl={containerRef.current}
          placement="left-start"
          transition
          sx={{ zIndex: 1300 }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={250}>
              <Paper
                variant="outlined"
                onMouseLeave={handleClose}
                sx={(theme) => ({
                  p: 1,
                  mr: 1,
                  maxHeight: 'calc(100vh - 200px)',
                  width: TOC_WIDTH,
                  overflowY: 'auto',
                  scrollbarWidth: 'thin',
                  borderColor: 'grey.200',
                  bgcolor: 'background.paper',
                  boxShadow: `0px 4px 16px ${alpha(theme.palette.grey[200], 0.8)}`,
                  ...theme.applyDarkStyles({
                    borderColor: 'primaryDark.700',
                    bgcolor: 'primaryDark.900',
                    boxShadow: `0px 4px 16px ${alpha(theme.palette.common.black, 0.8)}`,
                  }),
                })}
              >
                <TableOfContents toc={toc} itemLink={popperItemLink} onLinkClick={handleClose} />
              </Paper>
            </Fade>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}

MiniTableOfContents.propTypes = {
  activeState: PropTypes.string,
  itemLink: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  toc: PropTypes.array.isRequired,
};
