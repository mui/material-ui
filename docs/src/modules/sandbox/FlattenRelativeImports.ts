export default function flattenRelativeImports(rawCode: string, modulePaths: string[] = []) {
  let newCode = rawCode;
  modulePaths.forEach((path: string) => {
    const pathWithoutExtension = path.replace(/\.[a-z]*$/g, '');
    // Move the relative import to the current directory
    const newPath = `./${pathWithoutExtension.replace(/^.*[\\/]/g, '')}`;
    newCode = newCode.replace(pathWithoutExtension, newPath);

    // Replace the relative import towards parent directory
    newCode = newCode.replace('../', './');
  });
  return newCode;
}
