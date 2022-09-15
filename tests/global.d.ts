import type { TopicCarousel as TopicCarouselClass } from '../src/index';

declare global {
  const TopicCarousel: {
    TopicCarousel: typeof TopicCarouselClass;
  };
}
