import * as React from 'react';
import { styled, type Theme, SxProps } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Grow from '@mui/material/Grow';
import ListItem from '@mui/material/ListItem';
import ListItemButton, {
  type ListItemButtonProps,
} from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type {} from '@mui/material/themeCssVarsAugmentation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, type LinkProps } from 'react-router';
import { DashboardSidebarContext } from '../../context';
import { MINI_DRAWER_WIDTH } from '../../constants';

type DashboardSidebarPageItemButtonProps = ListItemButtonProps & {
  to?: LinkProps['to'];
};

const DashboardSidebarPageItemButton = styled(
  ListItemButton,
)<DashboardSidebarPageItemButtonProps>(({ theme }) => ({
  borderRadius: 8,
  '&.Mui-selected': {
    '& .MuiListItemIcon-root': {
      color: (theme.vars ?? theme).palette.primary.dark,
    },
    '& .MuiTypography-root': {
      color: (theme.vars ?? theme).palette.primary.dark,
    },
    '& .MuiSvgIcon-root': {
      color: (theme.vars ?? theme).palette.primary.dark,
    },
    '& .MuiAvatar-root': {
      backgroundColor: (theme.vars ?? theme).palette.primary.dark,
    },
    '& .MuiTouchRipple-child': {
      backgroundColor: (theme.vars ?? theme).palette.primary.dark,
    },
  },
  '& .MuiSvgIcon-root': {
    color: (theme.vars ?? theme).palette.action.active,
  },
  '& .MuiAvatar-root': {
    backgroundColor: (theme.vars ?? theme).palette.action.active,
  },
}));

export interface DashboardSidebarPageItemProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  href: string;
  action?: React.ReactNode;
  defaultExpanded?: boolean;
  expanded?: boolean;
  selected?: boolean;
  disabled?: boolean;
  nestedNavigation?: React.ReactNode;
}

const LIST_ITEM_ICON_SIZE = 34; // px

export default function DashboardSidebarPageItem({
  id,
  title,
  icon,
  href,
  action,
  defaultExpanded = false,
  expanded = defaultExpanded,
  selected = false,
  disabled = false,
  nestedNavigation,
}: DashboardSidebarPageItemProps) {
  const sidebarContext = React.useContext(DashboardSidebarContext);
  const {
    onPageItemClick,
    mini = false,
    fullyExpanded = true,
    fullyCollapsed = false,
  } = sidebarContext ?? {};

  const [isHovered, setIsHovered] = React.useState(false);

  const handleClick = React.useCallback(() => {
    if (onPageItemClick) {
      onPageItemClick(id, !!nestedNavigation);
    }
  }, [onPageItemClick, id, nestedNavigation]);

  let nestedNavigationCollapseSx: SxProps<Theme> = { display: 'none' };
  if (mini && fullyCollapsed) {
    nestedNavigationCollapseSx = {
      fontSize: 18,
      position: 'absolute',
      top: '41.5%',
      right: '2px',
      transform: 'translateY(-50%) rotate(-90deg)',
    };
  } else if (!mini && fullyExpanded) {
    nestedNavigationCollapseSx = {
      ml: 0.5,
      transform: `rotate(${expanded ? 0 : -90}deg)`,
      transition: (theme: Theme) =>
        theme.transitions.create('transform', {
          easing: theme.transitions.easing.sharp,
          duration: 100,
        }),
    };
  }

  const hasExternalHref = href
    ? href.startsWith('http://') || href.startsWith('https://')
    : false;

  const LinkComponent = hasExternalHref ? 'a' : Link;

  const listItem = (
    <ListItem
      {...(nestedNavigation && mini
        ? {
            onMouseEnter: () => {
              setIsHovered(true);
            },
            onMouseLeave: () => {
              setIsHovered(false);
            },
          }
        : {})}
      sx={{
        py: 0,
        px: 1,
        overflowX: 'hidden',
      }}
    >
      <DashboardSidebarPageItemButton
        selected={selected}
        disabled={disabled}
        sx={{
          px: 1.4,
          height: mini ? 60 : 48,
        }}
        {...(nestedNavigation && !mini
          ? {
              onClick: handleClick,
            }
          : {})}
        {...(!nestedNavigation
          ? {
              LinkComponent,
              ...(hasExternalHref
                ? {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  }
                : {}),
              href,
              onClick: handleClick,
            }
          : {})}
      >
        {icon || mini ? (
          <Box
            sx={
              mini
                ? {
                    position: 'absolute',
                    left: '50%',
                    top: 'calc(50% - 6px)',
                    transform: 'translate(-50%, -50%)',
                  }
                : {}
            }
          >
            <ListItemIcon
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: LIST_ITEM_ICON_SIZE,
              }}
            >
              {icon ?? null}
              {!icon && mini ? (
                <Avatar
                  sx={{
                    width: LIST_ITEM_ICON_SIZE - 7,
                    height: LIST_ITEM_ICON_SIZE - 7,
                    fontSize: 12,
                  }}
                >
                  {title
                    .split(' ')
                    .slice(0, 2)
                    .map((titleWord) => titleWord.charAt(0).toUpperCase())}
                </Avatar>
              ) : null}
            </ListItemIcon>
            {mini ? (
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  bottom: -18,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: 10,
                  fontWeight: 500,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: MINI_DRAWER_WIDTH - 28,
                }}
              >
                {title}
              </Typography>
            ) : null}
          </Box>
        ) : null}
        {!mini ? (
          <ListItemText
            primary={title}
            sx={{
              ml: 1.2,
              whiteSpace: 'nowrap',
              zIndex: 1,
            }}
          />
        ) : null}
        {action && !mini && fullyExpanded ? action : null}
        {nestedNavigation ? (
          <ExpandMoreIcon sx={nestedNavigationCollapseSx} />
        ) : null}
      </DashboardSidebarPageItemButton>
      {nestedNavigation && mini ? (
        <Grow in={isHovered}>
          <Box
            sx={{
              position: 'fixed',
              left: MINI_DRAWER_WIDTH - 2,
              pl: '6px',
            }}
          >
            <Paper
              sx={{
                pt: 0.5,
                pb: 0.5,
                transform: 'translateY(calc(50% - 30px))',
              }}
            >
              <DashboardSidebarContext.Provider
                value={{
                  onPageItemClick: onPageItemClick ?? (() => {}),
                  mini: false,
                  fullyExpanded: true,
                  fullyCollapsed: false,
                  hasDrawerTransitions: false,
                }}
              >
                {nestedNavigation}
              </DashboardSidebarContext.Provider>
            </Paper>
          </Box>
        </Grow>
      ) : null}
    </ListItem>
  );

  return (
    <React.Fragment>
      {listItem}
      {nestedNavigation && !mini ? (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {nestedNavigation}
        </Collapse>
      ) : null}
    </React.Fragment>
  );
}
