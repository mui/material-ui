import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Badge as BaseBadge } from '@mui/base/Badge';
import { useTheme } from '@mui/system';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function UnstyledBadgeIntroduction() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Badge badgeContent={5}>
        <span className="w-10 h-10 rounded-xl bg-slate-300 dark:bg-slate-400 inline-block align-middle" />
      </Badge>
    </div>
  );
}

const resolveSlotProps = (fn, args) => (typeof fn === 'function' ? fn(args) : fn);

const Badge = React.forwardRef((props, ref) => {
  return (
    <BaseBadge
      ref={ref}
      {...props}
      slotProps={{
        ...props.slotProps,
        root: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'box-border m-0 p-0 text-xs list-none relative inline-block leading-none',
              resolvedSlotProps?.className,
            ),
          };
        },
        badge: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.badge,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'z-auto absolute top-0 right-0 min-w-badge min-h-badge font-sans p-0 text-white font-semibold font-xs font-sans rounded-xl bg-purple-500 leading-5.5 whitespace-nowrap text-center translate-x-1/2 -translate-y-1/2 drop-shadow-lg origin-right',
              resolvedSlotProps?.className,
            ),
          };
        },
      }}
    />
  );
});

Badge.propTypes = {
  /**
   * The props used for each slot inside the Badge.
   * @default {}
   */
  slotProps: PropTypes.shape({
    badge: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
};
