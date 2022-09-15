import { TopicList } from './data/TopicList';
import {
  ArrowElement,
  ElementOptions,
  CarouselElement,
  ItemElement,
  TopicAllElement,
  TopicElement,
} from './element';

type TopicCarouselOptions = {
  /** Css selector used for the carousel container */
  carouselSelector?: string;
  /** Css selector used to identify the items of the carousel */
  itemSelector?: string;
  /** Css selector for the topic buttons*/
  topicSelector?: string;
  /** Css selector for button that handles the selection or deselection of all topics */
  topicAllSelector?: string;
  /** Css selector for the right arrow button */
  rightArrowSelector?: string;
  /** Css selector for the left arrow button */
  leftArrowSelector?: string;
  /** The data-[attribute] that will be used to identify and filter using topics */
  topicDataAttribute?: string;
  /** Class added to an active topic button */
  topicButtonActiveClass?: string;
};

export class TopicCarousel {
  private readonly carousel: CarouselElement;
  private readonly topicList: TopicList;
  private readonly topicElements: TopicElement[];
  private readonly leftArrow: ArrowElement | null;
  private readonly rightArrow: ArrowElement | null;
  private readonly items: ItemElement[];
  private readonly topicAllElement: TopicAllElement | null;

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
    const elementOptions = this.getElementOptionsFromOptions(topicCarouselOptions);
    this.topicList = new TopicList();
    this.carousel = new CarouselElement(
      elementOptions.carouselSelector,
      elementOptions,
      this.topicList,
    );
    this.topicAllElement = this.carousel.getTopicAllElement();
    this.topicElements = this.carousel.getTopicElements();
    this.items = this.carousel.getItems();
    [this.leftArrow, this.rightArrow] = this.carousel.getArrows();
  }

  public init() {
    this.topicElements.forEach((topicElement) => topicElement.addListeners());
    this.items.forEach((item) => item.addListeners());
    if (this.leftArrow) this.leftArrow.addListeners();
    if (this.rightArrow) this.rightArrow.addListeners();
    if (this.topicAllElement) this.topicAllElement.addListeners();
  }

  private getElementOptionsFromOptions(options: TopicCarouselOptions): ElementOptions {
    const {
      carouselSelector = '#topic-carousel',
      itemSelector = '.tc-item',
      topicSelector = '.tc-topic',
      topicButtonActiveClass = 'tc-topic--active',
      rightArrowSelector = '.tc-arrow--right',
      leftArrowSelector = '.tc-arrow--left',
      topicDataAttribute = 'topic',
      topicAllSelector = '#tc-topic-all',
    } = options;
    return {
      carouselSelector,
      itemSelector,
      topicSelector,
      topicButtonActiveClass,
      rightArrowSelector,
      leftArrowSelector,
      topicDataAttribute,
      topicAllSelector,
    };
  }
}
