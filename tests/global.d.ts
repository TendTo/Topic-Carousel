import type { Topic, TopicButton, TopicList } from '../src/index';

declare global {
  const TopicCarousel: {
    TopicList: typeof TopicList;
    Topic: typeof Topic;
    TopicButton: typeof TopicButton;
  };
}
