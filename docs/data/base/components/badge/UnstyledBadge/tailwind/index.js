import * as React from 'react';
import PropTypes from 'prop-types';
import { Badge } from '@mui/base/Badge';
import { useTheme } from '@mui/system';

import clsx from 'clsx';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function UnstyledBadge() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <CustomBadge badgeContent={5}>
        <span className="w-10 h-10 rounded-xl bg-slate-300 dark:bg-slate-400 inline-block align-middle" />
      </CustomBadge>
    </div>
  );
}

const resolveSlotProps = (fn, args) => (typeof fn === 'function' ? fn(args) : fn);

const CustomBadge = React.forwardRef((props, ref) => {
  // Replace this with your app logic for determining dark modes
  const isDarkMode = useIsDarkMode();

  return (
    <Badge
      ref={ref}
      {...props}
      className={clsx(isDarkMode ? 'dark' : '', props.className)}
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
              'z-auto absolute top-0 right-0 min-w-badge min-h-badge p-0 text-white font-semibold font-xs rounded-xl bg-purple-500 leading-5.5 whitespace-nowrap text-center translate-x-1/2 -translate-y-1/2 drop-shadow-lg origin-right',
              resolvedSlotProps?.className,
            ),
          };
        },
      }}
    />
  );
});

CustomBadge.propTypes = {
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The props used for each slot inside the Badge.
   * @default {}
   */
  slotProps: PropTypes.shape({
    badge: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
};
