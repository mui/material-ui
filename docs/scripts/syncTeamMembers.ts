/* eslint-disable no-console */
import url from 'url';
import * as fs from 'fs/promises';
import path from 'path';

async function run() {
  const response = await fetch('https://frontend-public.mui.com/api/mui-about');
  const { people } = await response.json();

  const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));

  await fs.writeFile(
    path.resolve(currentDirectory, '../data/about/teamMembers.json'),
    JSON.stringify(people),
    'utf8',
  );

  console.log('done');
}

run();
