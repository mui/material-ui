import * as ts from 'typescript';
import fs from 'fs';
import path from 'path';

export function loadConfig(tsConfigPath: string) {
  const { config, error } = ts.readConfigFile(tsConfigPath, filePath =>
    fs.readFileSync(filePath).toString(),
  );

  if (error) throw error;

  const { options, errors } = ts.parseJsonConfigFileContent(
    config,
    ts.sys,
    path.dirname(tsConfigPath),
  );

  if (errors.length > 0) throw errors[0];

  return options;
}
