const templateMap = new Map<string, { files: Record<string, string>; codeVariant: 'TS' | 'JS' }>();
// @ts-ignore
const req = require.context(
  '../../../data/joy/getting-started/templates/?raw',
  true,
  /^\.\/[^/]+\/.*\.(js|tsx|ts)$/,
);
req.keys().forEach((key: string) => {
  const match = /\/(?<name>[^/]+)\/(?<filePath>.*)/.exec(key);
  if (match) {
    const name = match.groups?.name;
    const filePath = match.groups?.filePath;
    if (name && filePath) {
      const { files, codeVariant } = templateMap.get(name) || {};
      templateMap.set(name, {
        files: { ...files, [filePath]: req(key) },
        codeVariant: filePath.match(/\.(ts|tsx)$/) ? 'TS' : codeVariant || 'JS',
      });
    }
  }
});

export interface TemplateData {
  files: Record<string, string>;
  codeVariant: 'TS' | 'JS';
}

export default function sourceJoyTemplates() {
  return {
    names: Array.from(templateMap.keys()),
    templates: Array.from(templateMap.values()),
    map: new Map(templateMap),
  };
}
