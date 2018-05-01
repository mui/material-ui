# Roadmap

The roadmap is a living document, and it is likely that priorities will change, but the list below should give some indication of our plans for the next major release, and for the future.

## Version 1 (published on NPM under the `next` tag)

Releasing stable v1 is our top priority. It's going to be huge ✨.
We are just at the beginning, we hope to make it:
- the **simplest** React UI library available for new Front-End developers to start with.
- **very customizable** so highly UI demanding production applications can save time building on top of it.

Material-UI was started [3 years ago](https://github.com/mui-org/material-ui/commit/28b768913b75752ecf9b6bb32766e27c241dbc46).
The ecosystem has evolved a lot since then, we have also learned a lot.
[@nathanmarks](https://github.com/nathanmarks/) started an ambitious task, rebuilding Material-UI from the **ground-up**
taking advantage of this knowledge to address long-standing issues.
Expect various **breaking changes**.

The core team has been dedicated to the rewrite effort for one and a half years.
If you are interested in following our progress or if you want to help us reach that goal faster, you can have a look at the following milestones:
- ~~[v1.0.0-beta](https://github.com/mui-org/material-ui/milestone/22?closed=1)~~ - reached!
- [v1.0.0-prerelease](https://github.com/mui-org/material-ui/milestone/14)
- [v1.0.0](https://github.com/mui-org/material-ui/milestone/23)

## Q&A with the v1 version

The v1-beta version has matured, so we think that it's time to communicate more on this effort. The following Q&A is an attempt at answering some of your questions.

### Summarizing, what are our main problems with CSS?

The CSS (cascading style sheets) specification emerged in 1994.
At that time, a bunch of others specifications were competing.
It was the cascading concept that made CSS succeed over its competitors, by allowing users to provide their own style-sheet, that will be later combined with browsers and authors style-sheets.
That feature was removed 2 years ago from the most popular browser.
My point is, our needs have evolved quite a bit since then.

Back in the beginning of Material-UI, we had many issues with the first **LESS approach**.
Aside from [the problem with CSS at scale](https://speakerdeck.com/vjeux/react-css-in-js) raised by @vjeux, we had the following ones:
- We had a **dependency** on the LESS build chain with no way to abstract it away.
Users needed to change their theme variables. @gpbl was maintaining a [SASS version]( https://github.com/gpbl/material-ui-sass). (Today, we could be using *[cssnext](http://cssnext.io/)*).
- The theme was computed at **build time** but a Material component must be able to render quite differently depending on his context that can only be known at runtime.
(Tomorrow, CSS variables will help a lot)
- We were shipping a **big monolithic** CSS file.
That's not great for performance (for example it goes against the [PRPL pattern](https://www.polymer-project.org/1.0/toolbox/server) suggested by the Polymer team).
That was also an issue for users wanting to use a single component without paying for all the CSS upfront.
- We used multi-level selectors, making the **override** of styles challenging.

We later came up with an **inline-style approach** solving the majority of our issues.
But:
- We had lost around 25% of the performance 🐢.
Computing the inline-style at each render with no caching isn't really efficient.
- Some more advanced CSS feature weren't available, e.g. keyframes, pseudo-elements, pseudo-classes 💅.
- Media queries weren't available on the server. At least [not yet](http://caniuse.com/#feat=client-hints-dpr-width-viewport).
- Debugging was really challenging. Browser dev tools aren't tuned for inline-styles.
- React v15 has changed the method of injecting styles into the DOM meaning, for example, that prefixing all browsers for `display:flex` is no longer possible 💥.

### Does JSS solve them?

Yes, it does. You can have a look at [this presentation](https://github.com/oliviertassinari/a-journey-toward-better-style) for more details.

### When do we intend to release stable v1?

We don't have an ETA for the release of the `v1`, however, we are going to try to follow this plan and hope for a Q1-Q2 2018 release:

1. ~~We completely address the styling issue before moving from *alpha* to [*beta*](https://github.com/mui-org/material-ui/milestone/22).~~
2. ~~We publish our first beta releases.~~
3. We merge the v1-beta branch into master
5. We publish our first pre-releases, if all goes well, we move to the next step.
6. We publish v1 🎉

At that point, some features and components from Material-UI v0.x will be missing in the v1.
So, what about them?
- First, both versions can be used at the same time, people can progressively migrate, one component at the time.
- Then, **with the help of the community** and over time, we will support more and more components.
- We would rather **support few use-cases very well** and allow people to build on top of it **than many poorly**.

### Have we ever considered using the best libraries for each piece of functionality and provide only a wrapper for the UI?

We have, it really depends on the problem we are trying to solve.
For UI related things, providing a wrapper for the functionality is often the wrong approach.
We think that it should be done the other way around, i.e. providing a low-level API that can be combined with third-party libraries, e.g.:
 - [react-virtualized](https://github.com/bvaughn/react-virtualized)
 - [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views)
 - [react-autosuggest](https://github.com/moroshko/react-autosuggest)
 - [react-popper](https://github.com/souporserious/react-popper)
 - [downshift](https://github.com/paypal/downshift)
 - [react-dnd](https://github.com/gaearon/react-dnd)

On the other hand, using a smart date library for the DatePicker / TimePicker would probably be much better as date management is tricky and not a core business.

## Breaking changes before v1

It's time to look at the last breaking changes needed before releasing Material-UI v1.
Users trying out and using v1-beta and giving feedback has been a tremendous help. Thank you!

This feedback has guided the following list of important breaking changes
that **are needed for the stable version**:

- [ ] Flatten the import path [#9532](https://github.com/mui-org/material-ui/issues/9532).
  Knowing the component name should be enough for being able to import it.

  ```diff
  -import CircularProgress from 'material-ui/Progress/CircularProgress';
  +import CircularProgress from 'material-ui/CircularProgress';
  ```

  ```diff
  -import { ListItem } from 'material-ui/List';
  +import ListItem from 'material-ui/ListItem';
  ```

- [ ] Use `@material-ui npm scope name` #9673. The pros have been raised in the linked issue.

```diff
-import Button from 'material-ui/Button';
+import Button from '@material-ui/core/Button';
```

These breaking changes will be spread into different releases over the next few months to make the upgrade path as smooth as possible.
Not only does the Material-UI project have to be upgraded for each breaking change,
but we also have to upgrade our own projects.
**We don't take making breaking changes lightly**, it's very costly with UI components.
For users, test coverage is hard to raise without tools like [visual regression tests](https://www.argos-ci.com/mui-org/material-ui).

**Let us know** by [commenting on this PR](https://github.com/mui-org/material-ui/pull/10348) what you think we should or shouldn't do, what's important, and what's missing!

## After stable v1

- **Theming**. We will invest in the theming solution. We would love to see **non Material Design UI** built with Material-UI. [@oliviertassinari](https://github.com/oliviertassinari/) is working on a proof of concept.
- **Type checking**. We need to improve TypeScript and Flow coverage of the library.
- **Bundle size**. We need the library to be as small as possible. We already monitor the bundle size with size-limit. We need to think of the solutions. For instance, supporting preact can help.
- **Performance**. We can't optimize something we can't measure. We don't have any CI performance benchmark. We will need to build one and start investigating bottlenecks.
- **Learning materials**. The documentation is equally as important as the quality of the implementation. We could be authoring a [learning tutorial](https://learnnextjs.com/) like Next.js is doing, or some [egghead.io](https://egghead.io/) courses.
