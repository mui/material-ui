# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.1.0](https://github.com/merceyz/typescript-to-proptypes/compare/v1.0.4...v1.1.0) (2019-07-15)

### Bug Fixes

- **generator:** don't pass shouldInclude on interfaceNode ([1302502](https://github.com/merceyz/typescript-to-proptypes/commit/1302502))

### Features

- **parser:** circular references ([7de51cc](https://github.com/merceyz/typescript-to-proptypes/commit/7de51cc))
- **parser:** control included proptypes ([2952e78](https://github.com/merceyz/typescript-to-proptypes/commit/2952e78))
- **parser:** objects / shapes ([81f1a82](https://github.com/merceyz/typescript-to-proptypes/commit/81f1a82))

### [1.0.4](https://github.com/merceyz/typescript-to-proptypes/compare/v1.0.3...v1.0.4) (2019-07-10)

### Bug Fixes

- **generator:** omit null if proptype is optional ([21351a4](https://github.com/merceyz/typescript-to-proptypes/commit/21351a4))
- **parser:** reactnode should make proptype optional ([c84b611](https://github.com/merceyz/typescript-to-proptypes/commit/c84b611))

### [1.0.3](https://github.com/merceyz/typescript-to-proptypes/compare/v1.0.2...v1.0.3) (2019-07-10)

### Bug Fixes

- export types ([7583291](https://github.com/merceyz/typescript-to-proptypes/commit/7583291))

### [1.0.2](https://github.com/merceyz/typescript-to-proptypes/compare/v1.0.1...v1.0.2) (2019-07-09)

### Bug Fixes

- **injector:** don't visit FunctionDeclarations more than once ([236276b](https://github.com/merceyz/typescript-to-proptypes/commit/236276b))

### [1.0.1](https://github.com/merceyz/typescript-to-proptypes/compare/v1.0.0...v1.0.1) (2019-07-09)

### Bug Fixes

- **injector:** don't import prop-types if it's already imported ([9d4dfd1](https://github.com/merceyz/typescript-to-proptypes/commit/9d4dfd1))
- **injector:** insert import after the first one ([6cb31a0](https://github.com/merceyz/typescript-to-proptypes/commit/6cb31a0))

## 1.0.0 (2019-07-08)

### Build System

- disable incremental ([37b0277](https://github.com/merceyz/typescript-to-proptypes/commit/37b0277))
