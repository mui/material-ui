import * as React from 'react';
import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json, Link } from 'remix';
import Typography from '@mui/material/Typography';

type IndexData = {
  resources: Array<{ name: string; url: string }>;
  demos: Array<{ name: string; to: string }>;
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export const loader: LoaderFunction = () => {
  const data: IndexData = {
    resources: [
      {
        name: 'Remix Docs',
        url: 'https://remix.run/docs',
      },
      {
        name: 'React Router Docs',
        url: 'https://reactrouter.com/docs',
      },
      {
        name: 'Remix Discord',
        url: 'https://discord.gg/VBePs6d',
      },
    ],
    demos: [
      {
        to: 'demos/actions',
        name: 'Actions',
      },
      {
        to: 'demos/about',
        name: 'Nested Routes, CSS loading/unloading',
      },
      {
        to: 'demos/params',
        name: 'URL Params and Error Boundaries',
      },
    ],
  };

  // https://remix.run/api/remix#json
  return json(data);
};

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: 'Remix Starter',
    description: 'Welcome to remix!',
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const data = useLoaderData<IndexData>();

  return (
    <div className="remix__page">
      <main>
        <Typography variant="h4" component="h2" color="primary.main" gutterBottom>
          Welcome to Remix + MUI!
        </Typography>
        <Typography gutterBottom>
          This project is created using <code>npx create-remix@latest</code>
        </Typography>
        <Typography gutterBottom>
          Feel free to take a look around the code to see how Remix does things, it might be a bit
          different than what you&apos;re used to. When you&apos;re ready to dive deeper, we&apos;ve
          got plenty of resources to get you up-and-running quickly.
        </Typography>
        <Typography gutterBottom>
          Check out all the demos in this starter, and then just deconste the{' '}
          <code>app/routes/demos</code> and <code>app/styles/demos</code> folders when you&apos;re ready
          to turn this into your next project.
        </Typography>
      </main>
      <aside>
        <h2>Demos In This App</h2>
        <ul>
          {data.demos.map((demo) => (
            <li key={demo.to} className="remix__page__resource">
              <Link to={demo.to} prefetch="intent">
                {demo.name}
              </Link>
            </li>
          ))}
        </ul>
        <h2>Resources</h2>
        <ul>
          {data.resources.map((resource) => (
            <li key={resource.url} className="remix__page__resource">
              <a href={resource.url}>{resource.name}</a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
