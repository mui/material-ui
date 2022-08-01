/* eslint-disable no-template-curly-in-string */
/**
 * @param {import('jscodeshift').FileInfo} file
 */
export default function transformer(file) {
  return file.source
    .replace(
      // handle cases like: `-${theme.spacing(1)}px`
      /`(-?)\${(-?)(theme\.spacing|spacing)\(([^{}]*)\)}px`/gm,
      '$3($1$2$4)',
    )
    .replace(
      // handle cases like: theme.spacing(gap) + 'px'
      /((theme\.spacing|spacing)\(.*\))\s*\+\s*'px'/gm,
      '$1',
    )
    .replace(
      // handle cases like: theme.spacing(gap) + "px"
      /((theme\.spacing|spacing)\(.*\))\s*\+\s*"px"/gm,
      '$1',
    )
    .replace(
      // handle cases like: `calc(${theme.spacing(2)} - 1px) 0`
      /\${(theme\.spacing|spacing)(\([^)]+\))\s*([+-])\s*([\d.]+)\s*}px/gm,
      'calc(${$1$2} $3 $4px)',
    )
    .replace(
      // handle cases like: calc(${theme.spacing(itemHorzPadding)} * 0.3)
      /\${(theme\.spacing|spacing)(\([^)]+\))\s*([*/])\s*([\d.]+)\s*}px/gm,
      'calc(${$1$2} $3 $4)',
    )
    .replace(
      // handle common cases like:
      // `${theme.spacing(2)}px`
      // `${theme.spacing(2)}px ${theme.spacing(1)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`
      /(spacing\([^)]+\)\})px(.)/gm,
      '$1$2',
    );
}
