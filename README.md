# "gendiff"

[![Maintainability](https://api.codeclimate.com/v1/badges/6881926f37feb7fe523a/maintainability)](https://codeclimate.com/github/sergpvv/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6881926f37feb7fe523a/test_coverage)](https://codeclimate.com/github/sergpvv/backend-project-lvl2/test_coverage)
[![Build Status](https://travis-ci.org/sergpvv/backend-project-lvl2.svg?branch=master)](https://travis-ci.org/sergpvv/backend-project-lvl2)

Compares two configuration files and shows a difference. 
Second training project by [Hexlet](https://hexlet.io/#features) on the profession ["JS frontend/backend"](https://hexlet.io/professions/frontend).

## Setup

```sh
$ make install
```

## Usage
### Console utility
```sh
$ gendiff [options] <firstConfig> <secondConfig>

Compares two configuration files and shows a difference.

Options:
  -v, --version        Output the version number
  -f, --format [type]  Specify output format: plusminus, plain, json (default: "json")
  -h, --help           output usage information

```
### API
```
import genDiff from 'gendiff';
```

[![asciicast](https://asciinema.org/a/amHVxKbyUwoAxRKVnn27whmH9.svg)](https://asciinema.org/a/amHVxKbyUwoAxRKVnn27whmH9)

[![asciicast](https://asciinema.org/a/SzgEOYjUAHqQVxVNiLgmb42EG.svg)](https://asciinema.org/a/SzgEOYjUAHqQVxVNiLgmb42EG)
