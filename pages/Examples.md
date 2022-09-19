<script src="https://unpkg.com/topic-carousel/dist/bundle/topic-carousel.min.js"></script>

## Basic example

<div id="topic-carousel" data-sm="1" data-md="2" data-lg="3" data-n-cols="2">
    <div class="tc-title-container">
    <p class="tc-title">Title</p>
    </div>
    <div class="tc-content">
    <div class="tc-topics-container">
        <div class="tc-topics">
        <div id="tc-topic-all" class="tc-topic">All</div>
        <div class="tc-topic" data-topic="Topic1">Topic1</div>
        <div class="tc-topic" data-topic="Topic2">Topic2</div>
        <div class="tc-topic" data-topic="Topic3">Topic3</div>
        </div>
    </div>
    <div class="tc-arrows">
        <div class="tc-arrow tc-arrow--left">
        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 24 24" width="48"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></svg>
        </div>
        <div class="tc-arrow tc-arrow--right">
        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 24 24" width="48"><path
            transform="scale(-1, 1) translate(-24, 0)"
            d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
            /></svg>
        </div>
    </div>
    <div class="tc-items-container">
        <div class="tc-items">
        <div class="tc-item" data-topic="Topic1">
            <div class="tc-item-content">Item1</div>
        </div>
        <div class="tc-item" data-topic="Topic1">
            <div class="tc-item-content">Item2</div>
        </div>
        <div class="tc-item" data-topic="Topic2">
            <div class="tc-item-content">Item3</div>
        </div>
        <div class="tc-item" data-topic="Topic1">
            <div class="tc-item-content">Item4</div>
        </div>
        <div class="tc-item" data-topic="Topic3">
            <div class="tc-item-content">Item5</div>
        </div>
        <div class="tc-item" data-topic="Topic1">
            <div class="tc-item-content">Item6</div>
        </div>
        </div>
    </div>
    </div>
</div>

<script>
    window.addEventListener('DOMContentLoaded', () => {
      var carousel = new TopicCarousel.TopicCarousel();
      carousel.init();
    });
</script>

### Javascript

```html
<body>
  <!-- ... -->
  <!-- Include library script -->
  <script src="https://unpkg.com/topic-carousel/dist/bundle/topic-carousel.min.js"></script>
</body>
```

```js
// Add a custom script
window.addEventListener('DOMContentLoaded', () => {
  var carousel = new TopicCarousel.TopicCarousel();
  carousel.init();
});
```

### Html

```html
<div id="topic-carousel" data-sm="1" data-md="2" data-lg="3" data-n-cols="2">
    <!-- Title -->
    <div class="tc-title-container">
    <p class="tc-title">Title</p>
    </div>
    <!-- End Title -->
    <!-- Carousel body -->
    <div class="tc-content">
    <!-- Topic badges -->
    <div class="tc-topics-container">
        <div class="tc-topics">
        <div id="tc-topic-all" class="tc-topic">All</div>
        <div class="tc-topic" data-topic="Topic1">Topic1</div>
        <div class="tc-topic" data-topic="Topic2">Topic2</div>
        <div class="tc-topic" data-topic="Topic3">Topic3</div>
        </div>
    </div>
    <!-- End Topic badges -->
    <!-- Navigation arrows -->
    <div class="tc-arrows">
        <div class="tc-arrow tc-arrow--left">
        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 24 24" width="48"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></svg>
        </div>
        <div class="tc-arrow tc-arrow--right">
        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 24 24" width="48"><path
            transform="scale(-1, 1) translate(-24, 0)"
            d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
            /></svg>
        </div>
    </div>
    <!-- End Navigation arrows -->
    <!-- Item list -->
    <div class="tc-items-container">
        <div class="tc-items">
            <div class="tc-item" data-topic="Topic1">
                <div class="tc-item-content">Item1</div>
            </div>
            <div class="tc-item" data-topic="Topic1">
                <div class="tc-item-content">Item2</div>
            </div>
            <div class="tc-item" data-topic="Topic2">
                <div class="tc-item-content">Item3</div>
            </div>
            <div class="tc-item" data-topic="Topic1">
                <div class="tc-item-content">Item4</div>
            </div>
            <div class="tc-item" data-topic="Topic3">
                <div class="tc-item-content">Item5</div>
            </div>
            <div class="tc-item" data-topic="Topic1">
                <div class="tc-item-content">Item6</div>
            </div>
        </div>
    </div>
    <!-- End Item list -->
    </div>
    <!-- End Carousel body -->
</div>
```

## Common use cases

## Advanced examples
