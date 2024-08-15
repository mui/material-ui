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
  const childRoutes = matchedRoute?.route.children ?? [];

  return (
    <IndexLayout>
      {props.children && <div id="root-demo">{props.children}</div>}
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
            {childRoutes
              .filter((item) => !!item.path && item.path !== 'index.test' && item.path !== 'layout')
              .map((item) => (
                <li key={item.path}>
                  <Link
                    to={`/fixtures/${item.path}`}
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
