import kebabCase from 'lodash/kebabCase';
import { ComponentReactApi, HookReactApi } from '@mui-internal/api-docs-builder';

/**
 * Generates the api links, in a format that would point to the appropriate API tab
 */
export function generateApiLinks(
  builds: PromiseSettledResult<ComponentReactApi | HookReactApi | never[] | null>[],
) {
  const apiLinks: { pathname: string; title: string }[] = [];

  builds.forEach((build) => {
    if (build.status !== 'fulfilled' || build.value === null) {
      return;
    }

    const { value } = build as PromiseFulfilledResult<ComponentReactApi | HookReactApi>;
    // find a potential # in the pathname
    const hashIdx = value.demos.length > 0 ? value.demos[0].demoPathname.indexOf('#') : -1;

    let pathname = null;

    if (value.demos.length > 0) {
      // make sure the pathname doesn't contain #
      pathname =
        hashIdx >= 0 ? value.demos[0].demoPathname.substr(0, hashIdx) : value.demos[0].demoPathname;
    }

    if (pathname !== null) {
      // add the new apiLink, where pathame is in format of /react-component/components-api
      apiLinks.push({
        pathname: `${pathname}${
          value.name.startsWith('use') ? 'hooks-api' : 'components-api'
        }/#${kebabCase(value.name)}`,
        title: value.name,
      });
    }
  });

  apiLinks.sort((a, b) => (a.title > b.title ? 1 : -1));
  return apiLinks;
}
