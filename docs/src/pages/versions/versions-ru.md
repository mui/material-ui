# Версии Material-UI

<p class="description">Вы можете в любой момент вернуться на эту страницу и переключить версию документов, которые вы читаете.</p>

## Стабильные версии

The most recent version is recommended in production.

{{"demo": "pages/versions/StableVersions.js", "hideHeader": true}}

## Последние версии

Здесь вы можете найти последнюю неопубликованную документацию и код. You can use it to see what changes are coming and provide better feedback to Material-UI contributors.

{{"demo": "pages/versions/LatestVersion.js", "hideHeader": true}}

## Versioning strategy

Stability ensures that reusable components and libraries, tutorials, tools, and learned practices don't become obsolete unexpectedly. Stability is essential for the ecosystem around Material-UI to thrive.

This document contains the practices that are followed to provide you with a leading-edge UI library, balanced with stability, ensuring that future changes are always introduced in a predictable way.

Material-UI strictly follows [Semantic Versioning 2.0.0](https://semver.org/). Material-UI version numbers have three parts: `major.minor.patch`. The version number is incremented based on the level of change included in the release.

- **Major releases** contain significant new features, some but minimal developer assistance is expected during the update. When updating to a new major release, you may need to run update scripts, refactor code, run additional tests, and learn new APIs.
- **Minor releases** contain important new features. Minor releases are fully backward-compatible; no developer assistance is expected during update, but you can optionally modify your apps and libraries to begin using new APIs, features, and capabilities that were added in the release.
- **Patch releases** are low risk, contain bug fixes and small new features. No developer assistance is expected during update.

## Release frequency

A regular schedule of releases helps you plan and coordinate your updates with the continuing evolution of Material-UI.

In general, you can expect the following release cycle:

- A **major** release every 6-12 months.
- 1-3 **minor** releases for each major release.
- A **patch** release every week (anytime for urgent bugfix).

## График выпуска

> Disclaimer: The dates are offered as general guidance and may be adjusted by us when necessary to ensure delivery of a high-quality code.

| Date       | Version                    |
|:---------- |:-------------------------- |
| May 2018 ✅ | `@material-ui/core` v1.0.0 |
| May 2019 ✅ | `@material-ui/core` v4.0.0 |
| ? ⏳        | `@material-ui/core` v5.0.0 |


You can follow the [milestones](https://github.com/mui-org/material-ui/milestones) for a more detailed overview.

## Политика поддержки

Only the latest version of Material-UI is supported. We don't yet have the resources to offer [LTS](https://en.wikipedia.org/wiki/Long-term_support) releases.

## Deprecation practices

Sometimes **"breaking changes"**, such as the removal of support for select APIs and features, are necessary.

To make these transitions as easy as possible:

- The number of breaking changes is minimized, and migration tools provided when possible.
- The deprecation policy described below is followed, so that you have time to update your apps to the latest APIs and best practices.

### Deprecation policy

- Deprecated features iare announced n the changelog, and when possible, with warnings at runtime.
- When a deprecation is announced, recommended update path is provided.
- Existing use of a stable API during the deprecation period is supported, so your code will keep working during that period.
- Peer dependency updates (React) that require changes to your apps are only made in a major release.