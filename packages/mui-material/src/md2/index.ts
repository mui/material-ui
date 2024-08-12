import { alpha } from '@mui/system/colorManipulator';
import { buttonClasses } from '../Button';
import ButtonBase from '../ButtonBase';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';

const ButtonMd2 = styled(ButtonBase)(
  memoTheme(({ theme }) => {
    const inheritContainedBackgroundColor =
      theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800];

    const inheritContainedHoverBackgroundColor =
      theme.palette.mode === 'light' ? theme.palette.grey.A100 : theme.palette.grey[700];
    return {
      minWidth: 64,
      padding: '6px 16px',
      border: 0,
      '&:hover': {
        textDecoration: 'none',
      },
      ...theme.typography.button,
      borderRadius: (theme.vars || theme).shape.borderRadius,
      transition: theme.transitions.create(
        ['background-color', 'box-shadow', 'border-color', 'color'],
        {
          duration: theme.transitions.duration.short,
        },
      ),
      [`&.${buttonClasses.disabled}`]: {
        color: (theme.vars || theme).palette.action.disabled,
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            color: `var(--variant-containedColor)`,
            backgroundColor: `var(--variant-containedBg)`,
            boxShadow: (theme.vars || theme).shadows[2],
            '&:hover': {
              boxShadow: (theme.vars || theme).shadows[4],
              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                boxShadow: (theme.vars || theme).shadows[2],
              },
            },
            '&:active': {
              boxShadow: (theme.vars || theme).shadows[8],
            },
            [`&.${buttonClasses.focusVisible}`]: {
              boxShadow: (theme.vars || theme).shadows[6],
            },
            [`&.${buttonClasses.disabled}`]: {
              color: (theme.vars || theme).palette.action.disabled,
              boxShadow: (theme.vars || theme).shadows[0],
              backgroundColor: (theme.vars || theme).palette.action.disabledBackground,
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            padding: '5px 15px',
            border: '1px solid currentColor',
            borderColor: `var(--variant-outlinedBorder, currentColor)`,
            backgroundColor: `var(--variant-outlinedBg)`,
            color: `var(--variant-outlinedColor)`,
            [`&.${buttonClasses.disabled}`]: {
              border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`,
            },
          },
        },
        {
          props: { variant: 'text' },
          style: {
            padding: '6px 8px',
            color: `var(--variant-textColor)`,
            backgroundColor: `var(--variant-textBg)`,
          },
        },
        ...Object.entries(theme.palette)
          .filter(([, palette]) => palette && palette.main && palette.dark && palette.contrastText)
          .map(([color]) => ({
            props: { color },
            style: {
              '--variant-textColor': (theme.vars || theme).palette[color].main,
              '--variant-outlinedColor': (theme.vars || theme).palette[color].main,
              '--variant-outlinedBorder': theme.vars
                ? `rgba(${theme.vars.palette[color].mainChannel} / 0.5)`
                : alpha(theme.palette[color].main, 0.5),
              '--variant-containedColor': (theme.vars || theme).palette[color].contrastText,
              '--variant-containedBg': (theme.vars || theme).palette[color].main,
              '@media (hover: hover)': {
                '&:hover': {
                  '--variant-containedBg': (theme.vars || theme).palette[color].dark,
                  '--variant-textBg': theme.vars
                    ? `rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})`
                    : alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
                  '--variant-outlinedBorder': (theme.vars || theme).palette[color].main,
                  '--variant-outlinedBg': theme.vars
                    ? `rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})`
                    : alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
                },
              },
            },
          })),
        {
          props: {
            color: 'inherit',
          },
          style: {
            '--variant-containedColor': theme.vars
              ? // this is safe because grey does not change between default light/dark mode
                theme.vars.palette.text.primary
              : theme.palette.getContrastText?.(inheritContainedBackgroundColor),
            '--variant-containedBg': theme.vars
              ? theme.vars.palette.Button.inheritContainedBg
              : inheritContainedBackgroundColor,
            '@media (hover: hover)': {
              '&:hover': {
                '--variant-containedBg': theme.vars
                  ? theme.vars.palette.Button.inheritContainedHoverBg
                  : inheritContainedHoverBackgroundColor,
                '--variant-textBg': theme.vars
                  ? `rgba(${theme.vars.palette.text.primaryChannel} / ${theme.vars.palette.action.hoverOpacity})`
                  : alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
                '--variant-outlinedBg': theme.vars
                  ? `rgba(${theme.vars.palette.text.primaryChannel} / ${theme.vars.palette.action.hoverOpacity})`
                  : alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
              },
            },
          },
        },
        {
          props: {
            size: 'small',
            variant: 'text',
          },
          style: {
            padding: '4px 5px',
            fontSize: theme.typography.pxToRem(13),
          },
        },
        {
          props: {
            size: 'large',
            variant: 'text',
          },
          style: {
            padding: '8px 11px',
            fontSize: theme.typography.pxToRem(15),
          },
        },
        {
          props: {
            size: 'small',
            variant: 'outlined',
          },
          style: {
            padding: '3px 9px',
            fontSize: theme.typography.pxToRem(13),
          },
        },
        {
          props: {
            size: 'large',
            variant: 'outlined',
          },
          style: {
            padding: '7px 21px',
            fontSize: theme.typography.pxToRem(15),
          },
        },
        {
          props: {
            size: 'small',
            variant: 'contained',
          },
          style: {
            padding: '4px 10px',
            fontSize: theme.typography.pxToRem(13),
          },
        },
        {
          props: {
            size: 'large',
            variant: 'contained',
          },
          style: {
            padding: '8px 22px',
            fontSize: theme.typography.pxToRem(15),
          },
        },
        {
          props: {
            disableElevation: true,
          },
          style: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
            [`&.${buttonClasses.focusVisible}`]: {
              boxShadow: 'none',
            },
            '&:active': {
              boxShadow: 'none',
            },
            [`&.${buttonClasses.disabled}`]: {
              boxShadow: 'none',
            },
          },
        },
        {
          props: { fullWidth: true },
          style: { width: '100%' },
        },
      ],
    };
  }),
);

const slots = {
  MuiButton: {
    slots: {
      root: ButtonMd2,
    },
  },
  // MuiTextField: {
  //  slots: {
  //    root: TextFieldRoot,
  //  },
};

export default slots;
