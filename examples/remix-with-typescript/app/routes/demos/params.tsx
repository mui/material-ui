import { useCatch, Link, json, useLoaderData, Outlet } from 'remix';

export function meta() {
  return { title: 'Boundaries Demo' };
}

export default function Boundaries() {
  return (
    <div className="remix__page">
      <main>
        <Outlet />
      </main>

      <aside>
        <h2>Click these Links</h2>
        <ul>
          <li>
            <Link to=".">Start over</Link>
          </li>
          <li>
            <Link to="one">
              Param: <i>one</i>
            </Link>
          </li>
          <li>
            <Link to="two">
              Param: <i>two</i>
            </Link>
          </li>
          <li>
            <Link to="this-record-does-not-exist">This will be a 404</Link>
          </li>
          <li>
            <Link to="shh-its-a-secret">And this will be 401 Unauthorized</Link>
          </li>
          <li>
            <Link to="kaboom">This one will throw an error</Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}
