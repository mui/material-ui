# [Versions](https://mui.com/versions/)

## v6.1.2

<!-- generated comparing v6.1.1..master -->

_Oct 2, 2024_

A big thanks to the 13 contributors who made this release possible.

### `@mui/material@6.1.2`

- [Modal] Remove unnecessary `manager` prop handling (#43867) @ZeeshanTamboli
- [Autocomplete] Fix listbox opens and closes on click when used with `limitTags` (#42494) @appleSimple
- [Button] Ignore `dark` and `contrastText` if not provided in the theme (#43861) @siriwatknp
- [Button] Fix regression for color `inherit` (#43862) @siriwatknp
- [LinearProgress] Fix background color (#43949) @sai6855
- Support CSS variables with shadow DOM (#43948) @siriwatknp
- Improve getReactElementRef() utils (#43022) @sai6855
- [Modal] Replace `show` parameter name with `hide` in modal manager (#43868) @ZeeshanTamboli
- [Rating] Use Rating `name` as prefix of input element ids (#43829) @yash49
- [Drawer] Refactor getScrollbarSize usages (#43828) @BrianWoolfolk
- [Drawer] Fix issue with main window being used instead of iframe's window (#43818) @albarv340
- [ThemeProvider] Support setting default mode (#43951) @siriwatknp

### Docs

- Update theme toggle demo (#43956) @Janpot
- Add note about minimum required webpack version (#43864) @Janpot
- Format Pigment CSS docs (#43812) @oliviertassinari
- Fix visual bug on dashboard template (#43836) @oliviertassinari
- Fix pigment-css.md syntax error (#43837) @kdichev
- Fix Sign-in template form experience (#43838) @oliviertassinari
- Remove "To be continued" section from v0 –> v1 migration guide (#43832) @samuelsycamore
- Fix 301 to chromium (#43809) @oliviertassinari
- [joy-ui] Add missing ComponentLinkHeader components (#43865) @samuelsycamore
- [Modal] Remove unnecessary type assertion (#43825) @ZeeshanTamboli
- [Table] Stabilize random series in virtualized table demo (#43744) @Janpot
- [system] Add migration guide link to `@mui/styles` pages (#43833) @samuelsycamore

### Core

- [code-infra] Fix flaky dashboard screenshot - take 2 (#43937) @Janpot
- [code-infra] Replace all instances of `e` with `event` and add eslint rule (#43866) @samuelsycamore
- [code-infra] Fix and update bundling fixtures (#43709) @Janpot
- [code-infra] Update transitive dependencies with vulnerabilties (#43895) @Janpot
- [code-infra] Optimize regression tests (#43889) @Janpot
- [code-infra] Remove custom playwright installation steps (#43881) @Janpot
- [code-infra] Fix flaky dashboard screenshot (#43890) @Janpot
- [code-infra] Add new instanceof proptypes for toolpad (#43814) @Janpot
- Fix eslint-plugin-react-compiler issues in usePagination tests (#43946) @wilhelmlofsten
- Uniformity in version range @oliviertassinari
- Replace `toBeAriaHidden` matcher with `toBeInaccessible` in tests (#43870) @ZeeshanTamboli
- [docs-infra] Strengthen CSP (#43711) @oliviertassinari
- [docs-infra] Open Codesandbox demo with fontsize=12 (#43860) @siriwatknp
- [icons] Reduce Material Icon page size (#43911) @oliviertassinari
- [test] Point Istanbul to correct URL (#43935) @sai6855
- [test] Sync React.version parse logic with codebase (#43820) @oliviertassinari
- [website] Add 'Row spanning' (#43831) @oliviertassinari
- [website] Improve Next roles section (#43822) @oliviertassinari
- [website] Open the xCharts, eXplore and X general react engineer roles (#43805) @DanailH

All contributors of this release in alphabetical order: @albarv340, @appleSimple, @BrianWoolfolk, @DanailH, @Janpot, @kdichev, @oliviertassinari, @sai6855, @samuelsycamore, @siriwatknp, @wilhelmlofsten, @yash49, @ZeeshanTamboli

## v6.1.1

<!-- generated comparing v6.1.0..master -->

_Sep 19, 2024_

A big thanks to the 18 contributors who made this release possible.

### `@mui/material@6.1.1`

- [Grid] Bring back `GridProps` and `GridTypeMap` (#43717) @DiegoAndai
- [Paper] Fix wrong background-image on Paper when elevation is 0 (#43723) @ZeeshanTamboli
- [Skeleton] Fix wave animation for styled-components (#43740) @siriwatknp
- [Modal] Fix event handlers overriding behavior (#43757) @sai6855

### `@mui/system@6.1.1`

- Pass the stylesheet directly to `GlobalStyles` (#43739) @siriwatknp

### `@mui/utils@6.1.1`

- Fix "useId" & "useSyncExternalStore" imports to not be statically analyzable (#43360) @yash49

### Docs

- [material-ui][Breadcrumbs] Document CondensedWithMenu option for Breadcrumbs (#42973) @Sergio16T
- [material-ui][CircularProgress] Add Circular size demo (#43734) @sai6855
- [material-ui][slider] Fix slider in color customization playground twitches when sliding (#43671) @Nashyn
- [material-ui][slider] Polish Music player demo (#43748) @oliviertassinari
- [material-ui] Document Typography color prop breaking change (#43735) @aarongarciah
- [material-ui] Add docs for complementary Table components (#43756) @Juneezee
- [material-ui] Improve minimizing bundle docs (#43781) @ZeeshanTamboli
- [pigment-css] Call out Pigment being in alpha (#43725) @aarongarciah
- [pigment-css] Fix typo globalCSS -> globalCss (#43754) @hiro0218
- [test] Improve demos for better regression screenshots (#43742) @aarongarciah
- Fix minor typo (#42899) @xconverge
- Revert icon search virtualization (#43569) @Janpot
- Fix MUI Treasury Layout broken links (#43752) @oliviertassinari
- Fix 301 link to design asset @oliviertassinari
- Update release schedule table after v6 stable (#43726) @sahil-ag
- Fix bundle size link regression @oliviertassinari

### Core

- [code-infra] Allow overriding all `options` of `useFakeTimers` function (#43729) @LukasTy
- [core] Fix 301 link to Next.js and git diff @oliviertassinari
- [core] Fix package.json repository rule @oliviertassinari
- [core] Remove redundant window @oliviertassinari
- [core] Fix some issues reported by eslint-plugin-react-compiler (#43117) @binsmyth
- [core] Replace more `indexOf` with `includes` (#43694) @Juneezee
- [core] Remove /.yarn (#43712) @oliviertassinari
- [docs-infra] Enable synthetic default imports in TypeScript config (#43747) @morozow
- [docs-infra] Fix Vale config for TypeScript references (#43751) @oliviertassinari
- [docs-infra] Fix toolbar arrow order (#43627) @oliviertassinari
- [docs-infra] Fix missing dependencies in multi-tab demos (#43713) @cherniavskii
- [docs-infra] Fix API search link regression (#43662) @oliviertassinari
- [test] Update font-awesome CSS file in regression tests fixture (#43745) @Janpot
- [test] Remove position:relative from regression container (#43743) @aarongarciah
- [test] Remove top-level inline-block from the regression tests (#43656) @Janpot
- [website] Match pricing page with linked page h1 @oliviertassinari

All contributors of this release in alphabetical order: @aarongarciah, @binsmyth, @cherniavskii, @DiegoAndai, @Janpot, @Juneezee, @LukasTy, @mnajdova, @morozow, @Nashyn, @oliviertassinari, @sahil-ag, @sai6855, @Sergio16T, @siriwatknp, @xconverge, @yash49, @ZeeshanTamboli

## v6.1.0

<!-- generated comparing v6.0.2..master -->

_Sep 10, 2024_

A big thanks to the 21 contributors who made this release possible. Here are the highlights ✨:

- **Minor version changes**: To solve longstanding ESM compatibility issues we added [package exports](https://nodejs.org/api/packages.html#exports) to `@mui/icons-material` (#43624). This change is backwards compatible with previously recommended setups. Bundlers that don't support the `exports` field won't be affected. If you discover any issues, please reach out by creating a GitHub issue.
- This release also includes several fixes and documentation improvements to support the Material UI v6 upgrade.

### `@mui/icons-material@6.1.0`

- Add exports field to package.json (#43624) @Janpot

### `@mui/material@6.1.0`

- [Autocomplete] Add custom props support via `slotProps` (#43613) @Michael-Hutchinson
- [Dialog] Fix broken scrolling in full screen mode (#43626) @LuseBiswas
- [Grid] Revert wrap deprecation (#42363) (#43459) @DiegoAndai
- Improve color map filter on styles (#43579) @DiegoAndai
- Return styles directly if the selector is `&` when using `applyStyles` (#43633) @siriwatknp
- [types] Make slots partial in `CreateSlotsAndSlotProp`type (#42077) @lhilgert9
- [Radio] Fix disabled state styling regression (#43592) @mnajdova
- Fix wrong import to type (#43584) @mnajdova
- Simplify version prerelease export (#43699) @DiegoAndai

### `@mui/system@6.1.0`

- Use a custom sheet to set prepend for `GlobalStyles` (#43632) @siriwatknp
- Simplify version prerelease export (#43699) @DiegoAndai

### Docs

- [material-ui][Autocomplete] Refactor asynchronous loading demo (#43630) @sai6855
- [material-ui][Autocomplete] Fix GitHubLabel demo input background color (#43599) @sai6855
- [material-ui] Update Next.js font optimization guide (#43196) @siriwatknp
- [material-ui] Fix getting started with CSS variables in theme example (#43658) @Designer023
- [material-ui][system] Edit "How to use components selector API" section to add about direct import (#43377) @IAluI
- [material-ui] Update @mui/material-nextjs import examples to v14 (#43698) @ohmsl
- Fix typo in Divider doc (#43691) @lokendra-reco
- Add Anima section to documentation (#43673) @GoOrit-Anima
- Add Integrations section to design resources page (#43612) @zanivan
- Fix versions URL @oliviertassinari
- Keep showing next under the subdomain @oliviertassinari
- Add Next.js font optimization section to Pigment CSS migration (#43631) @siriwatknp
- Update the Material UI readme post-v6 (#43504) @samuelsycamore
- Bring back v5 release changelogs (#43460) @oliviertassinari
- Fix use of absolute URLs (#43567) @oliviertassinari
- Remove explicit `date-fns` dependency (#40823) @renovate[bot]
- [pigment-css] Add guide for Pigment CSS quickstart (#43395) @alelthomas
- [system] Fix link to createCssVarsProvider (#43661) @oliviertassinari
- Add scrollbar to color picker demo (#43672) @sai6855

### Core

- [blog] Uniformalize version between projects @oliviertassinari
- [blog] Fix page layout shift @oliviertassinari
- [code-infra] Build size snapshots from installed packages (#43452) @Janpot
- [code-infra] Recreate lockfile (#43623) @Janpot
- [code-infra] Make the API docs builder more configurable (#43574) @michaldudak
- [code-infra] Update runners from node 18 to 20 for GHA (#43593) @JCQuintas
- [code-infra] Update runners from node 18 to 20 (#43591) @JCQuintas
- [docs-infra] Fix axe issue scroll-to-top without landmark (#43663) @oliviertassinari
- [docs-infra] Reduce Algolia index size, no need for lvl6 @oliviertassinari
- [docs-infra] Use embed as the default for opening CodeSandbox (#43618) @siriwatknp
- [docs-infra] Fix broken anchor button when header has a link (#43598) @cherniavskii
- [docs-infra] Open Sign-in and Dashboard template with CodeSandbox/StackBlitz (#43604) @siriwatknp
- [examples] Fix CDN live preview demo (#43641) @oliviertassinari
- Add Pigment CSS screenshot test (#43280) @mnajdova
- [website] Polish gold sponsors @oliviertassinari
- [website] Add CopyCopter as gold sponsor (#43595) @zanivan
- [website] Add disabled button styles to branding theme (#43577) @zanivan

All contributors of this release in alphabetical order: @alelthomas, @cherniavskii, @Designer023, @DiegoAndai, @GoOrit-Anima, @IAluI, @Janpot, @JCQuintas, @lhilgert9, @lokendra-reco, @LuseBiswas, @Michael-Hutchinson, @michaldudak, @mnajdova, @ohmsl, @oliviertassinari, @renovate[bot], @sai6855, @samuelsycamore, @siriwatknp, @zanivan

## v6.0.2

<!-- generated comparing v6.0.1..master -->

_Sep 3, 2024_

A big thanks to the 11 contributors who made this release possible.

### `@mui/material@6.0.2`

- &#8203;<!-- 07 -->Fix `createTheme` with just color schemes (#43518) @siriwatknp
- &#8203;<!-- 06 -->[Menu,Popover] Fix Backdrop props descriptions (#43503) @Michael-Hutchinson
- &#8203;<!-- 05 -->[MenuList] Do not react to an event with modifier key pressed (#43505) @MateuszGroth

### `@mui/system@6.0.2`

- &#8203;<!-- 08 -->[InitColorSchemeScript] Use `let/const` instead of `var` (#43468) @ishon19
- &#8203;<!-- 04 -->Fix composeClasses v6 behavior change (#43537) @oliviertassinari

### `@mui/codemod@6.0.2`

- &#8203;<!-- 19 -->Skip `ListItemButton` import for unrelated files (#43532) @siriwatknp

### Docs

- &#8203;<!-- 10 -->[figma] Clarity state or Figma Plugin component export (#43543) @oliviertassinari
- &#8203;<!-- 09 -->[material-ui] Fix template shadow tokens (#43514) @zanivan
- &#8203;<!-- 15 -->Update version support range (#43565) @oliviertassinari
- &#8203;<!-- 14 -->Polish Material UI Sync plugin code format @oliviertassinari

### Core

- &#8203;<!-- 24 -->[blog] Update Material UI v6 blog post link to reflect correct section title (#43535) @Michael-Hutchinson
- &#8203;<!-- 23 -->[blog] Makes the v5 name change clearer @oliviertassinari
- &#8203;<!-- 22 -->[blog] Fix typo in Material UI v6 blog post (#43502) @iamandrewluca
- &#8203;<!-- 21 -->[code-infra] Add missing @babel/runtime dependency to @mui/material-pigment-css (#43473) @Janpot
- &#8203;<!-- 20 -->[code-infra] Remove permissions in publish-canaries.yml (#43491) @oliviertassinari
- &#8203;<!-- 18 -->[core] Fix CodeQL scan (#43547) @oliviertassinari
- &#8203;<!-- 17 -->[core] Fix CHANGELOG `@mui/material@6.0.1` version (#43516) @DiegoAndai
- &#8203;<!-- 14 -->[docs-infra] Reduce description max-length (#43562) @oliviertassinari
- &#8203;<!-- 13 -->[docs-infra] Crash on invalid callout type (#43546) @oliviertassinari
- &#8203;<!-- 12 -->[docs-infra] Fix GitHub source link redirection (#43534) @oliviertassinari
- &#8203;<!-- 09 -->[infra] Fixed workflow file path (#43528) @michelengelen
- &#8203;<!-- 03 -->[typescript] Fix missing `Theme` generic (#43523) @siriwatknp
- &#8203;<!-- 02 -->[website] Match pricing label with page @oliviertassinari
- &#8203;<!-- 01 -->[website] Update Premium price and remove any mention to cap (#43466) @joserodolfofreitas

All contributors of this release in alphabetical order: @DiegoAndai, @iamandrewluca, @ishon19, @Janpot, @joserodolfofreitas, @MateuszGroth, @Michael-Hutchinson, @michelengelen, @oliviertassinari, @siriwatknp, @zanivan

## v6.0.1

<!-- generated comparing v6.0.0..master -->

_Aug 29, 2024_

A big thanks to the 12 contributors who made this release possible. It contains bug fixes and documentation improvements.

### `@mui/material@6.0.1`

- Attach default light color scheme when enabling CSS theme variables (#43493) @siriwatknp
- [Skeleton] Apply the wave animation to the correct element (#43474) @mnajdova

### Docs

- [material-ui][Dialog] Update confirmation dialog description (#43488) @Michael-Hutchinson
- Add Material UI v6 is out! to the notifications (#43448) @oliviertassinari
- [material-ui] Dark scroll bars in templates (#43483) @aarongarciah
- [material-ui] Add TemplateFrame to templates (#43406) @zanivan
- [table] Make the data grid blend in (#43489) @oliviertassinari

### Core

- [blog] Update Toolpad Studio marketing page links in the blogs (#43407) @prakhargupta1
- [blog] Add missing social card to the blog post (#43465) @siriwatknp
- [code-infra] Fix typing issues with `@mui-internal/api-docs-builder` (#43498) @Janpot
- [code-infra] Fix nextjs build cache (#43467) @JCQuintas
- Remove `'use client'` from index files and useAutocomplete reexport (#41956) @DiegoAndai
- Replace relative links to absolute ones in JSDocs (#43472) @alexfauquette
- Upgrade babel runtime (#43243) @Janpot
- [docs-infra] Skip shadow DOM regression test (#43500) @aarongarciah
- [docs-infra] Fix use of process.env.DEPLOY_ENV (#43490) @oliviertassinari
- [docs-infra] Add comment about removing optimizeFonts Next.js config (#43469) @aarongarciah
- [examples] Use `latest` on all Material UI dependencies (#43494) @mnajdova
- [infra] fix workflow path (#43464) @michelengelen

All contributors of this release in alphabetical order: @aarongarciah, @alexfauquette, @DiegoAndai, @Janpot, @JCQuintas, @Michael-Hutchinson, @michelengelen, @mnajdova, @oliviertassinari, @prakhargupta1, @siriwatknp, @zanivan

## 6.0.0

<!-- generated comparing v6.0.0-rc.0..master -->

_Aug 27, 2024_

We are excited to announce the stable release of Material-UI v6 🎉, check out [the blog post](https://mui.com/blog/material-ui-v6-is-out/) to see all the updates.

### `@mui/material@6.0.0`

- Change React.ReactElement<any,any> type from any to unknown (#43358) @sai6855
- [Pagination] Update `getItemAriaLabel` page param type (#43399) @sydneyjodon-wk
- [Unstable_TrapFocus] Fix `getTabbable` function return type (#42237) @KalmarLorand

### `@mui/lab@6.0.0-beta.8`

- [button] Add missing customize points for span (#43436) @oliviertassinari

### Docs

- Fix broken links (#43144) @DiegoAndai
- Updated mui-x roadmap links with the new project URL (#43444) @michelengelen
- Update pnpm order, move to second (#42712) @ahmadnadeem6236
- Fix CSS theme variables section (#43439) @siriwatknp
- Add two Toolpad Core components to Material UI sidebar (#43391) @prakhargupta1
- Fix licensingModel -> licenseModel @oliviertassinari
- Fix Stack Overflow issue canned response @oliviertassinari
- Avoid referencing MUI Core @oliviertassinari
- Fix description of eslint-plugin-material-ui @oliviertassinari
- [docs-infra] Polish reportBrokenLinks.js to support Base UI @oliviertassinari
- [material-ui] Clarify RTL language support in localization guide (#41784) @bahmanworld
- [material-ui] Refine templates theme selector (#43396) @zanivan

### Core

- Prepare for v6 stable release (#43454) @siriwatknp
- [blog] Polish Upcoming changes to MUI X pricing in 2024 (#43438) @oliviertassinari
- [blog] Add Material UI v6 stable release (#41932) @siriwatknp
- [ci] Fix the release:changelog cmd (#43451) @mnajdova
- [core] Allow `^6.0.0` for `@mui/` dependencies in `@mui/docs` (#43445) @LukasTy
- [code-infra] Babel plugin to fully resolve imported paths (#43294) @Janpot
- [infra] Add closing message workflow (#43450) @michelengelen
- [website] Make beta chip consistent for Toolpad (#43392) @prakhargupta1

All contributors of this release in alphabetical order: @ahmadnadeem6236, @bahmanworld, @DiegoAndai, @Janpot, @KalmarLorand, @LukasTy, @michelengelen, @mnajdova, @oliviertassinari, @prakhargupta1, @sai6855, @siriwatknp, @sydneyjodon-wk, @zanivan

## 6.0.0-rc.0

<!-- generated comparing v6.0.0-beta.6..next -->

_Aug 22, 2024_

A big thanks to the 12 contributors who made this release possible. Here are some highlights ✨:

- ⚡ Rendering performance improvements

### `@mui/material@6.0.0-rc.0`

#### Breaking changes

- [Box] Remove `component` from `BoxOwnProps` (#43384) @DiegoAndai

  The `component` prop has been removed from the `BoxOwnProps` as it is already included in the `Box` type.
  This might affect your code if you are using the `styled` function with the `Box` component.
  If this is the case, use a `div` element instead of `Box`:

  ```diff
  -const StyledBox = styled(Box)`
  +const StyledDiv = styled('div')`
     color: white;
   `;
  ```

  This yields the same end result.
  If this doesn't work for you, you can also cast the `styled` returned value to `typeof Box`:

  ```diff
   const StyledBox = styled(Box)`
     color: white;
  -`;
  +` as typeof Box;
  ```

#### Changes

- [ListItem] Remove unnecessary TypeScript test (#43359) @sai6855
- Skip generating CSS variables for a custom spacing function (#43389) @siriwatknp
- Revert visual regressions from #42283 (#43364) @ZeeshanTamboli

### `@mui/codemod@6.0.0-rc.0`

- Add Grid2 to removeSystemProps codemod (#43302) @DiegoAndai

### Docs

- [blog] Add video to the Pigment CSS blog post (#42500) @oliviertassinari
- Fix broken link to milestones (#43379) @oliviertassinari
- Update CSS theme variables related content (#43130) @siriwatknp
- Fix link to createTheme source (#43332) @oliviertassinari
- Add cache to avoid unnecessary jsx dynamic import and theme getting (#43139) @Vxee
- Fix broken link to Next.js docs @oliviertassinari
- [material-ui] Revamp `Composition` guide (#43266) @ZeeshanTamboli
- [material-ui][Menu] Replace `PaperProps` with `slotProps.paper` in demos (#43354) @sai6855

### Core

- [code-infra] Change docs:start script to serve the exports folder (#43375) @Janpot
- [core] Fix typescript-next CI workflow (#43394) @aarongarciah
- [core] Run `@mui/system` TypeScript module augmentation tests in CI (#43386) @ZeeshanTamboli
- [core] Enable manage-package-manager-versions pnpm flag (#43366) @aarongarciah
- [core] Replace `indexOf` with `includes` (#42883) @k-rajat19
- [docs-infra] Add GitHub source link to components (#43228) @Jay-Karia
- [docs-infra] Fix copy shortcut (#43361) @oliviertassinari
- [perf] Remove theme/styling allocations (#43372) @romgrk
- [perf] Improve `composeClasses` (#43363) @romgrk
- [perf] Remove system allocations (#43306) @romgrk

All contributors of this release in alphabetical order: @aarongarciah, @DiegoAndai, @Janpot, @Jay-Karia, @k-rajat19, @oliviertassinari, @rluzists1, @romgrk, @sai6855, @siriwatknp, @Vxee, @ZeeshanTamboli

## 6.0.0-beta.6

<!-- generated comparing v6.0.0-beta.5..next -->

_Aug 16, 2024_

A big thanks to the 18 contributors who made this release possible.

### `@mui/material@6.0.0-beta.6`

- [Autocomplete] Improve the `options` prop description (#41591) @pluvio72
- [Autocomplete] Remove autocomplete warning regarding value not equal to option (#43314) @ZeeshanTamboli
- [Divider] Add aria-orientation (#43241) @aarongarciah
- [IconButton] Fix hover background color behavior (#43271) @mnajdova
- [TypeScript] Refactor types so they're compatible with upcoming React 19 (#43276) @DiegoAndai
- [Typography] Replace dot notation color value to work with Pigment CSS (#43288) @siriwatknp
- [pigment-css] Fix `getSelector` prefers-color-scheme to be object (#43237) @siriwatknp
- Remove `display="block"` usage to work with Pigment CSS (#43307) @siriwatknp

### `@mui/codemod@6.0.0-beta.6`

- [codemod] Skip sx spread transformation (#43291) @siriwatknp

### `@mui/styles@6.0.0-beta.6`

- [styles] Fix issues reported by eslint-plugin-react-compiler (#43118) @jlewins

### Docs

- [material-ui] Audit and copyedit the v6 migration doc (#43073) @samuelsycamore
- [material-ui] Fix Material Icon search lag and other improvements (#41330) @anle9650
- [material-ui][Popover] Fix description and title of hover interaction section (#43290) @ZeeshanTamboli
- [material-ui] Refine and unify custom template themes (#43220) @zanivan
- [joy-ui] Fix data grid redirection (#43247) @sai6855
- [mui-system] Add import statement in docs (#43223) @sai6855
- Update babel config (#43286) @romgrk
- Fix outdated references to Materal UI version (#43321) @oliviertassinari
- Polish migration git diff experience @oliviertassinari
- Update LTS to match format (#43212) @oliviertassinari
- Fix Pigment CSS migration content (#43217) @siriwatknp

### Core

- [code-infra] Remove `userEvent` export from `@mui/internal-test-utils` (#43313) @LukasTy
- [code-infra] Remove unnecessary alias (#43320) @Janpot
- [code-infra] Fix utils bundle size entrypoint (#43304) @Janpot
- [core] missing and incorrect scripts (#43209) @Jay-Karia
- [core] Set Node 14 as minimum version in all browserslist envs (#43326) @aarongarciah
- [core] Add React 19 as peer dependency (#43216) @aarongarciah
- [core] Pin `eslint-plugin-jsx-a11y` version to 6.7.1 (#43292) @Janpot
- [core] Update supported Node.js version to 14 (#43315) @Janpot
- [core] Use fs instead of fs-extra in script utils (#43234) @DiegoAndai
- [core] Refactor system theme props (#43120) @romgrk
- [docs-infra] Fix some TS issues for X docs (#43285) @Janpot
- [docs-infra] Move API pages to TS (#43199) @alexfauquette
- [docs-infra] Fix broken sandboxes with relative module imports (#42767) @bharatkashyap
- [docs-infra] Simplify API sections typing (#43128) @alexfauquette
- [examples] Fix import (#43316) @aarongarciah
- [examples] Add material-ui-pigment-css for Next.js and Vite (#43065) @siriwatknp
- [examples] Replace wrong import with `@mui/material/styles` (#43236) @siriwatknp
- [useMediaQuery] Adapt test implementation for React 19 (#43269) @aarongarciah
- [test] Update `matchMedia` mocks (#43240) @cherniavskii
- [test] Remove unnecessary ref param (#43282) @aarongarciah
- [website] Update showcase to include Toolpad Core (#43226) @bharatkashyap
- [website] Replace React.MutableRefObject with React.RefObject (#43284) @aarongarciah

All contributors of this release in alphabetical order: @aarongarciah, @alexfauquette, @anle9650, @bharatkashyap, @cherniavskii, @DiegoAndai, @Janpot, @Jay-Karia, @jlewins, @mnajdova, @oliviertassinari, @pluvio72, @renovate[bot], @romgrk, @sai6855, @samuelsycamore, @siriwatknp, @ZeeshanTamboli

## 6.0.0-beta.5

<!-- generated comparing v6.0.0-beta.4..next -->

_Aug 8, 2024_

A big thanks to the 17 contributors who made this release possible. Here are some highlights ✨:

- Remove some deprecated props from the ListItem component (#41566) @thathva
- Bumped the minimum supported version of TypeScript (#43116) @mnajdova

### `@mui/material@6.0.0-beta.5`

#### BREAKING CHANGES

- &#8203;<!-- 14 -->[material-ui][ListItem] Removing deprecated props (#41566) @thathva

  `ListItem`'s props `autoFocus`, `button`, `disabled`, and `selected`, deprecated in v5, have been removed. To replace the `button` prop, use `ListItemButton` instead. The other removed props are available in the `ListItemButton` component as well.

  ```diff
  -<ListItem button />
  +<ListItemButton />
  ```

  Use this codemod to migrate your project to the `ListItemButton` component:

  ```bash
  npx @mui/codemod@next v6.0.0/list-item-button-prop <path/to/folder>
  ```

  As the `ListItem` no longer supports these props, the class names related to these props were removed. You should use the `listItemButtonClasses` object instead.

  ```diff
  -import { listItemClasses } from '@mui/material/ListItem';
  +import { listItemButtonClasses } from '@mui/material/ListItemButton';

  - listItemClasses.button
  + listItemButtonClasses.root

  - listItemClasses.focusVisible
  + listItemButtonClasses.focusVisible

  - listItemClasses.disabled
  + listItemButtonClasses.disabled

  - listItemClasses.selected
  + listItemButtonClasses.selected
  ```

#### Changes

- &#8203;<!-- 36 -->[material-ui][Autocomplete] Fix default value for multiple mode getting redefined with React 19 (#43189) @DiegoAndai
- &#8203;<!-- 12 -->[material-ui] Merge `CssVarsProvider` into `ThemeProvider` (#43115) @siriwatknp
- &#8203;<!-- 11 -->[material-ui] Make tests compatible with React 19 (#43155) @DiegoAndai
- &#8203;<!-- 10 -->[material-ui] Refine Blog template (#42825) @zanivan
- &#8203;<!-- 09 -->[material-ui] Element ref access React 19 compatibility (#43132) @DiegoAndai
- &#8203;<!-- 08 -->[material-ui][mui-system] Add support for version runtime checks (#43190) @DiegoAndai

### `@mui/material-pigment-css@6.0.0-beta.5`

- &#8203;<!-- 13 -->Reexport Pigment CSS from index file (#43218) @siriwatknp

### `@mui/codemod@6.0.0-beta.5`

- &#8203;<!-- 31 -->Fix codemod crash on MuiDivider property (#43125) @Janpot

### Docs

- &#8203;<!-- 37 -->Fix resolution of @mui/material-ui in docs (#43108) @Janpot
- &#8203;<!-- 25 -->Refine and polish out Templates page (#43131) @zanivan
- &#8203;<!-- 24 -->Fix the link test script (#43195) @alexfauquette
- &#8203;<!-- 23 -->Fix alpha usage (#43194) @siriwatknp
- &#8203;<!-- 22 -->Link Toolpad Core components from Material UI docs (#43036) @prakhargupta1
- &#8203;<!-- 21 -->Link Toolpad core docs to the docs menu (#42952) @prakhargupta1
- &#8203;<!-- 20 -->Polish migration guide (#43021) @oliviertassinari
- &#8203;<!-- 19 -->Fix 404 link to migration pages @oliviertassinari
- &#8203;<!-- 18 -->Support inject dynamic theme (#42879) @Vxee
- &#8203;<!-- 17 -->Fix 301 @oliviertassinari
- &#8203;<!-- 35 -->[blog] Announcing pricing changes Sep 2024 (#43061) @joserodolfofreitas
- &#8203;<!-- 15 -->[material-ui][TextField] Remove mentions of `redux-form` from TextField documentation (#43176) @AbdurRahman2004

### Core

- &#8203;<!-- 34 -->[code-infra] Fix `@mui/internal-test-utils` `screen` export type (#43150) @LukasTy
- &#8203;<!-- 33 -->[code-infra] Do not look for changes with previous commit when releasing a canary version (#43129) @michaldudak
- &#8203;<!-- 32 -->[code-infra] Automate canary releases (#43066) @michaldudak
- &#8203;<!-- 30 -->[core] Apply top-level eslint rule to docs and fix violations (#43126) @Janpot
- &#8203;<!-- 29 -->[core] Patch styled-components to use React.JSX namespace (#43205) @aarongarciah
- &#8203;<!-- 28 -->[core] Replace JSX namespace usages with React.JSX (#43204) @aarongarciah
- &#8203;<!-- 27 -->[core] Remove `react-router` package from `pigment-css-vite-app` (#43201) @ZeeshanTamboli
- &#8203;<!-- 26 -->[core] Remove unnecessary types packages from `@mui/internal-babel-macros` (#43193) @ZeeshanTamboli
- &#8203;<!-- 16 -->[docs-infra] Move `ApiPage` to TS (#43149) @alexfauquette
- &#8203;<!-- 07 -->[test] Remove unnecessary prop type check in test (#43211) @aarongarciah
- &#8203;<!-- 06 -->[test] Make conformance tests work with async render function (#43156) @michaldudak
- &#8203;<!-- 05 -->[typescript] Update the minimum supported version (#43116) @mnajdova
- &#8203;<!-- 04 -->[website] Add icons to core page products (#43151) @zanivan
- &#8203;<!-- 03 -->[website] Copyedit Docs and Product menu taglines (#43075) @samuelsycamore
- &#8203;<!-- 02 -->[website] Fix wrong link in pricing table (#43141) @zanivan
- &#8203;<!-- 01 -->[website] Add blog link to pricing table (#43123) @zanivan

All contributors of this release in alphabetical order: @aarongarciah, @AbdurRahman2004, @alexfauquette, @DiegoAndai, @Janpot, @joserodolfofreitas, @LukasTy, @michaldudak, @mnajdova, @oliviertassinari, @prakhargupta1, @samuelsycamore, @siriwatknp, @thathva, @Vxee, @zanivan, @ZeeshanTamboli

## 6.0.0-beta.4

<!-- generated comparing v6.0.0-beta.3..next -->

_Jul 30, 2024_

A big thanks to the 12 contributors who made this release possible.

### `@mui/material@6.0.0-beta.4`

- [Accordion] Render a heading wrapping `AccordionSummary` button per W3C Accordion Pattern standards (#42914) @ZeeshanTamboli
- [Divider] Enable borderStyle enhancement in divider with children (#42715) @anuujj
- [ImageListItemBar] Deprecate composed classes (#42905) @sai6855
- Attach selector for default color scheme (#43035) @siriwatknp
- Stabilize Grid v2 and deprecate Grid v1 (#43054) @DiegoAndai

### `@mui/system@6.0.0-beta.4`

- Make `createBreakpoints` independent for stringify theme (#43048) @siriwatknp

### `@mui/utils@6.0.0-beta.4`

- Fix issues reported by the React Compiler (#43051) @markliu2013

### Docs

- [material-ui] Replace deprecated `<ListItem button/>` with `ListItemButton` component in routing libraries list example (#43110) @aliharis99
- [material-ui][Card] Update CardMedia description (#43067) @shahzaibdev1
- [material-ui] Polish out data table demo (#43072) @zanivan
- [material-ui][Snackbar] Improve reason type in demos (#43077) @sai6855
- [pigment-css] Fix syntax in migrating-to-pigment-css guide (#43107) @KevinVandy
- Fix page description line break @oliviertassinari

### Core

- Fix event naming convention @oliviertassinari
- [docs-infra] Move ads to the `@mui/docs` package (#42944) @alexfauquette
- [website] Fine-tune button styles on the branding theme (#43082) @zanivan

All contributors of this release in alphabetical order: @alexfauquette, @aliharis99, @anuujj, @DiegoAndai, @KevinVandy, @markliu2013, @oliviertassinari, @sai6855, @shahzaibdev1, @siriwatknp, @zanivan, @ZeeshanTamboli

## 6.0.0-beta.3

<!-- generated comparing v6.0.0-beta.2..next -->

_Jul 24, 2024_

A big thanks to the 17 contributors who made this release possible. Here are some highlights ✨:

- 🚀 New version of the free Dashboard template, now with more components and an improved layout.

### `@mui/codemod@6.0.0-beta.3`

- &#8203;<!-- 17 -->Fix Divider props codemod (#42919) @aarongarciah

### `@mui/material@6.0.0-beta.3`

- &#8203;<!-- 06 -->Fix Accessing element.ref (#42818) @sai6855
- &#8203;<!-- 05 -->Refine `extendTheme` and `CssVarsProvider` API (#42839) @siriwatknp
- &#8203;<!-- 03 -->[Typography] Deprecate `paragraph` prop (#42383) @walston
- &#8203;<!-- 03 -->[Rating] fix defaultLabelText a11y issue with undefine value input and hint (#42810) @ZouYouShun

### `@mui/material-nextjs@6.0.0-beta.3`

- &#8203;<!-- 04 -->[material-ui-nextjs] Add @emotion/react as peer dependency (#42885) @jeloagnasin
- &#8203;<!-- 02 -->[material-ui-nextjs] Remove @mui/material as peer dependency (#43041) @brijeshb42

### `@mui/utils@6.0.0-beta.3`

- &#8203;<!-- 02 -->[utils] Add dependency to @mui/types (#43029) @mnajdova

### Docs

- &#8203;<!-- 22 -->[material-ui][joy-ui][Autocomplete] Fix `Hint` demo (#42990) @ManthanGajjar
- &#8203;<!-- 19 -->[docs] Make `DemoSandbox` agnostic of `productId` (#43042) @Janpot
- &#8203;<!-- 16 -->[docs] Use slot variants over `theme.variants` (#42614) @siriwatknp
- &#8203;<!-- 13 -->[docs] Remove stringify theme import (#43032) @siriwatknp
- &#8203;<!-- 12 -->[docs] Bring v5.x changes to the CHANGELOG @oliviertassinari
- &#8203;<!-- 11 -->[docs] Fix migration typo (#42976) @mnajdova
- &#8203;<!-- 08 -->[material-ui] Add improvements to Dashboard template (#42445) @zanivan
- &#8203;<!-- 07 -->[material-ui] Fix broken image links in blog template (#42956) @navedqb

### Core

- &#8203;<!-- 23 -->[code-infra] Add toolpad npm scope to envinfo (#41942) @Janpot
- &#8203;<!-- 21 -->[code-infra] Fix pnpm lock file (#43030) @Janpot
- &#8203;<!-- 20 -->[code-infra] Run `react-17` and `react-next` workflows on the next branch (#42690) @cherniavskii
- &#8203;<!-- 19 -->[code-infra] Make `useReactVersion` script reusable in other repos (#42828) @cherniavskii
- &#8203;<!-- 18 -->[code-infra] Add toolpad npm scope to envinfo (#41942) @Janpot
- &#8203;<!-- 16 -->[core] Add pigment and Base UI scopes to envinfo (#43002) @Janpot
- &#8203;<!-- 15 -->[core] Update minimum version of Node.js to 14.0.0 (#42920) @DiegoAndai
- &#8203;<!-- 14 -->[core] Expose missing screen methods from Testing Library (#42968) @aarongarciah
- &#8203;<!-- 10 -->[docs-infra] Leave TODO for warnOnce to reduce bundle size @oliviertassinari
- &#8203;<!-- 09 -->[docs-infra] Remove `display: flex` from `SectionTitle` (#42979) @LukasTy
- &#8203;<!-- 02 -->[test][material-ui] Remove unnecessary async act calls (#42942) @aarongarciah
- &#8203;<!-- 01 -->[website] Fix strange focus-visible on hover (#42924) @oliviertassinari

All contributors of this release in alphabetical order: @aarongarciah, @bharatkashyap, @brijeshb42, @cherniavskii, @DiegoAndai, @Janpot, @jeloagnasin, @LukasTy, @ManthanGajjar, @mnajdova, @navedqb, @oliviertassinari, @sai6855, @siriwatknp, @walston, @zanivan, @ZouYouShun

## 6.0.0-beta.2

<!-- generated comparing v6.0.0-beta.1..next -->

_Jul 16, 2024_

### `@mui/material@6.0.0-beta.2`

- &#8203;<!-- 1 -->[material] Add missing dependency (#42961) @mnajdova

### Docs

- &#8203;<!-- 2 -->[docs] Move feedback from Canny to GitHub @oliviertassinari

All contributors of this release in alphabetical order: @mnajdova, @oliviertassinari

## 6.0.0-beta.1

<!-- generated comparing v6.0.0-beta.0..next -->

_Jul 16, 2024_

A big thanks to the 6 contributors who made this release possible.

### `@mui/material@6.0.0-beta.1`

- &#8203;<!-- 03 -->Remove dependency on @mui/base (#42907) @mnajdova
- &#8203;<!-- 02 -->Set material-pigment-css to public (#42912) @siriwatknp

### `@mui/codemod@6.0.0-beta.1`

- &#8203;<!-- 10 -->Support sx conditional inside spread element (#42894) @siriwatknp

### Docs

- &#8203;<!-- 07 -->Fix 301 link @oliviertassinari
- &#8203;<!-- 04 -->[material-ui] Add script to generate template screenshots (#42903) @siriwatknp

### Core

- &#8203;<!-- 09 -->[core] Remove custom hooks from the `mui-name-matches-component-name` linting rule (#42773) @flaviendelangle
- &#8203;<!-- 08 -->[core] Normalize rest / other to match the most common used @oliviertassinari
- &#8203;<!-- 06 -->[docs-infra] Move Ads component to TS (#42842) @alexfauquette
- &#8203;<!-- 05 -->[docs-infra] Support code tabs overflow (#42913) @arminmeh
- &#8203;<!-- 01 -->[website] Sync /about page @oliviertassinari

All contributors of this release in alphabetical order: @alexfauquette, @arminmeh, @flaviendelangle, @mnajdova, @oliviertassinari, @siriwatknp

## 6.0.0-beta.0

<!-- generated comparing v6.0.0-alpha.14..next -->

_Jul 11, 2024_

A big thanks to the 12 contributors who made this release possible. Here are some highlights ✨:

- 🎉 This is the first v6 beta release! A huge thanks to everyone who helped to make this happen! The target date for a stable release is the 28th of July. The next month will be used to polish v6, and ease the migration from v5. You can follow the [v6 stable milestone](https://github.com/mui/material-ui/milestone/42) for more details.
- 🚀 All planned breaking changes are completed.

### `@mui/material@v6.0.0-beta.0`

- Revert deprecation warnings for `*Components` and `*Props` for v6 (#42466) @lhilgert9
- Performance: lazy Ripple (#41061) @romgrk
- [AppBar] Fix inherit color is inconsistent between ThemeProvider and CssVarsProvider (#42714) @ZeeshanTamboli
- [Autocomplete] Add new AutocompleteInputChangeReason (#37301) @binh1298

### `@mui/material-pigment-css@v6.0.0-beta.0`

- Create a wrapper package over Pigment CSS (#42819) @brijeshb42

### `@mui/base@5.0.0-beta.53`

- [Autocomplete] Add new AutocompleteInputChangeReason (#37301) @binh1298

### Docs

- Replace v6 "alpha" mentions with "beta" (#42895) @DiegoAndai
- Fix typos (#42862) @omahs
- Fix issues reported by react compiler in docs folder (#42881) @sai6855
- Fix 301 @oliviertassinari
- [LinearProgress] Fix buffer demo (#42858) @mbrookes
- Adjust site to add Toolpad on the homepage (#38604) @bharatkashyap

### Core

- Fix imports in `Demo` component (#42857) @LukasTy
- Use @mui/docs/HighlightedCodeWithTabs in markdown (#42841) @Janpot
- Simpler pnpm dedupe error message to act on @oliviertassinari
- Fix split infinitive use in tests @oliviertassinari
- [lab] Fix issues reported by react-compiler in mui-lab (#42880) @sai6855

All contributors of this release in alphabetical order: @bharatkashyap, @brijeshb42, @DiegoAndai, @Janpot, @lhilgert9, @LukasTy, @mbrookes, @oliviertassinari, @omahs, @romgrk, @sai6855, @ZeeshanTamboli

## 6.0.0-alpha.14

<!-- generated comparing v6.0.0-alpha.13..next -->

_Jul 3, 2024_

A big thanks to the 12 contributors who made this release possible. Here are some highlights ✨:

- ✨ Updated Grid v2 to match PigmentGrid (#42742) @DiegoAndai

### `@mui/material@v6.0.0-alpha.14`

#### BREAKING CHANGES

- [Grid] Update Grid props to match PigmentGrid (#42742) @DiegoAndai

  Use the codemod below to migrate the props:

  ```bash
  npx @mui/codemod@next v6.0.0/grid-v2-props /path/to/folder
  ```

#### Changes

- [Alert] Add ability to override slot props (#42787) @alexey-kozlenkov
- [Dialog] Revert incorrect textAlign style removal (#42778) @DiegoAndai
- [theme] Support `CssVarsTheme` in `responsiveFontSizes` return type (#42786) @jxdp

### Docs

- [material-ui] Add some writing tweaks to v6 migration page (#42623) @danilo-leal
- [material-ui] Fix issues reported by react-compiler in docs folder (#42830) @sai6855
- [material-ui] Add some writing tweaks to v6 migration page (#42623) @danilo-leal
- [base-ui] Fix wrong description for `UseTabParameters.onChange` (#42749) @ohgree
- Fix 301 MDN redirections @oliviertassinari

### Core

- [core] Bump React to 18.3.1 (#42047) @renovate[bot]
- [core] Revert lint for `useThemeProps` (#42817) @siriwatknp
- [core] Remove useIsFocusVisible util (#42467) @DiegoAndai
- [core] Remove react-test-renderer (#42784) @aarongarciah
- [core][mui-utils] Remove remaining IE11 references (#42777) @DiegoAndai
- [code-infra] Move `HighlightedCode` test into `@mui/docs` package (#42835) @LukasTy
- [code-infra] Cleanup `@mui/docs` usage and legacy re-exports (#42833) @LukasTy
- [docs-infra] Fix React Compiler ESLint issues in website components (#42566) @aarongarciah
- [docs-infra] Add batch of design polish (#42823) @danilo-leal
- [test][mui-utils] Remove usages of deprecated react-dom APIs (#42780) @aarongarciah
- [test][joy-ui][Autocomplete] Fix spread key error in test (#42775) @aarongarciah

All contributors of this release in alphabetical order: @aarongarciah, @alexey-kozlenkov, @danilo-leal, @DiegoAndai, @Janpot, @jxdp, @LukasTy, @ohgree, @oliviertassinari, @renovate[bot], @sai6855, @siriwatknp

## 6.0.0-alpha.13

<!-- generated comparing v6.0.0-alpha.12..next -->

_Jun 27, 2024_

A big thanks to the 10 contributors who made this release possible. Here are some highlights ✨:

- 🚀 Added layout components for Pigment CSS integration (#42693) @siriwatknp

### `@mui/material@6.0.0-alpha.13`

- [Autocomplete] Fix more React 18.3 key spread warnings in demos (#42639) @wbt
- [Container][Grid][Stack][Hidden] Export Pigment CSS layout components (#42693) @siriwatknp
- [Text Field] when click password visibility button, text caret position change to very front. (#42595) @appleSimple
- [Modal] migrate useSlotProps to useSLot (#42150) @sai6855

### `@mui/styles@6.0.0-alpha.13`

- [withStyles] Expect React defaultProps warning in test (#42752) @aarongarciah

### Docs

- Fix link in CONTRIBUTING.md (#42755) @Janpot
- Add documentation on migrating JSS's alternative, array-based syntax to syntax supported by Emotion (#42053) @cjl750
- Fix type error in virtualized table demo (#42757) @aarongarciah
- Add first batch of v6 migration (#42242) @siriwatknp
- Fix quotes on font-family dedeclaration in the Landing Page template theme (#42748) @joetats

### Core

- [code-infra] Refactor eslint `import/no-cycle` rule (#42705) @LukasTy
- [core] Target direct version for prerelease (#42768) @siriwatknp
- [test] Remove enzyme (#42706) @aarongarciah
- [test] Remove createMount test util (#42703) @aarongarciah
- [website] Add Ale to team (#42764) @alelthomas

All contributors of this release in alphabetical order: @aarongarciah, @alelthomas, @appleSimple, @cjl750, @Janpot, @joetats, @LukasTy, @sai6855, @siriwatknp, @wbt

## 6.0.0-alpha.12

<!-- generated comparing v6.0.0-alpha.11..next -->

_Jun 24, 2024_

A big thanks to the 17 contributors who made this release possible.

### `@mui/material@6.0.0-alpha.12`

- Add `InitColorSchemeScript` for Next.js App Router (#42247) @siriwatknp
- [Autocomplete] Fix renderOption props type (#42689) @DiegoAndai
- [Autocomplete] Fix React 18.3 key spread warnings in Autocomplete demos (#42691) @aarongarciah
- Support Pigment CSS for `CssBaseline`, `ScopedCssBaseline` and `Popper` (#42640) @siriwatknp
- Add `DefaultPropsProvider` for Pigment CSS integration (#42638) @siriwatknp
- [Stepper] Generate class for nonLinear prop (#42620) @alexismo
- [Tab] Fix failing test (#42686) @aarongarciah
- [Tab] Deprecate iconWrapper class for icon class (#42647) @sai6855
- [TableSortLabel] Deprecate composed classes (#42281) @sai6855
- [usePagination] Update pagination `siblingsEnd` calculation logic (#42667) @Mini-ghost

### `@mui/codemod@6.0.0-alpha.12`

- Support dynamic props styled transformation (#42683) @siriwatknp

### `@mui/system@6.0.0-alpha.12`

- Fix issues reported by react compiler in `mui-system` package (#42637) @sai6855
- [useMediaQuery] Remove deprecated types (#42560) @aarongarciah

### `@mui/joy@5.0.0-beta.45`

- Fix issues reported by the React Compiler (#42671) @anuujj
- [Autocomplete] Fix React spread key warning (#42741) @aarongarciah

### `@mui/lab@6.0.0-alpha.12`

- [LoadingButton] Apply wrapping element to prevent React crash on Google page translation (#35198) @BartJanvanAssen

### Docs

- Fix git diff format in migration to v6 (#42711) @oliviertassinari
- Use new email for sponsoring @oliviertassinari
- Fix 301 links (#42697) @alexfauquette
- Normalize the capitalization of Design Kit @oliviertassinari
- Recommend setting HTML attribute instead of DOM property for RTL (#42599) @aarongarciah
- [material-ui][Select] Fix the `SelectAutoWidth` demo menu item value (#42648) @Danielkhakbaz

### Core

- [code-infra] Try disabling animations when taking screenshots (#42537) @Janpot
- [code-infra] Fix benchmark package (#42553) @Janpot
- [core] Replace enzyme in describeConformance (#42447) @DiegoAndai
- [docs-infra] Fix layout shift demo toolbar (#42743) @oliviertassinari
- [docs-infra] Fix visual look of in-house ad (#42735) @oliviertassinari
- [docs-infra] Add stray design polish (#42646) @danilo-leal
- [docs-infra] Fix wrong migration (#42675) @siriwatknp
- [docs-infra] Fine tune markdown elements design (#42643) @danilo-leal
- [docs-infra] Revamp the product switcher design (#42603) @danilo-leal
- [docs-infra] Allow Link component to receive the `role` attribute (#42629) @danilo-leal
- [infra] Add support donation button (#42499) @oliviertassinari
- [infra] Raise `tsconfig`/`tsc` target to `es2022` (#42645) @LukasTy
- [test] Fix tests on CI (#42670) @michaldudak
- [test] Fix issues reported by react-compiler in test packages (#42626) @sai6855
- [website] Add Armin to the team members (#42679) @arminmeh
- [website] Open Staff Engineer role for Pigment CSS (#42531) @mnajdova

All contributors of this release in alphabetical order: @aarongarciah, @alexfauquette, @alexismo, @anuujj, @arminmeh, @BartJanvanAssen, @Danielkhakbaz, @danilo-leal, @DiegoAndai, @Janpot, @LukasTy, @michaldudak, @Mini-ghost, @mnajdova, @oliviertassinari, @sai6855, @siriwatknp

## 6.0.0-alpha.11

<!-- generated comparing v6.0.0-alpha.10..next -->

_Jun 11, 2024_

A big thanks to the 18 contributors who made this release possible.

### `@mui/material@6.0.0-alpha.11`

- &#8203;<!-- 38 -->[Autocomplete] Shouldn't resize when hovering (#42452) @ZeeshanTamboli
- &#8203;<!-- 37 -->[Chip] Fix focus issue related with the Escape event (#41578) @shrilsharma
- &#8203;<!-- 12 -->[Grid] Fix support for CSS variables (#42574) @oliviertassinari
- &#8203;<!-- 11 -->[InputBase] Use `globalCss` for Pigment integration (#42431) @siriwatknp
- &#8203;<!-- 10 -->Change React.ReactElement type from `any` to `unknown` (#42473) @sai6855
- &#8203;<!-- 09 -->Integrate `extendSxProp` adapter (#42543) @siriwatknp
- &#8203;<!-- 08 -->[Tab] Fix applying `iconWrapper` styles from theme and update its description (#42549) @sai6855
- &#8203;<!-- 08 -->[pigment-css] Add `stringifyTheme` for Pigment CSS integration (#42476) @siriwatknp

### `@mui/system@6.0.0-alpha.11`

- &#8203;<!-- 11 -->[Grid] Remove `disableEqualOverflow` by using `gap` (#42526) @DiegoAndai
- &#8203;<!-- 07 -->[useMediaQuery] Drop Safari < 14 support (#42464) @aarongarciah

### `@mui/utils@6.0.0-alpha.11`

- &#8203;<!-- 04 -->Allow passing `NaN` as `defaultValue` to `useControlled` (#41559) @iammminzzy

### `@mui/codemod@6.0.0-alpha.11`

- &#8203;<!-- 39 -->Improve styled and sx prop transformation (#42598) @siriwatknp
- &#8203;<!-- 36 -->Support more cases for sx-prop transformation (#42527) @siriwatknp

### `@mui/private-theming@6.0.0-alpha.11`

- &#8203;<!-- 09 -->Fix issues reported by react compiler in `mui-private-theming` components (#42619) @sai6855

### Docs

- &#8203;<!-- 31 -->Add `theme.applyStyles` and migrate docs (#42498) @siriwatknp
- &#8203;<!-- 29 -->Fix dashboard template console error (#42594) @oliviertassinari
- &#8203;<!-- 28 -->Migrate system props to `sx` prop (#42475) @siriwatknp
- &#8203;<!-- 27 -->[material-ui]Fix duplicated sentence (#42521) @alexfauquette
- &#8203;<!-- 22 -->[Grid] Fix docs spacing (#42573) @oliviertassinari
- &#8203;<!-- 21 -->[joy-ui] Add Next.js App Router instructions on how to prevent flickering (#42514) @devnyxie
- &#8203;<!-- 20 -->[joy-ui] Fix HTML tag without preformatting (#42525) @jacobmoshipco
- &#8203;<!-- 19 -->[material-ui] Add docs for complementary stepper components (#41900) @anle9650
- &#8203;<!-- 18 -->[material-ui] Fix typo on Sign-in/Sign-up templates (#42605) @zanivan
- &#8203;<!-- 17 -->[material-ui] Add container queries docs (#42434) @siriwatknp
- &#8203;<!-- 16 -->[material-ui] Fix ESLint error in Stepper demo (#42559) @aarongarciah
- &#8203;<!-- 15 -->[material-ui] Shorten useMediaQuery subheading (#42561) @aarongarciah
- &#8203;<!-- 14 -->[material-ui] Add a Refine example project (#42461) @necatiozmen

### Core

- &#8203;<!-- 39 -->[website] Move the `React Engineer - X` role to future roles (#42532) @DanailH
- &#8203;<!-- 35 -->[core] Allow `for..of` loops (#42600) @michaldudak
- &#8203;<!-- 34 -->[core] Add comment about Object.js @oliviertassinari
- &#8203;<!-- 33 -->[core] Disable eslint-plugin-react-compiler for Base (#42563) @aarongarciah
- &#8203;<!-- 33 -->[core] Group Pigment CSS dependencies (#42174) @siriwatknp
- &#8203;<!-- 32 -->[core] Configure eslint-plugin-react-compiler (#42555) @aarongarciah
- &#8203;<!-- 31 -->[core] Skip charts animation for visual regression test (#42530) @alexfauquette
- &#8203;<!-- 26 -->[docs-infra] Simplify click header (#42593) @oliviertassinari
- &#8203;<!-- 25 -->[docs-infra] Add configurable jsdoc host variable (#42472) @tonygravell
- &#8203;<!-- 25 -->[docs-infra] Add the Base UI logo with copy functionality (#42446) @danilo-leal
- &#8203;<!-- 24 -->[docs-infra] Prevent link anchor when selecting text (#41994) @alexfauquette
- &#8203;<!-- 23 -->[docs-infra] Add the Base UI logo with copy functionality (#42446) @danilo-leal
- &#8203;<!-- 13 -->[examples] Remove Pigment CSS examples (#42471) @sai6855
- &#8203;<!-- 06 -->[test] Restore pnpm tc command (#42572) @oliviertassinari
- &#8203;<!-- 05 -->[test] Restore testing internal packages (#42519) @michaldudak
- &#8203;<!-- 03 -->[website] Close Developer Advocate / Content Engineer role @oliviertassinari
- &#8203;<!-- 02 -->[website] Remove blank line @oliviertassinari
- &#8203;<!-- 01 -->[website] Fix mobile layout shift @oliviertassinari

All contributors of this release in alphabetical order: @aarongarciah, @alexfauquette, @anle9650, @DanailH, @danilo-leal, @devnyxie, @DiegoAndai, @iammminzzy, @jacobmoshipco, @michaldudak, @necatiozmen, @oliviertassinari, @sai6855, @shrilsharma, @siriwatknp, @tonygravell, @zanivan, @ZeeshanTamboli

## 6.0.0-alpha.10

<!-- generated comparing v6.0.0-alpha.9..next -->

_Jun 4, 2024_

A big thanks to the 7 contributors who made this release possible.

### `@mui/material@6.0.0-alpha.10`

- &#8203;<!-- 26 -->[Backdrop] Deprecate `components` and `componentsProps` (#42468) @DiegoAndai
- &#8203;<!-- 25 -->[Collapse] Bound max transition time (#42390) @oliviertassinari
- &#8203;<!-- 12 -->[FilledInput] Remove unapplied classes from filledInputClasses interface and add missing classes to root (#42082) @sai6855
- &#8203;<!-- 11 -->[InputBase] Deprecate components and componentProps props for v6 (#42093) @ChronicusUA
- &#8203;<!-- 10 -->Remove remaining IE11 code (#42283) @DiegoAndai
- &#8203;<!-- 09 -->[Modal] Deprecate `components` and `componentsProps` (#42469) @DiegoAndai
- &#8203;<!-- 08 -->[Popover] Migrate useSlotProps to useSlot (#42369) @sai6855
- &#8203;<!-- 07 -->[useMediaQuery] Remove unused useMediaQueryTheme (#42367) @aarongarciah

### `@mui/system@6.0.0-alpha.10`

- &#8203;<!-- 06 -->Remove IE11 code (#42436) @DiegoAndai

### Docs

- &#8203;<!-- 23 -->Reflect Base UI and MUI System in a different repository @oliviertassinari
- &#8203;<!-- 22 -->Update twitter.com to x.com @oliviertassinari
- &#8203;<!-- 21 -->Simplify Example projects page @oliviertassinari
- &#8203;<!-- 17 -->[icons] Update README and docs page (#41938) @danilo-leal
- &#8203;<!-- 16 -->[material-ui] Add changelog section to the design kits page (#42449) @danilo-leal
- &#8203;<!-- 15 -->[material-ui] Fix sentence in the All components page (#42336) @danilo-leal
- &#8203;<!-- 14 -->[material-ui] Update Figma design kit doc redirect link (#42448) @danilo-leal
- &#8203;<!-- 13 -->[system] Add "dynamic values" section to sx prop page (#42239) @aarongarciah

### Core

- &#8203;<!-- 20 -->[docs-infra] Update the OG card image design (#42470) @danilo-leal
- &#8203;<!-- 19 -->[docs-infra] Add small design polish (#42455) @danilo-leal
- &#8203;<!-- 18 -->[docs-infra] Update the Material logo + add copy functionality (#42435) @danilo-leal
- &#8203;<!-- 05 -->[website] Update DoiT description and link in Sponsors section (#42505) @erezstmn-doit
- &#8203;<!-- 04 -->[website] Clean up the docs-infra job ad (#42504) @danilo-leal
- &#8203;<!-- 03 -->[website] Fix FlashCode position (#42139) @oliviertassinari
- &#8203;<!-- 02 -->[website] Open Docs-infra engineer role (#42101) @danilo-leal
- &#8203;<!-- 01 -->[website] Fix locationCountry in about page @oliviertassinari

All contributors of this release in alphabetical order: @aarongarciah, @ChronicusUA, @danilo-leal, @DiegoAndai, @erezstmn-doit, @oliviertassinari, @sai6855

## 6.0.0-alpha.9

<!-- generated comparing v6.0.0-alpha.8..next -->

_May 29, 2024_

A big thanks to the 23 contributors who made this release possible. Here are some highlights ✨:

- 🚀 `CssVarsProvider` and `extendTheme` are now stable (#42246) @siriwatknp

### `@mui/material@6.0.0-alpha.9`

- &#8203;<!-- 49 -->[AlertTitle] Enable extending Typography props (#42269) @lucasgmelo
- &#8203;<!-- 48 -->[AvatarGroup] deprecate `componentsProps` for v6 (#42122) @lhilgert9
- &#8203;<!-- 15 -->[Grid] Deprecate `wrap` prop (#42363) @fedirjh
- &#8203;<!-- 14 -->[ListItem] Document `*Component` and `*Props` props deprecations (#42263) @aarongarciah
- &#8203;<!-- 13 -->[ListItem] Deprecate ListItem's components and componentsProps (#42219) @aarongarciah
- &#8203;<!-- 12 -->[ListItemSecondaryAction] Deprecate component (#42251) @aarongarciah
- &#8203;<!-- 11 -->Stabilize `CssVarsProvider` and `extendTheme` (#42246) @siriwatknp
- &#8203;<!-- 10 -->[Popper] Deprecate components and componentProps props for v6 (#42111) @ChronicusUA
- &#8203;<!-- 09 -->[responsiveFontSizes] Handled undefined variants (#42412) @brijeshb42
- &#8203;<!-- 08 -->[Slider] Fix wrong CSS value (#42370) @mnajdova
- &#8203;<!-- 07 -->[Tooltip] Deprecate components and componentProps props for v6 (#42107) @ChronicusUA

### `@mui/system@6.0.0-alpha.9`

- &#8203;<!-- 34 -->[createStyled] Intercept `ownerState` coming from `props` and `ownerState` (#42358) @DiegoAndai

### `@mui/codemod@6.0.0-alpha.9`

- &#8203;<!-- 41 -->Add `sx` prop for v6 migration (#42153) @siriwatknp
- &#8203;<!-- 40 -->Add codemod for removing system props (#42282) @siriwatknp

### Docs

- &#8203;<!-- 33 -->Remove unused images (#42324) @danilo-leal
- &#8203;<!-- 32 -->Add Pigment CSS and Base UI logos SVGs (#42322) @danilo-leal
- &#8203;<!-- 22 -->[joy-ui] Fix template responsiveness (#42422) @j4marcos
- &#8203;<!-- 21 -->[material-ui] Add the Pashto locale (#42244) @sayoubiaf
- &#8203;<!-- 20 -->[material-ui] Remove duplicate Design Kits page (#42338) @danilo-leal
- &#8203;<!-- 19 -->[material-ui] Document callback to access theme in GlobalStyles (#42257) @aarongarciah
- &#8203;<!-- 18 -->[material-ui] Add minor modifications to the Vertical stepper demo (#42342) @mihilt
- &#8203;<!-- 17 -->[material-ui][Tabs] Improve the Basic Tabs demo (#42374) @MatheusEli
- &#8203;<!-- 16 -->[pigment-css] Polish redirection mention @oliviertassinari

### Core

- &#8203;<!-- 47 -->[blog] Add fixes and clean ups to the Blog page (#42311) @danilo-leal
- &#8203;<!-- 46 -->[blog] Add the "Product" tag to the Pigment CSS post (#42365) @danilo-leal
- &#8203;<!-- 45 -->[code-infra] Simplify .stylelintrc.js @oliviertassinari
- &#8203;<!-- 44 -->[code-infra] Fix stylelint locally (#42411) @oliviertassinari
- &#8203;<!-- 43 -->[code-infra] Run corepack enable on all CI jobs (#42331) @Janpot
- &#8203;<!-- 42 -->[code-infra] Create examples eslint rule (#42170) @oliviertassinari
- &#8203;<!-- 39 -->[core] Apply React 19 type changes that don't require upcoming `@types/` packages (#42346) @DiegoAndai
- &#8203;<!-- 38 -->[core] Remove `react-swipeable-views-utils` package from docs (#42378) @ZeeshanTamboli
- &#8203;<!-- 37 -->[core] Update `@testing-library/react` and `@testing-library/dom` packages (#42349) @ZeeshanTamboli
- &#8203;<!-- 36 -->[core] Remove `@types/prettier` package (#42339) @ZeeshanTamboli
- &#8203;<!-- 35 -->[core] Remove `WyW-in-JS` from Renovate config (#42335) @ZeeshanTamboli
- &#8203;<!-- 31 -->[docs-infra] Split feedback channels per product (#42413) @alexfauquette
- &#8203;<!-- 30 -->[docs-infra] Avoid cryptic errors when tests don't exist (#42356) @Janpot
- &#8203;<!-- 29 -->[docs-infra] Make menu styles consistent (#42387) @danilo-leal
- &#8203;<!-- 28 -->[docs-infra] Display deprecation messages in API pages (#42352) @aarongarciah
- &#8203;<!-- 27 -->[docs-infra] Standardize API pages Alert styles (#42386) @danilo-leal
- &#8203;<!-- 26 -->[docs-infra] Fix Toolpad Core API links (#42362) @apedroferreira
- &#8203;<!-- 25 -->[docs-infra] Tigthen up the header design (#42180) @danilo-leal
- &#8203;<!-- 24 -->[docs-infra] Add Toolpad to muiNpmOrgs for codesandbox demos (#42316) @Janpot
- &#8203;<!-- 23 -->[docs-infra] Allow JSDoc tags (#42337) @aarongarciah
- &#8203;<!-- 06 -->[test] Remove `userAgent` override in `jsdom` env (#42344) @cherniavskii
- &#8203;<!-- 05 -->[utils] Fix GitHub-reported prototype pollution vulnerability in `deepmerge` (#41652) @tjcouch-sil
- &#8203;<!-- 04 -->[website] Add Nikita to the about page (#42418) @nikitaa24
- &#8203;<!-- 03 -->[website] Fix hero spacing changes applying at the wrong breakpoint (#42341) @KenanYusuf
- &#8203;<!-- 02 -->[website] Adds Kenan Yusuf to about page (#42317) @KenanYusuf
- &#8203;<!-- 01 -->[website] Improve about page @oliviertassinari

All contributors of this release in alphabetical order: @aarongarciah, @alexfauquette, @apedroferreira, @brijeshb42, @cherniavskii, @ChronicusUA, @danilo-leal, @DiegoAndai, @fedirjh, @j4marcos, @Janpot, @KenanYusuf, @lhilgert9, @lucasgmelo, @MatheusEli, @mihilt, @mnajdova, @nikitaa24, @oliviertassinari, @sayoubiaf, @siriwatknp, @tjcouch-sil, @ZeeshanTamboli

## 6.0.0-alpha.8

<!-- generated comparing v6.0.0-alpha.7..next -->

_May 21, 2024_

A big thanks to the 7 contributors who made this release possible.
This release was mostly about 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@6.0.0-alpha.7`

- &#8203;<!-- 04 -->[material-ui] Filter only valid theme palette for generating styles (#42147) @siriwatknp
- &#8203;<!-- 03 -->[material-ui] Remove UMD bundle (#42172) @ZeeshanTamboli
- &#8203;<!-- 02 -->[material-ui][TextField] Deprecate `*Props` props (#42062) @DiegoAndai

### Docs

- &#8203;<!-- 08 -->[docs] Remove Base UI from the README (#42307) @danilo-leal
- &#8203;<!-- 07 -->[docs][material-ui] Fix typo in style interoperability with Tailwind CSS docs (#42279) @ZeeshanTamboli
- &#8203;<!-- 06 -->[docs][material-ui] Add supported browsers section to migration guide (#42194) @DiegoAndai
- &#8203;<!-- 05 -->[docs][material-ui][Pagination] Clarify pagination `page` prop API (#42220) @Mandar-Pandya

### Core

- &#8203;<!-- 12 -->[blog] Update blog post OG image (#42270) @danilo-leal
- &#8203;<!-- 11 -->[blog] Update Pigment CSS post (#42266) @danilo-leal
- &#8203;<!-- 10 -->[docs] Remove LocalMonero (#42224) @oliviertassinari
- &#8203;<!-- 08 -->[docs-infra] Fix keyboard navigation on page tabs (#42152) @danilo-leal
- &#8203;<!-- 10 -->[code-infra] Remove raw-loader (#42275) @Janpot
- &#8203;<!-- 09 -->[core] Remove outdated Babel plugins (#42140) @ZeeshanTamboli
- &#8203;<!-- 12 -->[core] Fix a few more key spread issues (#42168) @oliviertassinari
- &#8203;<!-- 01 -->[website] Avoid duplicate simple vs. rich (#42100) @oliviertassinari

All contributors of this release in alphabetical order: @danilo-leal, @DiegoAndai, @Janpot, @Mandar-Pandya, @oliviertassinari, @siriwatknp, @ZeeshanTamboli

## 6.0.0-alpha.7

<!-- generated comparing v6.0.0-alpha.6..next -->

_May 16, 2024_

A big thanks to the 14 contributors who made this release possible.

### `@mui/material@6.0.0-alpha.7`

- &#8203;<!-- 23 -->[Autocomplete] Deprecate `componentsProps` props (#42179) @lhilgert9
- &#8203;<!-- 22 -->[Autocomplete] Improve design when there's a start adornment for small autocomplete (#41781) @TahaRhidouani
- &#8203;<!-- 21 -->[Autocomplete] deprecate `*Component` and `*Props` for v6 (#41875) @lhilgert9
- &#8203;<!-- 19 -->[CircularProgress] Deprecate composed classes (#42076) @sai6855
- &#8203;<!-- 05 -->[ToggleButtonGroup] Add missing `selected` class in ToggleButtonGroupClasses type (#42243) @tarunrajput

### `@mui/codemod@6.0.0-alpha.6`

- &#8203;<!-- 18 -->[Divider] Only apply codemod if light prop is present (#42098) @DiegoAndai

### Docs

- &#8203;<!-- 13 -->Fix 301 to Figma @oliviertassinari
- &#8203;<!-- 12 -->Fix use of deprecated React API (#42118) @oliviertassinari
- &#8203;<!-- 11 -->Remove the Base notification (#42191) @danilo-leal
- &#8203;<!-- 07 -->[material-ui] Improve descriptions for deprecated props (#42221) @aarongarciah
- &#8203;<!-- 06 -->[material-ui] Fix typo in composition docs (#42195) @aarongarciah

### Core

- &#8203;<!-- 20 -->[blog] Introducing Pigment CSS blog post (#42198) @samuelsycamore
- &#8203;<!-- 17 -->[core] Remove confusing comment @oliviertassinari
- &#8203;<!-- 16 -->[core] Match other repositories and convention @oliviertassinari
- &#8203;<!-- 15 -->[core] Fix React 18.3 warnings about spreading keys in the Material UI `Autocomplete` component (#42099) @heath-freenome
- &#8203;<!-- 14 -->[core] Remove unecessary quotes @oliviertassinari
- &#8203;<!-- 10 -->[docs-infra] Share code for section title (#42236) @alexfauquette
- &#8203;<!-- 09 -->[docs-infra] Limit the copy button to the visible code block (#42115) @danilo-leal
- &#8203;<!-- 08 -->[docs-infra] Make select components with two capital letters (#42004) @alexfauquette
- &#8203;<!-- 08 -->[docs-infra][toolpad] Fix Page title and SERP title mismatch (#41919) @bharatkashyap
- &#8203;<!-- 05 -->[website] Add redirection for talk @oliviertassinari
- &#8203;<!-- 04 -->[website] Adds Arthur Balduini team info (#42193) @arthurbalduini
- &#8203;<!-- 03 -->[website] Update the role template file (#42192) @danilo-leal
- &#8203;<!-- 02 -->[website] Update MUI X deps and migrate TreeView demos to v7 API (#42149) @noraleonte
- &#8203;<!-- 01 -->[website] Fix pricing casing (#42178) @aarongarciah

All contributors of this release in alphabetical order: @aarongarciah, @alexfauquette, @arthurbalduini, @bharatkashyap, @danilo-leal, @DiegoAndai, @heath-freenome, @lhilgert9, @noraleonte, @oliviertassinari, @sai6855, @samuelsycamore, @TahaRhidouani, @tarunrajput

## 6.0.0-alpha.6

<!-- generated comparing v6.0.0-alpha.5..next -->

_May 8, 2024_

A big thanks to the 10 contributors who made this release possible.

### `@mui/material@6.0.0-alpha.6`

- [Chip] Add colorDefault class to chipClasses (#42067) @sai6855
- Migrate components to support CSS extraction (#42001) @siriwatknp
- [SpeedDial] Deprecate TransitionComponent (#40698) @harry-whorlow

### `@mui/codemod@6.0.0-alpha.6`

- Add `theme-v6` migration (#42056) @siriwatknp

### `@mui/icons-material@6.0.0-alpha.6`

- Add the Emergency icon (#42080) @danilo-leal

### Docs

- [autocomplete] Fix duplicate autocomplete id (#42086) @oliviertassinari
- Fix SEO redirection issues @oliviertassinari
- [material-ui] Fix broken link (#42142) @aarongarciah
- [material-ui][docs] Fix link on the Sync page (#42088) @danilo-leal

### Core

- [blog] Shorten title to fit @oliviertassinari
- [blog] Update Sync post OG image (#42114) @danilo-leal
- [blog] A few tweaks in introducing-sync-plugin (#42092) @oliviertassinari
- [code-infra] Add canary release scripts (#41949) @michaldudak
- [code-infra] Move ComponentLinkHeader to @mui/docs (#42061) @Janpot
- [code-infra] Bump node image used by CI in docker (#42079) @LukasTy
- [core] Restrict import path with ESLint (#41970) @oliviertassinari
- [docs-infra] Add design and formatting improvements (#42063) @danilo-leal
- [docs-infra] Fix HTML structure violations (#42085) @oliviertassinari
- [website] Componentize a few Careers page sections (#42102) @danilo-leal
- [website] Refine the InfoCard design (#42116) @danilo-leal
- [website] Fix home page slider's track position (#42141) @aarongarciah
- [website] Closing the survey @oliviertassinari
- [website] Remove Survey banner from website and Core docs (#42104) @joserodolfofreitas

All contributors of this release in alphabetical order: @aarongarciah, @danilo-leal, @harry-whorlow, @Janpot, @joserodolfofreitas, @LukasTy, @michaldudak, @oliviertassinari, @sai6855, @siriwatknp

## 6.0.0-alpha.5

<!-- generated comparing v6.0.0-alpha.4..next -->

_May 1, 2024_

A big thanks to the 9 contributors who made this release possible.

### `@mui/material@6.0.0-alpha.5`

- [FormControlLabel] Deprecate `componentsProps` (#41767) @sai6855
- [PaginationItem] Deprecate components prop (#41777) @sai6855
- [SvgIcon] Convert to support CSS extraction (#41779) @aarongarciah

### `@mui/base@5.0.0-beta.43`

- [TextareaAutosize] Fix resizing instability (#41638) @ZeeshanTamboli

### Docs

- Fix small SEO issues @oliviertassinari
- [material-ui] Fix minor spelling error in the "About the lab" page (#42073) @ryanhartwig
- [material-ui] Update Figma plugin name (#41967) @danilo-leal
- [material-ui][templates] Fix input props attributes in Landing Page template (#42013) @5-tom
- [system] Update typo on the sx prop page (#42035) @bricker

### Core

- [docs-infra] Clean up branding theme file and improve font-face readibility (#42023) @danilo-leal
- [docs-infra] Simplify docs demo (#42016) @oliviertassinari
- [website] Add content about the Sync plugin in the Material UI page (#40515) @danilo-leal
- [website] Sync career roles (#42058) @oliviertassinari
- [website] Add Nadja on the about page (#42021) @mnajdova
- [website] Fix code block design by changing the `MarkdownElement` import (#42022) @danilo-leal
- [wesbite] Remove duplicate MarkdownElement component (#42028) @danilo-leal

All contributors of this release in alphabetical order: @5-tom, @aarongarciah, @bricker, @danilo-leal, @mnajdova, @oliviertassinari, @ryanhartwig, @sai6855, @ZeeshanTamboli

## 6.0.0-alpha.4

<!-- generated comparing v6.0.0-alpha.3..next -->

_Apr 24, 2024_

A big thanks to the 15 contributors who made this release possible. Here are some highlights ✨:

- 🔥 Converted 3 more Material UI components to use Pigment CSS.
- ℹ️ Pigment CSS now lives in [its own repository](https://github.com/mui/pigment-css)! From now on, all future development will happen there.

### `@mui/material@6.0.0-alpha.4`

- [Checkbox] Convert to support CSS extraction (#41957) @lhilgert9
- [IconButton] Convert to support CSS extraction (#41850) @gijsbotje
- [Radio] Convert to support CSS extraction (#41840) @lhilgert9
- [Typography] Fix ownerState prop placement (#41903) @sai6855
- Generate typography tokens (#41703) @siriwatknp
- Move typography CSS variables to `font` (#42003) @siriwatknp
- Fix getOverlayAlpha type (#41995) @oliviertassinari
- Support CSS Extraction using codemod (#41935) @siriwatknp

### `@mui/icons-material@6.0.0-alpha.4`

- &#8203;<!-- 08 -->[icons] Update the icons package (#41937) @danilo-leal

### Docs

- [material-ui] Remove react-swipeable-views from demos as it's no longer maintained (#41912) @soler1212
- [material-ui] Add dark theme thumbnails for templates (#41947) @zanivan
- [material-ui] Remove links and interdependencies from free templates (#41941) @zanivan
- [material-ui] Add missing backticks to HTML tag in the installation page (#41972) @Miguelrom
- Fix 301 Toolpad links @oliviertassinari
- Fix 301 image redirections @oliviertassinari

### Core

- pnpm docs:zipRules && vale sync @oliviertassinari
- Remove @pigment-css/\* packages (#41965) @mnajdova
- [code-infra] Move the HighlightedCode component to @mui/docs (#41859) @Janpot
- [code-infra] Move the HighlightedCode component to @mui/docs (#41859) @Janpot
- [code-infra] Make Babel config path configurable in API docs builder (#41999) @michaldudak
- [docs-infra] Fix flex-shrink pro-plan (#41990) @oliviertassinari
- [docs-infra] Allow more value uses of MUI (#41706) @oliviertassinari
- [docs-infra] Move CPU to shared config (#41901) @oliviertassinari
- [docs-infra] Improve Twitter OG:image (#41860) @oliviertassinari
- [docs-infra] Adapt docs infra to Base UI docs needs (#41963) @michaldudak
- [docs-infra] Add demo container design refinements (#41948) @danilo-leal
- [docs-infra] Use the `getLayout` on the material demo pages (#41936) @alexfauquette
- [test] Update browser versions in karma config (#42008) @ZeeshanTamboli
- [website] Remove customer support agent role from website (#41969) @rluzists1
- [website] Fix grid usage and add stray improvements (#41930) @danilo-leal

All contributors of this release in alphabetical order: @alexfauquette, @danilo-leal, @gijsbotje, @Janpot, @lhilgert9, @michaldudak, @Miguelrom, @mnajdova, @oliviertassinari, @rluzists1, @sai6855, @siriwatknp, @soler1212, @zanivan, @ZeeshanTamboli

## 6.0.0-alpha.3

<!-- generated comparing v6.0.0-alpha.2..next -->

_Apr 17, 2024_

A big thanks to the 24 contributors who made this release possible. Here are some highlights ✨:

- 🔥 Converted 5 more Material UI components to use Pigment CSS.
- 🚀 Added container queries utility to the `@mui/system` package (#41674) @siriwatknp.

### `@mui/material@6.0.0-alpha.3`

- Convert `LinearProgress` to support Pigment CSS (#41816) @siriwatknp
- [Dialog] Prevent onClick on the root element from being overwritten (#41881) @ryanburr
- [FloatingActionButton] Convert to support CSS extraction (#41851) @gijsbotje
- Convert `CircularProgress` to support Pigment CSS (#41776) @siriwatknp
- [PaginationItem] Convert to support CSS extraction (#41848) @gijsbotje
- [StepConnector] deprecate composed classes (#41740) @sai6855
- [StepLabel] Deprecate `StepIconComponent`, `StepIconProps` (#41835) @sai6855
- [ToggleButton] Convert to support CSS extraction (#41782) @lhilgert9
- [ToggleButtonGroup] Deprecate composed classes (#41288) @sai6855
- [Typography] Fix Typography inherit variant styles (#41308) @kealjones-wk

### `@mui/system@6.0.0-alpha.3`

- Add container queries utility (#41674) @siriwatknp

### `@mui/codemod@6.0.0-alpha.3`

- Add styled v6 transformation (#41743) @siriwatknp

### `@mui/joy@5.0.0-beta.36`

- [Button] Disable text highlighting (#41902) @mithun522

### `@pigment-css/react@0.0.7`

- Patch WyW's WeakRef usage (#41909) @DiegoAndai
- Implement sx transform for system components (#41861) @brijeshb42

### Docs

- [material-ui] Add Connect-related content (#40848) @danilo-leal
- [material-ui] Fix credit comment typo (#41872) @aarongarciah
- [material-ui] Remove Data Grid v7 beta callout (#41839) @cherniavskii
- [material-ui] Add stray design tweaks to free templates (#41696) @zanivan
- [material-ui] Simplify components styling on templates (#41845) @zanivan
- [material-ui][Button] Add `onChange` event handler to file upload example (#41863) @aarongarciah
- [material-ui] Fix import statement in migration guide (#41852) @sai6855
- Fix 301 redirection @oliviertassinari
- Fix format git diff regression (#41882) @oliviertassinari
- Fix small SEO issues @oliviertassinari
- [pigment-css] Fix README typos (#41870) @MohammadShehadeh

### Core

- Begin removing IE 11-related code (#41709) @iammminzzy
- [blog] Add post to introduce the Connect plugin (#41763) @danilo-leal
- [code-infra] Fix require.context with aliases (#41682) @Janpot
- [code-infra] Allow customizing hooks imports in API docs generator (#41828) @michaldudak
- [codemod] Add utils for `*Component` and `*Props` props deprecations (#41685) @DiegoAndai
- Replace bundle size reporter filter (#38979) @Janpot
- [docs-infra] Make the whole header clickable (#39603) @MoazMirza-13
- [docs-infra] Improve demo container and related components design (#41827) @danilo-leal
- [docs-infra] Use edge function for card generation (#41188) (#41836) @alexfauquette
- [docs-infra] Fix code block layout shift (#41917) @oliviertassinari
- [docs-infra] Fine-tune the OG card image design (#41862) @danilo-leal
- [docs-infra] Fix markdown version for material (#41908) @alexfauquette
- [docs-infra] Support multiple tabs in demos (#40901) @bharatkashyap

All contributors of this release in alphabetical order: @aarongarciah, @alexfauquette, @bharatkashyap, @brijeshb42, @cherniavskii, @danilo-leal, @DiegoAndai, @EyaOuenniche, @gijsbotje, @iammminzzy, @Janpot, @kealjones-wk, @lhilgert9, @magnimarels, @michaldudak, @mithun522, @mnajdova, @MoazMirza-13, @MohammadShehadeh, @oliviertassinari, @ryanburr, @sai6855, @siriwatknp, @zanivan

## 6.0.0-alpha.2

<!-- generated comparing v6.0.0-alpha.1..next -->

_Apr 9, 2024_

A big thanks to the 5 contributors who made this release possible.
This release was mostly about 🐛 bug fixes and 📚 documentation improvements.

### `@mui/material@6.0.0-alpha.2`

- &#8203;<!-- 03 -->[typescript][Select] Fix `muiName` property TypeScript error (#41726) @EyaOuenniche
- &#8203;<!-- 04 -->[l10n] Fix typo in is-IS locale (#41810) @magnimarels

### `@pigment-css/react@0.0.6`

- &#8203;<!-- 12 -->[core] Remove `muiName` during eval phase (#41811) @brijeshb42

### `@pigment-css/nextjs-plugin@0.0.6`

- &#8203;<!-- 02 -->[nextjs] Handle file references passed through imports (#41817) @brijeshb42
- &#8203;<!-- 01 -->[nextjs] Allow usage of url() CSS function (#41758) @brijeshb42

### Docs

- &#8203;<!-- 11 -->[docs] Fix 301 links @oliviertassinari
- &#8203;<!-- 06 -->[pigment-css][docs] Fix README typo (#41808) @aarongarciah
- &#8203;<!-- 05 -->[pigment-css][docs] Fix output on dynamic styles example (#41805) @aarongarciah
- &#8203;<!-- 07 -->[material-ui][docs] Fix Material 3 message typo (#41821) @aarongarciah
- &#8203;<!-- 08 -->[material-ui][docs] Add stray design tweaks to free templates (#41696) @zanivan

### Core

- &#8203;<!-- 13 -->[core] Remove unused files (#41818) @mnajdova
- &#8203;<!-- 10 -->[docs-infra] Fix analytics about inline ads (#41474) (#41819) @alexfauquette
- &#8203;<!-- 08 -->[docs-infra] Fix drawer performances (#41807) @alexfauquette

All contributors of this release in alphabetical order: @aarongarciah, @alexfauquette, @brijeshb42, @EyaOuenniche, @oliviertassinari

## 6.0.0-alpha.1

<!-- generated comparing v6.0.0-alpha.0..next -->

_Apr 5, 2024_

A big thanks to the 19 contributors who made this release possible. Here are some highlights ✨:

- 🔥 Converted 3 more Material UI components to use Pigment CSS. Current progress is 36%!
- 🚀 Added a spacing CSS variable to the Material UI and Joy UI themes.
- 💫 Added 3 redesigned free Material UI templates: [Sign-in](https://next.mui.com/material-ui/getting-started/templates/sign-in/), [Sign-in side](https://next.mui.com/material-ui/getting-started/templates/sign-in-side/), and [Sign-up](https://next.mui.com/material-ui/getting-started/templates/sign-up/).

### `@mui/material@6.0.0-alpha.1`

- [AppBar] Convert to support CSS extraction (#41247) @mnajdova
- [Badge] Deprecate components and componentsProps (#41655) @skmanoj322
- [Button] Convert to support CSS extraction (#41378) @siriwatknp
- [ButtonGroup] Convert to support CSS extraction (#41666) @zanivan
- [RadioGroup] Apply classnames (#41610) @ZeeshanTamboli
- [Slider] Move palette styles to the bottom (#41676) @siriwatknp
- Add the `spacing` theme token (#40224) @siriwatknp

### `@mui/system@6.0.0-alpha.1`

- Add the `spacing` theme token to be used in `theme.spacing()` (#40224) @siriwatknp

### `@mui/codemod@6.0.0-alpha.1`

- [codemod] Setup v6 codemod structure (#41668) @DiegoAndai

### `@mui/lab@6.0.0-alpha.1`

- [TabPanel] Add keepMounted prop to match Joy UI (#41651) @ppaskaris-plooto

### `@mui/joy@5.0.0-beta.34`

- Add `spacing` theme token (#40224) @siriwatknp

### `@pigment-css/react@0.0.5`

- Improve sx prop support (#41589) @brijeshb42
- Fix Emotion styled error (#41699) @siriwatknp
- Fix propTypes removal during eval stage (#41695) @brijeshb42
- Fix props forwarding (#41688) @siriwatknp
- Fix sx prop transformation on Box (#41705) @brijeshb42

### `@pigment-css/vite-plugin@0.0.5`

- Use constant filename for pigment styles (#41667) @brijeshb42

### `@pigment-css/nextjs-plugin@0.0.5`

- Add missing RTL implementation (#41751) @brijeshb42

### Docs

- [pigment-css] Update README.md installation to use the next tag (#41649) @mnajdova
- [pigment-css] Add "Building design system components" guide with Pigment CSS (#41635) @siriwatknp
- Continue migration of Base UI to sperate repository @oliviertassinari
- Stick to one way to write IE 11 @oliviertassinari
- Fix typo in CONTRIBUTING.md (#41670) @adriancuadrado
- Drop IE 11 official support (#41611) @iammminzzy
- [material-ui] Fix typo on the Accordion page (#41687) @connorshea
- [pigment-css] Add small edits on the README (#41646) @danilo-leal
- [pigment-css] Edit the example app's README files (#41639) @danilo-leal

### Core

- [code-infra] Move BrandingProvider/brandingTheme/InfoCard to @mui/docs (#41206) @Janpot
- [core] Automate cherry-pick of PRs from `next` -> `master` (#41741) @aarongarciah
- [core] Update the prettier script to use the next branch (#41637) @mnajdova
- [docs-infra] Skip loading source for non-editable modules (#41588) @bharatkashyap
- [docs-infra] Vale rule for M3 (#41737) @oliviertassinari
- [docs-infra] Allows to remove edit button (#41702) @alexfauquette
- [pigment-css][examples] Add example project with Remix (#41700) @brijeshb42
- [examples] Update MUI's packages to the next version (#41701) @mnajdova
- [material-ui] Refine the Sign-in and Sign-up templates (#41192) @zanivan
- [test] Add test to display options provided to the options prop even if loading is true. (#41675) @ZeeshanTamboli
- [blog] Refresh the design slightly (#41697) @danilo-leal
- [website] Use en-US over en-UK for career link @oliviertassinari
- [website] Add Aarón to About Us (#41736) @aarongarciah
- [website] Refine button design and other details (#41686) @danilo-leal
- [website] Improve job og image (#41672) @oliviertassinari
- [website] Page <title> should have no dots @oliviertassinari

All contributors of this release in alphabetical order: @aarongarciah, @adriancuadrado, @alexfauquette, @bharatkashyap, @brijeshb42, @connorshea, @danilo-leal, @DiegoAndai, @iammminzzy, @Janpot, @JCQuintas, @levigunz, @mnajdova, @oliviertassinari, @ppaskaris-plooto, @siriwatknp, @skmanoj322, @zanivan, @ZeeshanTamboli

## 6.0.0-alpha.0

<!-- generated comparing v5.15.14..next -->

_Mar 26, 2024_

A big thanks to the 18 contributors who made this release possible. Here are some highlights ✨:

- 🔥 Converted 10+ Material UI components to support static CSS extraction
- ⬅️ Added RTL support in Pigment CSS (#41570) @brijeshb42

### `@mui/material@6.0.0-alpha.0`

- [BottomNavigation] Convert to support CSS extraction (#41612) @aacevski
- [AvatarGroup] Convert to support CSS extraction (#41485) @zanivan
- [Backdrop] Convert to support CSS extraction (#41581) @aacevski
- [Breadcrumbs] Convert to support CSS extraction (#41496) @aacevski
- [Card] Convert to support CSS extraction (#41580) @aacevski
- [Divider] Convert to support CSS extraction (#41366) @sai6855
- [FormControl] Convert to support CSS extraction (#41613) @aacevski
- [FormGroup] Convert to support CSS extraction (#41614) @aacevski
- [MobileStepper] Convert to support CSS extraction (#41533) @aacevski
- [Modal] Support CSS extraction (#41483) @sai6855
- [Popover] Convert to support CSS extraction (#41564) @aacevski
- [Stepper] Convert to support CSS extraction (#41546) @aacevski
- [Autocomplete] Display options provided to the `options` prop even if loading is true (#41634) @nekoya
- [Backdrop] Deprecate TransitionComponent (#40677) @harry-whorlow
- [ButtonGroup] Deprecate composed classes (#41259) @sai6855
- [StepLabel] Deprecate `componentProps` prop (#41321) @sai6855
- [Chip] Convert to support CSS extraction (#41592) @DiegoAndai

### `@pigment-css/react@0.0.4`

- Fix evaluation of undefined variables (#41569) @siriwatknp
- Fix react-modal demos location (#41560) @sai6855
- [react] RTL Support (#41570) @brijeshb42

### `@mui/system@6.0.0-alpha.0`

- [core] Standardize index pattern (#41574) @DiegoAndai
- Fix typo to avoid infinite recursion in function call (#41616) @michael-land
- Move stylesheet generator to `extendTheme` (#41446) @siriwatknp

### Docs

- [joy-ui] Refresh the marketing example on the Color Inversion page (#41497) @cipherlogs
- [material-ui] Add v5 to v6 migration guide (#41561) @DiegoAndai
- [system] Add v5 to v6 migration guide (#41575) @DiegoAndai
- [material-ui][Slider] Remove `valueLabelFormat` from restricted values demo so that the tooltip thumb label displays the same as the value text (#41567) @StylesTrip
- [pigment-css] Update the RTL section on the readme (#41576) @danilo-leal

### Core

- [blog] Update the callout (#41645) @cherniavskii
- [blog] Link to Romain's blog post in MUI X v7 announcement post (#41640) @cherniavskii
- [blog] Blog post with MUI X v7.0.0 annoucement (#41563) @joserodolfofreitas
- [blog] Add post about remote (#41565) @danilo-leal
- [core] Restore the pnpm-lock.yaml (#41643) @mnajdova
- [core] Fix failing CI steps (#41636) @mnajdova
- [core] Update browser support versions (#41568) @siriwatknp
- [core] Add instructions to deploying docs guide (#41582) @DiegoAndai
- [core] Add comment explaining the frequency of no-response action runs (#41555) @michaldudak
- [core] Init the next branch (#41552) @mnajdova
- [core] Lower the frequency of no-response action runs (#41553) @michaldudak
- [core] Update peerDependencies ranges to include v6 packages (#41662) @michaldudak
- [core] Run pnpm dedupe (#41658) @michaldudak
- [core] Fix dedupe check (#41657) @Janpot
- [pigment-css][demo] Add index page for material-ui (#41577) @brijeshb42
- [pigment-css][demo] Remove app specific pnpm workspace (#41393) @brijeshb42
- [docs] Add notification for MUI X v7 blog post (#41587) @cherniavskii
- [docs] MUI X v7 blog post annoucement followup (#41601) @joserodolfofreitas
- [docs] Update the installation guides to use the next tag (#41558) @mnajdova
- [docs][material-ui] Fix typo in CSS theme variables customization (#41632) @ZeeshanTamboli
- [material-ui][docs] Remove deleted page from the sidenav (#41594) @danilo-leal
- [website] Update pricing table (#41595) @cherniavskii
- [website] Add stray design adjustments throughout the site (#41547) @danilo-leal

All contributors of this release in alphabetical order: @aacevski, @brijeshb42, @cherniavskii, @cipherlogs, @danilo-leal, @DiegoAndai, @harry-whorlow, @Janpot, @joserodolfofreitas, @michael-land, @michaldudak, @mnajdova, @nekoya, @sai6855, @siriwatknp, @StylesTrip, @zanivan, @ZeeshanTamboli

## Older versions

Changes before 6.x are listed in our [changelog for older versions](https://github.com/mui/material-ui/blob/HEAD/CHANGELOG.old.md).
