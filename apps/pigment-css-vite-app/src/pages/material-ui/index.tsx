import * as React from 'react';
import { useLocation, matchRoutes, Link } from 'react-router-dom';
import routes from '~react-pages';
import Layout from '../../Layout';

export default function MaterialIndex() {
  const location = useLocation();
  const matchedRoute = React.useMemo(
    () => matchRoutes(routes, location.pathname)?.[0],
    [location.pathname],
  );
  const childRoutes = matchedRoute?.route.children ?? [];

  return (
    <Layout>
      <div>
        <h1>Material UI Components</h1>
        <nav>
          <ul
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
            {childRoutes
              .filter((item) => !!item.path)
              .map((item) => (
                <li key={item.path}>
                  <Link
                    to={`/material-ui/${item.path}`}
                    sx={{
                      textDecoration: 'underline',
                      fontSize: '17px',
                    }}
                  >
                    {item.path}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </Layout>
  );
}
