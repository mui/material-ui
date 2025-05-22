'use client';

export default function MUISymbols{{{variation}}}GoogleFont({ icons }) {
  const iconNames = icons.join(',')
  return <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?family=Material+Symbols+{{theme}}:opsz,wght,FILL,GRAD@20..48,{{weight}},0..1,-25..200${iconNames ? `&icon_names=${iconNames}` : ''}`} />
}
