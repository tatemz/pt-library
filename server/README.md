# PT Library CRUD Service

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme)

## Table of Contents

- [Background](#background)
- [Setup](#setup)
- [Usage](#usage)
  - [Run server](#run-server)
  - [Build executables](#build-executables)
- [Contribute](#contribute)
- [License](#license)

## Background

This service is a CRUD service using [Go Kit](https://github.com/go-kit/kit) and [Gorilla Mux](https://github.com/gorilla/mux)

It contains a CRUD API that connects to a MongoDB host (specified as a runtime flag argument).

## Setup

Then, please make sure you have properly installed Go on your system per the [official docs](https://golang.org/doc/install).

## Usage

### Run server

```sh
$ make run <args>
```

### Build executables

```
$ make build
```

## Contribute

PRs accepted.

## License

MIT © Tate Barber