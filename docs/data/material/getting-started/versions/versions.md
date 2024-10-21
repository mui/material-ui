# Material UI Versions

<p class="description">Learn about future, current, and older versions of Material UI.</p>

## Released versions

The most recent stable version (marked with ✅) is recommended for use in production.

{{"demo": "ReleasedVersions.js", "hideToolbar": true, "bg": "inline"}}

## Unreleased versions

See the branch preview links to visit unreleased versions of the documentation.
You can also browse each active GitHub branch to see the unreleased code.

| Branch   | Docs preview                                      | Code preview                                                      |
| :------- | :------------------------------------------------ | :---------------------------------------------------------------- |
| `master` | [Preview](https://material-ui.netlify.app/)       | [Visit at GitHub](https://github.com/mui/material-ui/tree/master) |
| `next`   | [Preview](https://next--material-ui.netlify.app/) | [Visit at GitHub](https://github.com/mui/material-ui/tree/next)   |

## Versioning strategy

Material UI follows [Semantic Versioning 2.0.0](https://semver.org/), which means that the version number has three parts, `major.minor.patch`, which is incremented based on the level of change included in the release.

- **Major releases** contain significant new features.
  These releases include [breaking changes](#what-doesnt-count-as-a-breaking-change).
  When updating to a new major release, you may need to run update scripts, refactor code, run additional tests, and learn new APIs.
  Some developer assistance is expected during the update.
- **Minor releases** contain important new features.
  They are fully backward-compatible; no developer assistance is expected during the update, but you can optionally modify your apps and libraries to begin using new APIs, features, and capabilities that were added in the release.
- **Patch releases** are low risk, contain bug fixes and small new features.
  No developer assistance is expected during the update.

### What isn't a breaking change?

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

In general, you can expect the following release cycle:

- A **major** release every 12 to 18 months.
- 1-3 **minor** releases for each major release.
- A **patch** release every week (anytime for an urgent bug fix).

## Release schedule

You can also follow the [milestones](https://github.com/mui/material-ui/milestones) for a more detailed overview.

| Date                | Version | Status       |
| :------------------ | :------ | :----------- |
| Q4 2024 (tentative) | v7.0.0  | Work started |
| Q2 2024 (tentative) | v6.0.0  | Work started |
| September 2021      | v5.0.0  | Released     |
| May 2019            | v4.0.0  | Released     |
| September 2018      | v3.0.0  | Released     |
| May 2018            | v1.0.0  | Released     |

:::warning
**Disclaimer**: We operate in a dynamic environment, and things are subject to change. The information provided is intended to outline the general framework direction, for informational purposes only. We may decide to add or remove new items at any time, depending on our capability to deliver while meeting our quality standards. The development, releases, and timing of any features or functionality remain at the sole discretion of Material UI core team. The roadmap does not represent a commitment, obligation, or promise to deliver at any time.
:::

## Deprecation practices

Sometimes "breaking changes", such as the removal of support for select APIs and features, are necessary.
To make these transitions as easy as possible:

- The number of breaking changes is minimized, and migration tools are provided when possible (for example codemods).
- The deprecation policy described below is followed so that you have time to update your apps to the latest APIs and best practices.

### Deprecation policy

- Deprecated features are announced in the changelog, and when possible, with warnings at runtime.
- When a deprecation is announced, recommended update path is provided.
- Existing use of a stable API during the deprecation period is supported, so your code will keep working during that period.
