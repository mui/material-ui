# Changelog

This file documents changes in the @merceyz's `typescript-to-proptypes` package.
For changes after the package was forked and published as `@mui-internal/typescript-to-proptypes`, see [CHANGELOG.md](./CHANGELOG.md).

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.1](https://github.com/merceyz/typescript-to-proptypes/compare/v2.0.0...v2.0.1) (2020-06-02)

### Bug Fixes

- Use symbol type when there's no baseconstraint ([#23](https://github.com/merceyz/typescript-to-proptypes/issues/23)) ([0b170af](https://github.com/merceyz/typescript-to-proptypes/commit/0b170afb02a2edd1ea0b80406f1a86375c3a13f3))

## [2.0.0](https://github.com/merceyz/typescript-to-proptypes/compare/v1.5.0...v2.0.0) (2020-05-31)

### ⚠ BREAKING CHANGES

- Support for Node versions less than 10.3.0 has been dropped

### Features

- consider squashed call signatures of function components ([#20](https://github.com/merceyz/typescript-to-proptypes/issues/20)) ([514d8ed](https://github.com/merceyz/typescript-to-proptypes/commit/514d8ed55375406a70640d64c4a166aa52e24ae2))

### Bug Fixes

- allow non-string literals ([#21](https://github.com/merceyz/typescript-to-proptypes/issues/21)) ([546e7ad](https://github.com/merceyz/typescript-to-proptypes/commit/546e7addc86198e641d3bfd3dd08ecb55c970600))

### Build System

- drop support for node versions less than 10.3.0 ([2fbca64](https://github.com/merceyz/typescript-to-proptypes/commit/2fbca64e0964509e1a74d29f564be41a78e9fa29))

## [1.5.0](https://github.com/merceyz/typescript-to-proptypes/compare/v1.4.2...v1.5.0) (2020-04-06)

### Features

- **injector:** add reconcilePropTypes ([#10](https://github.com/merceyz/typescript-to-proptypes/issues/10)) ([7b0bff9](https://github.com/merceyz/typescript-to-proptypes/commit/7b0bff9666d1beb1bde445e92fbb702cf1fb3d89))
- add `filenames` to component and proptype nodes ([#9](https://github.com/merceyz/typescript-to-proptypes/issues/9)) ([ce9a700](https://github.com/merceyz/typescript-to-proptypes/commit/ce9a7002c7fda27965b50e0b1af3ecef540a90e5))
- **injector:** add `component` to `shouldInclude` ([#8](https://github.com/merceyz/typescript-to-proptypes/issues/8)) ([18a7fce](https://github.com/merceyz/typescript-to-proptypes/commit/18a7fcee1b3f7d64541fb0f9bd1de72e0ea0db5b))
- **injector:** allow providing babel options ([2ab6f43](https://github.com/merceyz/typescript-to-proptypes/commit/2ab6f43ef4b785d20dd6f951b2f4b928a5521b53))

### Bug Fixes

- check nodeType for dom elements ([#13](https://github.com/merceyz/typescript-to-proptypes/issues/13)) ([fd028e6](https://github.com/merceyz/typescript-to-proptypes/commit/fd028e639bb28383d6e4f925368b6e2afacdbf23))
- replace existing propTypes when removeExistingPropTypes ([#15](https://github.com/merceyz/typescript-to-proptypes/issues/15)) ([3166104](https://github.com/merceyz/typescript-to-proptypes/commit/3166104889d4f58fc22f85800664d2bb1fce6aff))
- **injector:** always call injectPropTypes to allow shouldInclude to run ([277258d](https://github.com/merceyz/typescript-to-proptypes/commit/277258ddc73c3da816aba6fccb739c69dfe8e83a))
- handle all props getting ignored by shouldInclude ([b69112e](https://github.com/merceyz/typescript-to-proptypes/commit/b69112e1011f089b6d5cb60f88ce75b6394252be))
- **parser:** export ParserOptions ([3a5d55e](https://github.com/merceyz/typescript-to-proptypes/commit/3a5d55e68a723208a4b76e79d4bafe92ddf4f85a))

## [1.4.2](https://github.com/merceyz/typescript-to-proptypes/compare/v1.4.1...v1.4.2) (2020-03-27)

### Bug Fixes

- build had a broken output ([97b0326](https://github.com/merceyz/typescript-to-proptypes/commit/97b0326c8b3b811fd5167cefa95a5dc1aa22a212))

## [1.4.1](https://github.com/merceyz/typescript-to-proptypes/compare/v1.4.0...v1.4.1) (2020-03-27)

### Bug Fixes

- include string literal object keys as used ([#5](https://github.com/merceyz/typescript-to-proptypes/issues/5)) ([3fd7b70](https://github.com/merceyz/typescript-to-proptypes/commit/3fd7b703d30e650e6692f87d3929d4ae67314cb6))
- unknown can be optional ([#7](https://github.com/merceyz/typescript-to-proptypes/issues/7)) ([c5e8ca3](https://github.com/merceyz/typescript-to-proptypes/commit/c5e8ca31e2cae20216b1f7e45c9f3ef5198b2f93))

## [1.4.0](https://github.com/merceyz/typescript-to-proptypes/compare/v1.3.0...v1.4.0) (2019-11-16)

### Bug Fixes

- **parser:** handle prop of type ReactElement ([adfcca4](https://github.com/merceyz/typescript-to-proptypes/commit/adfcca4))

### Features

- **parser:** support forwardRef ([3f5c0c9](https://github.com/merceyz/typescript-to-proptypes/commit/3f5c0c9)), closes [#2](https://github.com/merceyz/typescript-to-proptypes/issues/2)

## [1.3.0](https://github.com/merceyz/typescript-to-proptypes/compare/v1.2.5...v1.3.0) (2019-09-03)

### Features

- **generator:** add comment to proptype blocks ([2c5627e](https://github.com/merceyz/typescript-to-proptypes/commit/2c5627e))

### [1.2.5](https://github.com/merceyz/typescript-to-proptypes/compare/v1.2.4...v1.2.5) (2019-09-03)

### Bug Fixes

- **parser:** use doctrine to unwrap comments ([53a9d43](https://github.com/merceyz/typescript-to-proptypes/commit/53a9d43))

### Tests

- add missing test config ([d00c7f2](https://github.com/merceyz/typescript-to-proptypes/commit/d00c7f2))

## [1.2.4](https://github.com/merceyz/typescript-to-proptypes/compare/v1.2.3...v1.2.4) (2019-08-16)

### Bug Fixes

- **injector:** use require.resolve ([b9d04ea](https://github.com/merceyz/typescript-to-proptypes/commit/b9d04ea))

## [1.2.3](https://github.com/merceyz/typescript-to-proptypes/compare/v1.2.2...v1.2.3) (2019-07-24)

### Bug Fixes

- **parser:** handle return type of JSX.Element | null ([cbe5564](https://github.com/merceyz/typescript-to-proptypes/commit/cbe5564))

## [1.2.2](https://github.com/merceyz/typescript-to-proptypes/compare/v1.2.1...v1.2.2) (2019-07-23)

### Bug Fixes

- **parser:** remove leftover asterisk ([2e720df](https://github.com/merceyz/typescript-to-proptypes/commit/2e720df))

## [1.2.1](https://github.com/merceyz/typescript-to-proptypes/compare/v1.2.0...v1.2.1) (2019-07-23)

### Bug Fixes

- **parser:** handle single line comments ([0025d53](https://github.com/merceyz/typescript-to-proptypes/commit/0025d53))

## [1.2.0](https://github.com/merceyz/typescript-to-proptypes/compare/v1.1.0...v1.2.0) (2019-07-23)

### Bug Fixes

- **generator:** multiline comments ([d576597](https://github.com/merceyz/typescript-to-proptypes/commit/d576597))
- **generator:** sort interface correctly ([f88c5fb](https://github.com/merceyz/typescript-to-proptypes/commit/f88c5fb))
- **generator:** wrap prop name in quotes ([709a819](https://github.com/merceyz/typescript-to-proptypes/commit/709a819))
- **parser:** don't modify comments ([95cd63e](https://github.com/merceyz/typescript-to-proptypes/commit/95cd63e))
- **parser:** fallback to object if element is undefined ([eadaf3f](https://github.com/merceyz/typescript-to-proptypes/commit/eadaf3f))
- **parser:** handle comments with just tags ([d0b0a82](https://github.com/merceyz/typescript-to-proptypes/commit/d0b0a82))
- **parser:** handle comments with tags ([ad4dddd](https://github.com/merceyz/typescript-to-proptypes/commit/ad4dddd))
- **parser:** handle optional any ([30f56ec](https://github.com/merceyz/typescript-to-proptypes/commit/30f56ec))
- **parser:** handle optional React.ElementType ([c7a87fd](https://github.com/merceyz/typescript-to-proptypes/commit/c7a87fd))
- **parser:** treat ComponentType as elementType ([53f1e21](https://github.com/merceyz/typescript-to-proptypes/commit/53f1e21))
- export TypeScript as ts ([ba90e22](https://github.com/merceyz/typescript-to-proptypes/commit/ba90e22))

### Features

- **generator:** support instanceOf ([6bd563a](https://github.com/merceyz/typescript-to-proptypes/commit/6bd563a))
- **injector:** control included props ([4f8eaa1](https://github.com/merceyz/typescript-to-proptypes/commit/4f8eaa1))
- **injector:** remove existing proptypes ([d2a978c](https://github.com/merceyz/typescript-to-proptypes/commit/d2a978c))
- **parser:** check const declarations of React.ComponentType ([cbd2eb6](https://github.com/merceyz/typescript-to-proptypes/commit/cbd2eb6))
- **parser:** handle React.Component and Element instanceOf ([570d73b](https://github.com/merceyz/typescript-to-proptypes/commit/570d73b))
- **parser:** support elementType ([448d5a6](https://github.com/merceyz/typescript-to-proptypes/commit/448d5a6))

## [1.1.0](https://github.com/merceyz/typescript-to-proptypes/compare/v1.0.4...v1.1.0) (2019-07-15)

### Bug Fixes

- **generator:** don't pass shouldInclude on interfaceNode ([1302502](https://github.com/merceyz/typescript-to-proptypes/commit/1302502))

### Features

- **parser:** circular references ([7de51cc](https://github.com/merceyz/typescript-to-proptypes/commit/7de51cc))
- **parser:** control included proptypes ([2952e78](https://github.com/merceyz/typescript-to-proptypes/commit/2952e78))
- **parser:** objects / shapes ([81f1a82](https://github.com/merceyz/typescript-to-proptypes/commit/81f1a82))

## [1.0.4](https://github.com/merceyz/typescript-to-proptypes/compare/v1.0.3...v1.0.4) (2019-07-10)

### Bug Fixes

- **generator:** omit null if proptype is optional ([21351a4](https://github.com/merceyz/typescript-to-proptypes/commit/21351a4))
- **parser:** reactnode should make proptype optional ([c84b611](https://github.com/merceyz/typescript-to-proptypes/commit/c84b611))

## [1.0.3](https://github.com/merceyz/typescript-to-proptypes/compare/v1.0.2...v1.0.3) (2019-07-10)

### Bug Fixes

- export types ([7583291](https://github.com/merceyz/typescript-to-proptypes/commit/7583291))

## [1.0.2](https://github.com/merceyz/typescript-to-proptypes/compare/v1.0.1...v1.0.2) (2019-07-09)

### Bug Fixes

- **injector:** don't visit FunctionDeclarations more than once ([236276b](https://github.com/merceyz/typescript-to-proptypes/commit/236276b))

## [1.0.1](https://github.com/merceyz/typescript-to-proptypes/compare/v1.0.0...v1.0.1) (2019-07-09)

### Bug Fixes

- **injector:** don't import prop-types if it's already imported ([9d4dfd1](https://github.com/merceyz/typescript-to-proptypes/commit/9d4dfd1))
- **injector:** insert import after the first one ([6cb31a0](https://github.com/merceyz/typescript-to-proptypes/commit/6cb31a0))

## 1.0.0 (2019-07-08)

### Build System

- disable incremental ([37b0277](https://github.com/merceyz/typescript-to-proptypes/commit/37b0277))
