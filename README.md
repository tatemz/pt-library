# PT Library

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme)

## Table of Contents

- [Background](#background)
- [Setup](#setup)
- [Usage](#usage)
  - [Docker](#docker)
- [Contribute](#contribute)
- [License](#license)

## Background

![Demo](demo.gif)

This project is a monorepo for two applications that depend on a Mongo DB host:

- [A GoLang REST CRUD API](./web/README.md)
- [A React web app](./server/README.md)

## Setup

Each subfolder contains documentation on how to run each individual application, however a `docker-compose.yml` file is provided to build and run the entire stack.

## Usage

### Docker

```sh
$ docker-compose up
```

## Contribute

PRs accepted.

## License

MIT © Tate Barber