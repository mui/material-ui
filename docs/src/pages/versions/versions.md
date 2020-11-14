# Material-UI Versions

<p class="description">You can come back to this page and switch the version of the docs you're reading at any time.</p>

## Stable versions

The most recent version is recommended in production.

{{"demo": "pages/versions/StableVersions.js", "hideToolbar": true, "bg": "inline"}}

## Latest versions

Here you can find the latest unreleased documentation and code.
You can use it to see what changes are coming and provide better feedback to Material-UI contributors.

{{"demo": "pages/versions/LatestVersions.js", "hideToolbar": true, "bg": "inline"}}

## Versioning strategy

 Stability ensures that reusable components and libraries, tutorials, tools, and learned practices don't become obsolete unexpectedly. Stability is essential for the ecosystem around Material-UI to thrive.

This document contains the practices that are followed to provide you with a leading-edge UI library, balanced with stability, ensuring that future changes are always introduced in a predictable way.

Material-UI follows [Semantic Versioning 2.0.0](https://semver.org/).
Material-UI version numbers have three parts: `major.minor.patch`.
The version number is incremented based on the level of change included in the release.

- **Major releases** contain significant new features, some but minimal developer assistance is expected during the update. When updating to a new major release, you may need to run update scripts, refactor code, run additional tests, and learn new APIs.
- **Minor releases** contain important new features.
Minor releases are fully backward-compatible; no developer assistance is expected during update, but you can optionally modify your apps and libraries to begin using new APIs, features, and capabilities that were added in the release.
- **Patch releases** are low risk, contain bug fixes and small new features.
No developer assistance is expected during update.

## Release frequency

A regular schedule of releases helps you plan and coordinate your updates with the continuing evolution of Material-UI.

In general, you can expect the following release cycle:

- A **major** release every 12 months.
- 1-3 **minor** releases for each major release.
- A **patch** release every week (anytime for urgent bugfix).

## Release schedule

| Date | Version | Status |
|:-----|:--------|:-------|
| May 2018 | v1.0.0 | Released |
| September 2018 | v3.0.0 | Released |
| May 2019 | v4.0.0 | Released |
| Q4 2020 | v5.0.0 | ⏳ |

You can follow the [milestones](https://github.com/mui-org/material-ui/milestones) for a more detailed overview.

> ⚠️ **Disclaimer**: We operate in a dynamic environment, and things are subject to change. The information provided is intended to outline the general framework direction. It's intended for informational purposes only. We may decide to add/remove new items at any time depending on our capability to deliver while meeting our quality standards. The development, releases and timing of any features or functionality of Material-UI remains at the sole discretion of Material-UI. The roadmap does not represent a commitment, obligation or promise to deliver at any time.

## Support policy

Find details on the [supported versions](/getting-started/support/#supported-versions).

## Deprecation practices

Sometimes **"breaking changes"**, such as the removal of support for select APIs and features, are necessary.

To make these transitions as easy as possible:

- The number of breaking changes is minimized, and migration tools provided when possible.
- The deprecation policy described below is followed, so that you have time to update your apps to the latest APIs and best practices.

### Deprecation policy

- Deprecated features are announced in the changelog, and when possible, with warnings at runtime.
- When a deprecation is announced, recommended update path is provided.
- Existing use of a stable API during the deprecation period is supported, so your code will keep working during that period.
- Peer dependency updates (React) that require changes to your apps are only made in a major release.
