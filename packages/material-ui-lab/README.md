# @material-ui/lab

This package hosts the incubator components that are not yet ready to move to `core`. 

The main difference between the `lab` and the `core` is how the components are versioned. Having the lab within Material UI allows us to release breaking changes when necessary while the core package follows a [slower-moving policy](https://material-ui.com/versions/#release-frequency).

As our users use and test the components and report issues, we learn more about the design flaws of our components: lacking features, a11y, bugs, API, etc. The older and more used a component is, the less likely it is that we will find new flaws and subsequently, need to introduce breaking changes. 

For a component to be ready to move to the `core`, the following criteria is considered:
* It needs to be **used**. The Material UI team uses Google Analytics stats to evaluate the usage of each component. A lab component with low usage either means that it isn't fully working yet or that there is a low demand for it.
* It needs to match the **code quality** of the core components. It doesn't have to be perfect to be a part of the `core`. We want the component to be reliable enough so that developers can depend on our solution.
    * Each component needs **type definitions**. It currently is not required that a lab component is typed, but it would need to be typed to move to the core.
    * Requires good **test coverage**. Some of the lab components don't currently have comprehensive tests.
* Can it be used as **leverage** to incentivize users to upgrade to the latest major release? The less fragmented the community is, the better.
* It needs to have a low probability of a **breaking change** in the short/medium future. For instance, if we know we want to introduce a new feature that will likely require a breaking change, we might as well delay its promotion to the `core`.

## Installation

Install the package in your project directory with:

```sh
// with npm
npm install @material-ui/lab

// with yarn
yarn add @material-ui/lab
```

The lab has a peer dependency on the core components.
If you are not already using Material-UI in your project, you can install it with:

```sh
// with npm
npm install @material-ui/core

// with yarn
yarn add @material-ui/core
```

## Documentation

[The documentation](https://material-ui.com/components/about-the-lab/)
