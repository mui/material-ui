import * as React from 'react';
import { useLocation, matchRoutes, Link } from 'react-router-dom';
import routes from '~react-pages';
import IndexLayout from '../../Layout';

export default function Layout(props: { children?: React.ReactNode }) {
  const location = useLocation();
  const matchedRoute = React.useMemo(
    () => matchRoutes(routes, location.pathname)?.[0],
    [location.pathname],
  );

  const demo = new URLSearchParams(location.search).get('demo');
  const childRoutes = (matchedRoute?.route.children ?? []).filter(
    (item) => !!item.path && item.path !== 'index.test' && item.path !== 'layout',
  );

  return (
    <IndexLayout>
      {demo && <div id="root-demo">{childRoutes.find((item) => item.path === demo)?.element}</div>}
      <div>
        <h1>Fixtures Material UI + PIgment CSS</h1>
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
            {childRoutes.map((item) => (
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
