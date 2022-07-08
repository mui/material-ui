export default function extractTemplates(record: Record<string, string>) {
  const result: Record<string, { files: Record<string, string>; codeVariant: 'JS' | 'TS' }> = {};
  Object.entries(record).forEach((data) => {
    const match = /\/(?<name>[^/]+)\/(?<filePath>.*)/.exec(data[0]);
    if (match) {
      const name = match.groups?.name;
      const filePath = match.groups?.filePath;
      if (name && filePath) {
        if (!result[name]) {
          result[name] = { files: {}, codeVariant: 'JS' };
        }
        if (filePath.match(/\.(ts|tsx)$/)) {
          result[name].codeVariant = 'TS';
        }
        result[name].files[filePath] = data[1];
      }
    }
  });
  return result;
}
