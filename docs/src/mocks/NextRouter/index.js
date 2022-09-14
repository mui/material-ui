export function useRouter() {
  return {
    route: '',
    pathname: '',
    query: {},
    asPath: '',
    basePath: '',
    locale: 'en',
    locales : [],
    defaultLocale : 'en',
    domainLocales : [],
    isLocaleDomain: false,
    events: {
      on: () => {},
      off: () => {},
    },
  }
}

const Router = {
  push: () => {},
};

export default Router;
