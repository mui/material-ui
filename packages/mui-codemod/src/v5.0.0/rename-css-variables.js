const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * @param {import('jscodeshift').FileInfo} file
 */
export default function transformer(file) {
  return (
    file.source
      // from `--<Component>-<slot>-<property>` to `--<Component>-<slot><Property>`
      .replace(/--([a-zA-Z]+)-([a-zA-Z]+)-([a-zA-Z]+)/gm, (_, capture1, capture2, capture3) => {
        // turn `--List-item-...` and `--List-divider-...` to `--ListItem-...` and `--ListDivider-...` 
        if (capture1 === 'List' && ['divider', 'item'].includes(capture2)) {
          return `--${capture1}${capitalize(capture2)}-${capture3}`;
        }
        return `--${capture1}-${capture2}${capitalize(capture3)}`;
      })
      // from `--internal-...` to `--unstable_...`
      .replace(/--internal-/gm, '--unstable_')
  );
}
