import * as React from 'react';
import SliderUnstyled, {
  SliderUnstyledThumbSlotProps,
  SliderUnstyledProps,
} from '@mui/base/SliderUnstyled';

const Thumb = React.forwardRef(function Thumb(
  props: SliderUnstyledThumbSlotProps,
  ref: React.ForwardedRef<HTMLSpanElement>,
) {
  const { ownerState, className = '', children, ...other } = props;
  return (
    <span
      className={`${className} ring-cyan-500 dark:ring-cyan-400 ring-2 w-4 h-4 -mt-1 -ml-2 flex items-center justify-center bg-white rounded-full shadow absolute`}
      {...other}
      ref={ref}
    >
      <span className="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5" />
      {children}
    </span>
  );
});

const Slider = React.forwardRef(function Slider(
  props: SliderUnstyledProps,
  ref: React.ForwardedRef<HTMLSpanElement>,
) {
  return (
    <SliderUnstyled
      {...props}
      ref={ref}
      components={{
        Thumb,
      }}
      componentsProps={{
        root: { className: 'w-full relative inline-block h-2 cursor-pointer' },
        rail: {
          className: 'bg-slate-100 dark:bg-slate-700 h-2 w-full rounded-full block absolute',
        },
        track: { className: 'bg-cyan-500 dark:bg-cyan-400 h-2 absolute rounded-full' },
      }}
    />
  );
});

export default Slider;
