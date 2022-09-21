# MUI Versions

<p class="description">You can come back to this page and switch the version of the docs you're reading at any time.</p>

## Released versions

The most recent stable version (✓) is recommended for use in production.

{{"demo": "pages/versions/ReleasedVersions.js", "hideToolbar": true, "bg": "inline"}}

## Latest versions

Here you can find the latest unreleased documentation and code.
You can use it to see what changes are coming and provide better feedback to MUI contributors.

{{"demo": "pages/versions/LatestVersions.js", "hideToolbar": true, "bg": "inline"}}

## Versioning strategy

Stability ensures that reusable components and libraries, tutorials, tools, and learned practices don't become obsolete unexpectedly.
Stability is essential for the ecosystem around MUI to thrive.

This document contains the practices that are followed to provide you with a leading-edge UI library, balanced with stability, ensuring that future changes are always introduced predictably.

MUI follows [Semantic Versioning 2.0.0](https://semver.org/).
MUI version numbers have three parts: `major.minor.patch`.
The version number is incremented based on the level of change included in the release.

- **Major releases** contain significant new features, some developer assistance is expected during the update.
  These releases include [breaking changes](#what-doesnt-count-as-a-breaking-change).
  When updating to a new major release, you may need to run update scripts, refactor code, run additional tests, and learn new APIs.
- **Minor releases** contain important new features.
  Minor releases are fully backward-compatible; no developer assistance is expected during the update, but you can optionally modify your apps and libraries to begin using new APIs, features, and capabilities that were added in the release.
- **Patch releases** are low risk, contain bug fixes and small new features.
  No developer assistance is expected during the update.

## What doesn't count as a breaking change?

We call "breaking changes" those that require updating your codebase when upgrading to a new version, with the exception of:

- **APIs starting with "unstable\_"**. These are provided as experimental features whose APIs we are not yet confident in.
  By releasing these with an `unstable_` prefix, we can iterate faster and get to a stable API sooner, or simply learn that we don't need the API/feature in the first place.
- **APIs documented as experimental**. Same as the above.
- **Undocumented APIs and internal data structures**. If you access internal properties, there is no warranty. You are on your own.
- **Development warnings**. Since these don't affect production behavior, we may add new warnings or modify existing warnings in between major versions.
  In fact, this is what allows us to reliably warn about upcoming breaking changes.
- **Pre-releases versions**. We provide pre-release versions as a way to test new features early, but we need the flexibility to make changes based on what we learn in the pre-release period.
  If you use these versions, note that APIs may change before the stable release.
- **Small CSS changes**. Visual design changes that have a very low probability of negatively impacting your UI are not considered breaking.

## Release frequency

A regular schedule of releases helps you plan and coordinate your updates with the continuing evolution of MUI.

In general, you can expect the following release cycle:

- A **major** release every 12 months.
- 1-3 **minor** releases for each major release.
- A **patch** release every week (anytime for an urgent bug fix).

## Release schedule

| Date           | Version | Status           |
| :------------- | :------ | :--------------- |
| TBA            | v6.0.0  | Work not started |
| September 2021 | v5.0.0  | Released         |
| May 2019       | v4.0.0  | Released         |
| September 2018 | v3.0.0  | Released         |
| May 2018       | v1.0.0  | Released         |

You can follow the [milestones](https://github.com/mui/material-ui/milestones) for a more detailed overview.

> ⚠️ **Disclaimer**: We operate in a dynamic environment, and things are subject to change. The information provided is intended to outline the general framework direction, for informational purposes only. We may decide to add or remove new items at any time, depending on our capability to deliver while meeting our quality standards. The development, releases, and timing of any features or functionality remains at the sole discretion of MUI. The roadmap does not represent a commitment, obligation, or promise to deliver at any time.

## Supported versions

MUI Core has been open-source ([MIT](https://tldrlegal.com/license/mit-license)) since the very beginning, and always will be.
Developers can ensure MUI is the right choice for their React applications through MUI's community maintenance strategy.
The MUI team regularly ships new releases, bug fixes, and is very welcoming to community pull requests.

Given the reality of time and resource constraints, as well as the desire to keep innovating, over time it becomes necessary to shift focus to newer versions of the framework ([our release schedule](#release-frequency)), while making the transition to newer versions as smooth as possible, including publishing migration guides such as [this one for v5](/material-ui/migration/migration-v4/).
The open-source community is always welcome to submit new features and bug fixes as well.

The current status of each MUI version is as follows:

- MUI Core v5: ✅ Active development and continuous support.
- [Material UI v4](https://v4.mui.com/): ⚠️ Guaranteed Support for security issues and regressions.
- [Material UI v3](https://v3.mui.com/): 🅧 No longer supported.
- Material UI v2: 🅧 Never existed.
- [Material UI v1](https://v1.mui.com/): 🅧 No longer supported.
- [Material UI v0.x](https://v0.mui.com/#/): 🅧 No longer supported.

For teams and organizations that require additional support for older versions, MUI has [options available](/material-ui/getting-started/support/#paid-support).

### Long-term support (LTS)

MUI will continue to provide security updates and support for regressions for one version prior to the current major version, for example regressions caused by external factors such as browser updates, or changes to upstream dependencies.

## Deprecation practices

Sometimes "breaking changes", such as the removal of support for select APIs and features, are necessary.
To make these transitions as easy as possible:

- The number of breaking changes is minimized, and migration tools are provided when possible (e.g. codemods).
- The deprecation policy described below is followed so that you have time to update your apps to the latest APIs and best practices.

### Deprecation policy

- Deprecated features are announced in the changelog, and when possible, with warnings at runtime.
- When a deprecation is announced, recommended update path is provided.
- Existing use of a stable API during the deprecation period is supported, so your code will keep working during that period.
