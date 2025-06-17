/**
 * See the docs of the Netlify environment variables:
 * https://docs.netlify.com/configure-builds/environment-variables/#build-metadata.
 *
 * A few comments:
 * - process.env.CONTEXT === 'production' means that the branch in Netlify was configured as production.
 *   For example, the `master` branch of the Core team is considered a `production` build on Netlify based
 *   on https://app.netlify.com/sites/material-ui/settings/deploys#branches.
 * - Each team has different site https://app.netlify.com/teams/mui/sites.
 *   The following logic must be compatible with all of them.
 */
import { NextConfig } from 'next';
import { EnvironmentPlugin } from 'webpack';

let DEPLOY_ENV = 'development';

// Same as process.env.PULL_REQUEST_ID
if (process.env.CONTEXT === 'deploy-preview') {
  DEPLOY_ENV = 'pull-request';
}

if (process.env.CONTEXT === 'production' || process.env.CONTEXT === 'branch-deploy') {
  DEPLOY_ENV = 'production';
}

// The 'master' and 'next' branches are NEVER a production environment. We use these branches for staging.
if (
  (process.env.CONTEXT === 'production' || process.env.CONTEXT === 'branch-deploy') &&
  (process.env.HEAD === 'master' || process.env.HEAD === 'next')
) {
  DEPLOY_ENV = 'staging';
}
/**
 * ====================================================================================
 */

process.env.DEPLOY_ENV = DEPLOY_ENV;

export function withDocsInfra(nextConfig: NextConfig): NextConfig {
  const { envPlugin, eslint, experimental, typescript, webpack, ...otherConfig } = nextConfig;

  return {
    trailingSlash: true,
    reactStrictMode: true,
    ...otherConfig,
    experimental: {
      scrollRestoration: true,
      esmExternals: false,
      workerThreads: false,
      cpus: 3,
      ...experimental,
    },
    eslint: {
      ignoreDuringBuilds: true,
      ...eslint,
    },
    typescript: {
      // Motivated by https://github.com/vercel/next.js/issues/7687
      ignoreBuildErrors: true,
      ...typescript,
    },
    webpack: (config, options) => {
      const plugins = [
        new EnvironmentPlugin({
          ...envPlugin,
          // production | staging | pull-request | development
          DEPLOY_ENV,
          FEEDBACK_URL: process.env.FEEDBACK_URL ?? null,
          // https://docs.netlify.com/configure-builds/environment-variables/#git-metadata
          // reference ID (also known as "SHA" or "hash") of the commit we're building.
          COMMIT_REF: process.env.COMMIT_REF ?? null,
          // ID of the PR and the Deploy Preview it generated (for example, 1211)
          PULL_REQUEST_ID: process.env.REVIEW_ID ?? null,
          // This can be set manually in the .env to see the ads in dev mode.
          ENABLE_AD_IN_DEV_MODE: process.env.ENABLE_AD_IN_DEV_MODE ?? null,
          // URL representing the unique URL for an individual deploy, e.g.
          // https://5b243e66dd6a547b4fee73ae--petsof.netlify.app
          NETLIFY_DEPLOY_URL: process.env.DEPLOY_URL ?? null,
          // Name of the site, its Netlify subdomain; for example, material-ui-docs
          NETLIFY_SITE_NAME: process.env.SITE_NAME ?? null,
          // For template images
          TEMPLATE_IMAGE_URL: '',
        }),
      ];

      config.plugins = [...config.plugins, ...plugins];

      return webpack ? webpack(config, options) : { plugins };
    },
  };
}
