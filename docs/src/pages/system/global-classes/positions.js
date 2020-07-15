const values = Array.from(Array(17).keys()); // 0..16

export default function positions(theme) {
  const positions = {
    '.position-static': { position: 'static' },
    '.position-absolute': { position: 'absolute' },
    '.position-fixed': { position: 'fixed' },
    '.position-relative': { position: 'relative' },
    '.position-sticky': { position: 'sticky' },
    '.position-initial': { position: 'initial' },
    '.position-inherit': { position: 'inherit' },
  };

  values.forEach((val) => {
    positions[`.top-${val}`] = {
      top: theme.spacing(val / 2),
    };
    positions[`.bottom-${val}`] = {
      bottom: theme.spacing(val / 2),
    };
    positions[`.right-${val}`] = {
      right: theme.spacing(val / 2),
    };
    positions[`.left-${val}`] = {
      left: theme.spacing(val / 2),
    };
  });

  Object.keys(theme.zIndex).forEach((key) => {
    positions[`.zIndex-${key}`] = {
      zIndex: theme.zIndex[key],
    };
  });

  return positions;
}
