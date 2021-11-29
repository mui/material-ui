import { useCatch, Link, json, useLoaderData, Outlet } from "remix";
import type { LoaderFunction } from "remix";

export default function Boundaries() {
  return (
    <>
      <h2>Params</h2>
      <p>
        When you name a route segment with $ like{" "}
        <code>routes/users/$userId.js</code>, the $ segment will be parsed from
        the URL and sent to your loaders and actions by the same name.
      </p>
      <h2>Errors</h2>
      <p>
        When a route throws and error in it's action, loader, or component,
        Remix automatically catches it, won't even try to render the component,
        but it will render the route's ErrorBoundary instead. If the route
        doesn't have one, it will bubble up to the routes above it until it hits
        the root.
      </p>
      <p>So be as granular as you want with your error handling.</p>
      <h2>Not Found</h2>
      <p>
        (and other{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses">
          client errors
        </a>
        )
      </p>
      <p>
        Loaders and Actions can throw a <code>Response</code> instead of an
        error and Remix will render the CatchBoundary instead of the component.
        This is great when loading data from a database isn't found. As soon as
        you know you can't render the component normally, throw a 404 response
        and send your app into the catch boundary. Just like error boundaries,
        catch boundaries bubble, too.
      </p>
    </>
  );
}
