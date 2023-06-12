const sleek = {
  // tokens
  '--border-width': '1px',
  '--border-color': 'var(--muidocs-palette-grey-200)',
  '--border-radius': '12px',
  '--color-primary': 'var(--muidocs-palette-primary-main)',
  // components
  '--Panel-shadow': '0 4px 40px 0 rgba(62, 80, 96, 0.15)',
  '--Select-radius': '12px',
  '--Select-spacing': '12px',
};

const retro = {
  // tokens
  '--border-width': '1px',
  '--border-color': 'var(--muidocs-palette-grey-500)',
  '--color-primary': 'var(--muidocs-palette-primary-main)',
  // components
  '--Panel-shadow': '-8px 8px 0 0 #3E5060',
  '--TabsList-background': 'var(--muidocs-palette-primary-50)',
  '--Select-radius': '0px',
  '--Select-spacing': '12px',
  '--Select-background': 'var(--muidocs-palette-grey-50)',
  '& *': {
    fontFamily: 'Menlo,Consolas,"Droid Sans Mono",monospace',
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
  '--TabsList-background': 'var(--muidocs-palette-primary-50)',
  '& *': {
    fontFamily: 'Poppins, sans-serif',
  },
};

export default [sleek, retro, playful];
