// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react';
import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import { css } from '@pigment-css/react';
import Box from '@pigment-css/react/Box';

export default async function MaterialUIPage() {
  const rootPaths = await fs.readdir(path.join(process.cwd(), `src/app/material-ui`));
  return (
    <div>
      <h1>Material UI Components</h1>
      <nav>
        <Box
          as="ul"
          sx={{
            margin: 0,
            marginBlock: '1rem',
            padding: 0,
            paddingLeft: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          {rootPaths
            .filter((item) => !item.match(/\.(js|tsx)$/))
            .map((file) => (
              <li key={file}>
                <Link
                  href={`/material-ui/${file.replace(/\.[jt]sx?$/, '')}`}
                  className={css({
                    textDecoration: 'underline',
                    fontSize: '17px',
                  })}
                >
                  {file}
                </Link>
              </li>
            ))}
        </Box>
      </nav>
    </div>
  );
}
