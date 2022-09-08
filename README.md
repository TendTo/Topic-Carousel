# TopicCarousel

Carousel with infinite scroll with the ability to filter items through topics.  
Does not need any dependency.

## Use

Install with npm

```bash
npm i topic-carousel
```

or include the script directly in your _html_ file with

```html
<script src="https://unpkg.com/topic-carousel@0.0.1/dist/bundle/topic-carousel.min.js"></script>
```

## Development

If you want to improve the package or you are just curious on how it works, follow this section.

### Requirements

- [node.js 14.x](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (or similar package manager)

### Setup

Install the dependencies with

```bash
npm install
```

### Build

Make sure everything is clean by running

```bash
npm run clean
```

then all the versions of the package can be built with the command

```bash
npm run build
```

### Tests

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
