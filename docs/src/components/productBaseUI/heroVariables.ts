const sleek = {
  // tokens
  '--color-primary': 'var(--muidocs-palette-primary-main)',
  '--color-primary-light': 'var(--muidocs-palette-primary-100)',
  '--border-width': '1px',
  '--border-color': 'var(--muidocs-palette-grey-200)',
  '--border-radius': '8px',
  '--avatar-radius': '99px',
  // components
  '--Panel-shadow': '0 4px 40px 0 rgba(62, 80, 96, 0.15)',
  '--Tab-hoverBackground': 'var(--muidocs-palette-grey-50)',
  '--Select-radius': '12px',
  '--Select-spacing': '12px',
  '--Input-border': 'var(--muidocs-palette-primary-400)',
  '--Input-focus-border': '0 0 0 3px var(--muidocs-palette-primary-200)',
  '--Slider-thumb-focus': 'rgba(0, 127, 255, 0.2)',
  '--formControl-shadow': '0px 2px 2px rgb(205 210 215 / 20%)',
  '[data-mui-color-scheme="dark"] &': {
    // dark tokens
    '--color-primary': 'var(--muidocs-palette-primary-light)',
    '--color-primary-light': 'var(--muidocs-palette-primaryDark-600)',
    '--border-color': 'var(--muidocs-palette-primaryDark-700)',
    '--formControl-shadow': '0px 2px 2px rgb(0 0 0 / 80%)',
    // dark components
    '--Panel-shadow': '0 4px 40px 0 rgba(0, 0, 0, 0.15)',
    '--Select-background': 'var(--muidocs-palette-primaryDark-800)',
    '--Tab-hoverBackground': 'var(--muidocs-palette-primaryDark-700)',
    '--Option-selectedBackground': 'var(--muidocs-palette-primaryDark-800)',
    '--Option-hoverBackground': 'var(--muidocs-palette-grey-900)',
    '--Switch-background': 'var(--muidocs-palette-grey-700)',
    '--Input-border': '0px 2px 2px var(--muidocs-palette-primary-dark)',
    '--Input-focus-border': '0 0 0 3px var(--muidocs-palette-primary-600)',
    '--Slider-thumb-focus': 'rgba(0, 127, 255, 0.6)',
  },
};

const retro = {
  // tokens
  '--color-primary': 'var(--muidocs-palette-primary-main)',
  '--color-primary-light': 'var(--muidocs-palette-primary-100)',
  '--border-width': '1px',
  '--border-color': 'var(--muidocs-palette-grey-900)',
  '--avatar-radius': '2px',
  // components
  '--Panel-shadow': '-8px 8px 0 0 var(--muidocs-palette-grey-800)',
  '--Tab-background': 'var(--muidocs-palette-primary-50)',
  '--Tab-hoverBackground': 'var(--muidocs-palette-grey-100)',
  '--Select-radius': '0px',
  '--Select-spacing': '12px',
  '--Select-background': 'var(--muidocs-palette-grey-50)',
  '--Input-border': 'var(--muidocs-palette-primary-400)',
  '--Input-focus-border': '0 0 0 3px var(--muidocs-palette-primary-200)',
  '--Slider-thumb-focus': 'rgba(0, 127, 255, 0.2)',
  '& *': {
    fontFamily: 'Menlo,Consolas,"Droid Sans Mono",monospace',
  },
  '[data-mui-color-scheme="dark"] &': {
    // dark tokens
    '--color-primary': 'var(--muidocs-palette-primary-light)',
    '--color-primary-light': 'var(--muidocs-palette-primaryDark-600)',
    '--border-color': 'var(--muidocs-palette-primaryDark-500)',
    '--formControl-shadow': '0px 2px 2px rgb(0 0 0 / 80%)',
    // dark components
    '--Panel-shadow': '-8px 8px 0 0 var(--muidocs-palette-primaryDark-700)',
    '--Tab-background': 'var(--muidocs-palette-grey-800)',
    '--Tab-hoverBackground': 'var(--muidocs-palette-grey-700)',
    '--Select-background': 'var(--muidocs-palette-grey-900)',
    '--Option-selectedBackground': 'var(--muidocs-palette-grey-800)',
    '--Option-hoverBackground': 'var(--muidocs-palette-grey-900)',
    '--Switch-background': 'var(--muidocs-palette-grey-700)',
    '--Input-border': '0px 2px 2px var(--muidocs-palette-primary-dark)',
    '--Input-focus-border': '0 0 0 3px var(--muidocs-palette-primary-600)',
    '--Slider-thumb-focus': 'rgba(0, 127, 255, 0.6)',
  },
};

const playful = {
  // tokens
  '--color-primary': 'var(--muidocs-palette-primary-main)',
  '--color-primary-light': 'var(--muidocs-palette-primary-100)',
  '--border-radius': '24px',
  '--border-width': '2px',
  '--border-color': 'var(--muidocs-palette-primary-200)',
  '--avatar-radius': '999px',
  // components
  '--Panel-shadow': '0 4px 40px 0 rgba(51, 153, 255, 0.2)',
  '--Select-spacing': '12px',
  '--Select-ringColor': 'var(--muidocs-palette-grey-400)',
  '--Option-selectedBackground': 'var(--muidocs-palette-primary-50)',
  '--Tab-background': 'var(--muidocs-palette-primary-50)',
  '--Tab-hoverBackground': 'var(--muidocs-palette-primary-100)',
  '--Input-border': 'var(--muidocs-palette-primary-400)',
  '--Input-focus-border': '0 0 0 3px var(--muidocs-palette-primary-200)',
  '--Slider-thumb-focus': 'rgba(0, 127, 255, 0.2)',
  '& *': {
    fontFamily: 'Poppins, sans-serif',
  },
  '[data-mui-color-scheme="dark"] &': {
    // dark tokens
    '--color-primary': 'var(--muidocs-palette-primary-light)',
    '--color-primary-light': 'var(--muidocs-palette-primaryDark-600)',
    '--border-color': 'var(--muidocs-palette-primary-700)',
    '--formControl-shadow': '0px 2px 2px rgb(0 0 0 / 80%)',
    // dark components
    '--Tab-background': 'var(--muidocs-palette-primary-900)',
    '--Tab-hoverBackground': 'var(--muidocs-palette-primary-800)',
    '--Select-ringColor': 'var(--muidocs-palette-grey-700)',
    '--Option-selectedBackground': 'var(--muidocs-palette-primary-900)',
    '--Option-hoverBackground': 'var(--muidocs-palette-grey-900)',
    '--Switch-background': 'var(--muidocs-palette-grey-700)',
    '--Input-border': '0px 2px 2px var(--muidocs-palette-primary-dark)',
    '--Input-focus-border': '0 0 0 3px var(--muidocs-palette-primary-600)',
    '--Slider-thumb-focus': 'rgba(0, 127, 255, 0.6)',
  },
};

export default [sleek, retro, playful];
