import { ElementOptions, CarouselElement } from '@topic-carousel/element';
import { PositionOptions } from '@topic-carousel/data';
import { EventManager } from './event';

/** Options for the initialization of a TopicCarousel object */
type TopicCarouselOptions = Partial<ElementOptions> & Partial<PositionOptions>;

export type TopicCarouselEvents = {
  setup: () => void;
  init: () => void;
  destroy: () => void;
};

export class TopicCarousel {
  public readonly eventManager = new EventManager();

  /**
   * Creates a new TopicCarousel instance.
   */
  constructor();
  /**
   * Creates a new TopicCarousel instance.
   * @param topicCarouselOptions option configuration for the carousel
   */
  constructor(topicCarouselOptions: TopicCarouselOptions);
  constructor(topicCarouselOptions: TopicCarouselOptions = {}) {
    const options = this.applyDefaultOptions(topicCarouselOptions);

    const carousel = new CarouselElement(this.eventManager, options.carouselSelector, options);
    carousel.getTopicAllElement();
    carousel.getTopicElements();
    carousel.getItemsElement();
    carousel.getArrows();

    this.eventManager.emit('setup');
  }

  public init() {
    this.eventManager.emit('init');
  }

  private applyDefaultOptions(options: TopicCarouselOptions): Required<TopicCarouselOptions> {
    const {
      carouselSelector = '#topic-carousel',
      itemsSelector = '.tc-items',
      itemSelector = '.tc-item',
      topicSelector = '.tc-topic',
      topicButtonActiveClass = 'tc-topic--active',
      rightArrowSelector = '.tc-arrow--right',
      leftArrowSelector = '.tc-arrow--left',
      topicDataAttribute = 'topic',
      topicAllSelector = '#tc-topic-all',
      transitionTransform = 'transform 0.4s ease-in-out',
      transitionTeleport = 'none',
      initialPosition = 0,
      loop = 'none',
      defaultNCols = 2,
      nColsDataAttribute = 'nCols',
      autoSetItemsWidth = true,
    } = options;
    return {
      carouselSelector,
      itemsSelector,
      itemSelector,
      topicSelector,
      topicButtonActiveClass,
      rightArrowSelector,
      leftArrowSelector,
      topicDataAttribute,
      topicAllSelector,
      transitionTransform,
      transitionTeleport,
      initialPosition,
      loop,
      defaultNCols,
      nColsDataAttribute,
      autoSetItemsWidth,
    };
  }
}
