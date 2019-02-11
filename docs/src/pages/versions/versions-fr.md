# Versions de Materiel-UI

<p class="description">Vous pouvez revenir à cette page et changer de version de document à tout moment.</p>

## Versions stables

La version la plus récente est recommandée en production.

{{"demo": "pages/versions/StableVersions.js", "hideHeader": true}}

## Dernière version

Ici vous pouvez trouver la dernière documentation non publiée et le code. Vous pouvez l'utiliser pour voir les modifications à venir et fournir des retours aux contributeurs de Material-UI.

{{"demo": "pages/versions/LatestVersion.js", "hideHeader": true}}

## Stratégie de gestion des versions

Nous sommes conscients que vous avez besoin de **stabilité** pour la librairie Material-UI. La stabilité garantit des composants réutilisables et les librairies, tutoriels, outils ainsi que les pratiques acquises ne deviennes pas soudainement obsolètes. La stabilité est essentielle au développement de l’écosystème Material-UI.

This document contains **the practices that we follow** to provide you with a leading-edge UI library, balanced with stability. We strive to ensure that future changes are always introduced in a predictable way. We want everyone who depends on Material-UI to know when and how new features are added, and to be well-prepared when obsolete ones are removed.

Material-UI strictly follows [Semantic Versioning 2.0.0](https://semver.org/). Material-UI version numbers have three parts: `major.minor.patch`. The version number is incremented based on the level of change included in the release.

- **Major releases** contain significant new features, some but minimal developer assistance is expected during the update. When updating to a new major release, you may need to run update scripts, refactor code, run additional tests, and learn new APIs.
- **Minor releases** contain important new features. Minor releases are fully backward-compatible; no developer assistance is expected during update, but you can optionally modify your apps and libraries to begin using new APIs, features, and capabilities that were added in the release.
- **Patch releases** are low risk, contain bug fixes and small new features. No developer assistance is expected during update.

## Release frequency

We work toward a regular schedule of releases, so that you can plan and coordinate your updates with the continuing evolution of Material-UI.

In general, you can expect the following release cycle:

- A **major** release every 6 months.
- 1-3 **minor** releases for each major release.
- A **patch** release every week (anytime for urgent bugfix).

## Release schedule

> Disclaimer: The dates are offered as general guidance and may be adjusted by us when necessary to ensure delivery of a high-quality code.

| Date         | Version                    |
|:------------ |:-------------------------- |
| January 2019 | `@material-ui/core` v4.0.0 |
| July 2019    | `@material-ui/core` v5.0.0 |

You can follow [our milestones](https://github.com/mui-org/material-ui/milestones) for a more detailed overview.

## Support policy

We only support the latest version of Material-UI. We don't yet have the resources to offer [LTS](https://en.wikipedia.org/wiki/Long-term_support) releases.

## Deprecation practices

Sometimes **"breaking changes"**, such as the removal of support for select APIs and features, are necessary.

To make these transitions as easy as possible, we make two commitments to you:

- We work hard to minimize the number of breaking changes and to provide migration tools when possible.
- We follow the deprecation policy described here, so you have time to update your apps to the latest APIs and best practices.

To help ensure that you have sufficient time and a clear path to update, this is our deprecation policy:

- We announce deprecated features in the changelog, and when possible, with warnings at runtime.
- When we announce a deprecation, we also announce a recommended update path.
- We support existing use of a stable API during the deprecation period, so your code will keep working during that period.
- We only make peer dependency updates (React) that require changes to your apps in a major release.