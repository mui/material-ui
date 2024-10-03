import * as React from 'react';
import { useLocation, matchRoutes, Link } from 'react-router-dom';
import webfontloader from 'webfontloader';
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
  const fixturesRoutes = (matchedRoute?.route.children ?? []).filter((item) => !!item.path);

  const demosRoutes = (materialUIRoute?.route.children ?? []).filter(
    (item) => !!item.path && !item.path.includes('react-pagination'),
  );

  const [fontState, setFontState] = React.useState('pending');
  React.useEffect(() => {
    webfontloader.load({
      google: {
        families: ['Roboto:300,400,500,700', 'Inter:300,400,500,600,700,800,900', 'Material+Icons'],
      },
      custom: {
        families: ['Font Awesome 5 Free:n9'],
        urls: ['https://use.fontawesome.com/releases/v5.14.0/css/all.css'],
      },
      timeout: 20000,
      active: () => {
        setFontState('active');
      },
      inactive: () => {
        setFontState('inactive');
      },
    });
  }, []);

  const fixturePrepared = fontState === 'active';

  return (
    <IndexLayout>
      {demo && fixturePrepared && (
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
