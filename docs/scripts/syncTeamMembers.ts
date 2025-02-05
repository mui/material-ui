/* eslint-disable no-console */
import url from 'url';
import * as fs from 'fs/promises';
import path from 'path';

async function run() {
  // Same as https://tools-public.mui.com/prod/pages/muicomabout
  const response = await fetch(
    'https://tools-public.mui.com/prod/api/data/muicomabout/queryAbout',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    },
  );
  const apiResponse = await response.json();

  const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));

  await fs.writeFile(
    path.resolve(currentDirectory, '../data/about/teamMembers.json'),
    JSON.stringify(apiResponse.data),
    'utf8',
  );

  console.log('done');
}

run();
