# PT Library Web App

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme)

> A web app for managing Psychology Today Library Books

## Table of Contents

- [Install](#install)
  - [Prerequisites](#prerequisites)
  - [Dependencies](#dependencies)
- [Usage](#usage)
  - [Development server](#development-server)
  - [Production server](#production-server)
  - [Execute tests](#execute-tests)
  - [Build Bundle](#build-bundle)
- [Contributing](#contributing)
- [License](#license)

## Install

### Prerequisites

- Node `>=8.15.1`
- NPM `>=5`

The simplest way to use the correct versions of Node and NPM is to use [NVM](https://github.com/creationix/nvm)

```sh
nvm install 10
nvm use 10
```

### Dependencies

```sh
$ npm install
```

## Usage

### Development Server

To run a local dev server:
```
$ npm run start
```

### Production Server

To run a production dev server:
```
$ npm run start:prod
```

### Execute tests

Tests are written in Jest:

```sh
npm test
```

### Build Bundle

The application can be bundled into a static site

```sh
npm run build
```

## Contributing

PRs accepted.

## License

MIT © Tate Barber