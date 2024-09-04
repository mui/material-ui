import * as React from 'react';
import { useLocation, matchRoutes, Link } from 'react-router-dom';
import routes from '~react-pages';
import IndexLayout from '../../Layout';

export default function Layout() {
  const location = useLocation();
  const matchedRoute = React.useMemo(
    () => matchRoutes(routes, location.pathname)?.[0],
    [location.pathname],
  );

  const materialUIRoute = React.useMemo(
    () => matchRoutes(routes, location.pathname.replace('fixtures', 'material-ui'))?.[0],
    [location.pathname],
  );

  const demo = new URLSearchParams(location.search).get('demo');
  const fixturesRoutes = (matchedRoute?.route.children ?? []).filter(
    (item) => !!item.path && item.path !== 'index.test' && item.path !== 'layout',
  );

  const demosRoutes = (materialUIRoute?.route.children ?? []).filter(
    (item) => !!item.path && item.path !== 'index.test' && item.path !== 'layout',
  );

  return (
    <IndexLayout>
      {demo && (
        <div id="root-demo">
          {fixturesRoutes.find((item) => item.path === demo)?.element}
          {demosRoutes.find((item) => item.path === demo)?.element}
        </div>
      )}
      <div>
        <h1>Fixtures Material UI + Pigment CSS</h1>
        <nav id="tests">
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
            {fixturesRoutes.map((item) => (
              <li key={item.path}>
                <Link
                  to={`/fixtures/?demo=${item.path}`}
                  sx={{
                    textDecoration: 'underline',
                    fontSize: '17px',
                  }}
                >
                  {item.path}
                </Link>
              </li>
            ))}
            {demosRoutes.map((item) => (
              <li key={item.path}>
                <Link
                  to={`/fixtures/?demo=${item.path}`}
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
    </IndexLayout>
  );
}
