const sleek = {
  // tokens
  '--border-width': '1px',
  '--border-color': 'var(--muidocs-palette-grey-200)',
  '--border-radius': '12px',
  '--color-primary': 'var(--muidocs-palette-primary-main)',
  // components
  '--Panel-shadow': '0 4px 40px 0 rgba(62, 80, 96, 0.15)',
  '--Tab-hoverBackground': 'var(--muidocs-palette-grey-50)',
  '--Select-radius': '12px',
  '--Select-spacing': '12px',
  '[data-mui-color-scheme="dark"] &': {
    // dark tokens
    '--border-color': 'var(--muidocs-palette-grey-700)',
    '--color-primary': 'var(--muidocs-palette-primary-light)',
    '--formControl-shadow': '0px 2px 2px rgb(40 71 100 / 30%)',
    // dark components
    '--Tab-hoverBackground': 'var(--muidocs-palette-grey-800)',
    '--Option-selectedBackground': 'var(--muidocs-palette-grey-800)',
    '--Option-hoverBackground': 'var(--muidocs-palette-grey-900)',
    '--Switch-background': 'var(--muidocs-palette-grey-700)',
  },
};

const retro = {
  // tokens
  '--border-width': '1px',
  '--border-color': 'var(--muidocs-palette-grey-500)',
  '--color-primary': 'var(--muidocs-palette-primary-main)',
  // components
  '--Panel-shadow': '-8px 8px 0 0 #3E5060',
  '--Tab-background': 'var(--muidocs-palette-primary-50)',
  '--Tab-hoverBackground': 'var(--muidocs-palette-grey-100)',
  '--Select-radius': '0px',
  '--Select-spacing': '12px',
  '--Select-background': 'var(--muidocs-palette-grey-50)',
  '& *': {
    fontFamily: 'Menlo,Consolas,"Droid Sans Mono",monospace',
  },
  '[data-mui-color-scheme="dark"] &': {
    // dark tokens
    '--color-primary': 'var(--muidocs-palette-primary-light)',
    '--border-color': 'var(--muidocs-palette-grey-700)',
    '--formControl-shadow': '0px 2px 2px rgb(40 71 100 / 30%)',
    // dark components
    '--Tab-background': 'var(--muidocs-palette-grey-800)',
    '--Tab-hoverBackground': 'var(--muidocs-palette-grey-700)',
    '--Select-background': 'var(--muidocs-palette-grey-900)',
    '--Option-selectedBackground': 'var(--muidocs-palette-grey-800)',
    '--Option-hoverBackground': 'var(--muidocs-palette-grey-900)',
    '--Switch-background': 'var(--muidocs-palette-grey-700)',
  },
};

const playful = {
  // tokens
  '--color-primary': 'var(--muidocs-palette-primary-main)',
  '--border-radius': '999px',
  '--border-width': '2px',
  '--border-color': 'var(--muidocs-palette-primary-200)',
  // components
  '--Panel-shadow': '0 4px 40px 0 rgba(51, 153, 255, 0.2)',
  '--Select-spacing': '12px',
  '--Select-ringColor': 'var(--muidocs-palette-grey-400)',
  '--Option-selectedBackground': 'var(--muidocs-palette-primary-50)',
  '--Tab-background': 'var(--muidocs-palette-primary-50)',
  '--Tab-hoverBackground': 'var(--muidocs-palette-primary-100)',
  '& *': {
    fontFamily: 'Poppins, sans-serif',
  },
  '[data-mui-color-scheme="dark"] &': {
    // dark tokens
    '--color-primary': 'var(--muidocs-palette-primary-light)',
    '--border-color': 'var(--muidocs-palette-primary-700)',
    '--formControl-shadow': '0px 2px 2px rgb(40 71 100 / 30%)',
    // dark components
    '--Tab-background': 'var(--muidocs-palette-primary-900)',
    '--Tab-hoverBackground': 'var(--muidocs-palette-primary-800)',
    '--Select-ringColor': 'var(--muidocs-palette-grey-700)',
    '--Option-selectedBackground': 'var(--muidocs-palette-primary-900)',
    '--Option-hoverBackground': 'var(--muidocs-palette-grey-900)',
    '--Switch-background': 'var(--muidocs-palette-grey-700)',
  },
};

export default [sleek, retro, playful];
