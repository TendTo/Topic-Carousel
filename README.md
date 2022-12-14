# TopicCarousel

[![npm](https://img.shields.io/badge/topic--carousel-%5E0.0.1-green?logo=npm)](https://www.npmjs.com/package/topic-carousel)  
[![Deploy CI](https://github.com/TendTo/Topic-Carousel/actions/workflows/deploy.yml/badge.svg)](https://github.com/TendTo/Topic-Carousel/actions/workflows/deploy.yml)

Carousel with infinite scroll with the ability to filter items through topics.  
Does not rely on any other dependency.

> โ๏ธ This package just started development, it isn't functional right now.
> Still, feel free to contribuite

## โถ๏ธ Use

Install the package

```bash
npm i topic-carousel
```

or include the script directly in your _html_ file with

```html
<script src="https://unpkg.com/topic-carousel@0.0.1/dist/bundle/topic-carousel.min.js"></script>
```

## ๐ Documentation

Check the complete documentation [here](https://tendto.github.io/Topic-Carousel/).

## ๐ป Development

If you want to improve the package or you are just curious on how it works, follow this section.

### ๐ Folders structure

```yaml
.
โโโ .github     # github actions
โโโ .husky      # git hooks
โโโ config      # configuration files for rollup, lint-staged and playwright
โโโ dist        # [AFTER npm run build] built package, to be used in the browser
โโโ docs        # [AFTER npm run docs] documentation
โโโ lib         # [AFTER npm run build] built package, to be used with node.js
โโโ public      # base folder used by the dev web server
โโโ src         # source code
โโโ tests       # unit and end to end tests
โโโ README.md   # THIS FILE
```

### ๐งพ Requirements

- [node.js 14.x](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (or similar package manager)

#### Notable dev-dependencies

- [typescript](https://www.typescriptlang.org/) to make programming decent
- [rollup.js](https://rollupjs.org/guide/en/) for building the package
- [playwright](https://playwright.dev/) for end to end tests
- [mocha](https://mochajs.org/) for unit tests

### ๐ง Setup

Install the dependencies with

```bash
npm install
```

### ๐ Standalone web server

To play around and see for yourself any changes to the library, you can use the integrated web server.
Just run

```bash
# Build the package locally and start the web server
npm run build:dev
npm run serve
# Allows live reload by refreshing the page
npm run serve:dev
```

### ๐งฑ Build

Make sure everything is clean by running

```bash
npm run clean
```

then all the versions of the package can be built with the command

```bash
npm run build
```

### ๐งช Tests

#### Unit

After having installed the dependencies, run

```bash
npm run test:unit
```

#### E2E

After having installed the dependencies, complete the setup required by playwright with

```bash
npx playwright install --with-deps
```

you can then run

```bash
npm run test:e2e
```

> โน๏ธ The e2e test configuration is located in _config/playwright.config.ts_.
> Right now, only chromium and firefox are tested, but it is possible to also include safari (see commented section).
