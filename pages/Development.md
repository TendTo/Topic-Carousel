If you want to actively help with the development of this package, you can do so following these steps:

- open an [issue](https://github.com/TendTo/Topic-Carousel/issues/new) on the Github repository
- [fork](https://github.com/TendTo/Topic-Carousel/fork) the repository
- clone the newly created fork with `git clone <fork-url>`
- make changes
- commit push the changes to your fork
- create a [pull request](https://github.com/TendTo/Topic-Carousel/compare). Make sure to link the original issue by adding "#\<issue number\>" in the description of the pull request

> ℹ️ If you are unfamiliar with git and its commands, I suggest you first check out these resources: [git docs](https://git-scm.com/docs/gittutorial), [w3school](https://www.w3schools.com/git/), [gitbranching](https://learngitbranching.js.org/)

## Folders structure

```yaml
.
├── .github     # github actions
├── .husky      # git hooks
├── config      # configuration files for rollup, lint-staged and playwright
├── dist        # [AFTER npm run build] built package, to be used in the browser
├── docs        # [AFTER npm run docs] documentation
├── lib         # [AFTER npm run build] built package, to be used with node.js
├── public      # base folder used by the dev web server
├── src         # source code
├── tests       # unit and end to end tests
└── README.md   # THIS FILE
```

## Requirements

- [node.js 14.x](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (or similar package manager)

### Notable dev-dependencies

- [typescript](https://www.typescriptlang.org/) to make programming decent
- [rollup.js](https://rollupjs.org/guide/en/) to build the package
- [playwright](https://playwright.dev/) to run end to end tests
- [mocha](https://mochajs.org/) to run unit tests
- [typedoc](https://typedoc.org/) to generate the {@page ./Documentation.md documentation}

## Setup

Install the dependencies with

```bash
npm install
# Setup husky
npm run prepare
```

## Standalone web server

To play around and see for yourself any changes to the library, you can use the integrated web server.
Just run

```bash
# Build the package locally and start the web server
npm run build:dev
npm run serve
# Allows live reload by refreshing the page
npm run serve:dev
```

## Build

Make sure everything is clean by running

```bash
npm run clean
```

then all the versions of the package can be built with the command

```bash
npm run build
```

## Tests

### Unit

After having installed the dependencies, run

```bash
npm run test:unit
```

### E2E

After having installed the dependencies, complete the setup required by playwright with

```bash
npx playwright install --with-deps
```

you can then run

```bash
npm run test:e2e
```

> ℹ️ The e2e test configuration is located in _config/playwright.config.ts_.
> Right now, only chromium and firefox are tested, but it is possible to also include safari (see commented section).

## All the scripts

There are all the scripts available in the project.
They can be called with

```
npm run <script name>
```

> ℹ️ The ones beginning with `pre<script name>` or `post<script name>` will run automatically when the `<script name>` is run.

```yaml
start: |
  run the typescript entrypoint with ts-node. 
  May cause errors if any browser specific function is invoked
serve: start the web server on port 3000
serve:dev: |
  start the web server on port 3000 while watching the src folder for changes.
  To apply them, you will need to refresh the page
serve:docs: start the web server on port 8080 to take a look at the documentation generated
watch: watch for changes in the src folder
prepare: prepare the husky git pre-commit hook
test: run both unit and end to end tests
pretest:e2e: make sure the current build is up to date before testing
test:e2e: run the end to end tests
test:unit: run the unit tests
clean: remove both lib and dist folders
prebuild: make sure the folders are cleared before building
build: build the package for node (cjs, esm) and browser (single bundle, esm)
postbuild: generate type bindings
build:dev: build the project for the local web server
format: use prettier to format the code
lint: use eslint to lint the code
lint-staged: apply linting on the pre-commit hook
docs: generate the documentation
```
