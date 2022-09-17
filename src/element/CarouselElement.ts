import { Position, Topic, TopicList } from '@topic-carousel/data';
import { ArrowElement } from './ArrowElement';
import { BaseElement } from './BaseElement';
import { ItemElement } from './ItemElement';
import { ItemsElement } from './ItemsElement';
import { TopicAllElement } from './TopicAllElement';
import { TopicElement } from './TopicElement';

export class CarouselElement extends BaseElement {
  private readonly topicList = new TopicList(this.eventManager);
  private readonly position = new Position(this.eventManager);

  /**
   * Uses the css selector to find the topics in the carousel and returns them as a list of Topic instances.
   * @returns all the topics gathered from the css selector 'topicSelector'
   */
  public getTopics(): Topic[] {
    return this.querySelectorAll(this.elementOptions.topicSelector).map(
      (topicElement) =>
        new Topic(topicElement.dataset[this.elementOptions.topicDataAttribute] ?? ''),
    );
  }

  /**
   * Uses the css selector to find the topic elements and returns them as TopicElement instances.
   * Also, adds the topic to the topic list.
   * @returns all the topic elements found in the carousel
   */
  public getTopicElements(): TopicElement[] {
    const topicElements = [];
    const elements = this.querySelectorAll(
      `${this.elementOptions.topicSelector}[data-${this.elementOptions.topicDataAttribute}]`,
    );
    for (const element of elements) {
      topicElements.push(new TopicElement(this.eventManager, element, this.elementOptions));
      this.topicList.addTopic(
        new Topic(element.dataset[this.elementOptions.topicDataAttribute] ?? ''),
      );
    }
    return topicElements;
  }

  public getTopicAllElement(): TopicAllElement | null {
    if (!this.elementOptions.topicAllSelector) return null;
    const topicAllElement = this.querySelector(this.elementOptions.topicAllSelector);
    return topicAllElement
      ? new TopicAllElement(this.eventManager, topicAllElement, this.elementOptions)
      : null;
  }

  public getItemElements(): ItemElement[] {
    const items = this.querySelectorAll(
      `${this.elementOptions.itemSelector}[data-${this.elementOptions.topicDataAttribute}]`,
    ).map((topicElement) => new ItemElement(this.eventManager, topicElement, this.elementOptions));
    return items;
  }

  public getItemsElement(): ItemsElement {
    const items = this.querySelectorAll(
      `${this.elementOptions.itemSelector}[data-${this.elementOptions.topicDataAttribute}]`,
    ).map((topicElement) => new ItemElement(this.eventManager, topicElement, this.elementOptions));
    return new ItemsElement(
      this.eventManager,
      this.elementOptions.itemsSelector,
      this.elementOptions,
      items,
    );
  }

  /**
   * Uses the css selector to find the arrow elements and returns them as ArrowElement instances.
   * @returns both arrow elements, if they are found, or null otherwise
   */
  public getArrows(): readonly [ArrowElement | null, ArrowElement | null] {
    const lArrow = this.querySelector(this.elementOptions.leftArrowSelector);
    const rArrow = this.querySelector(this.elementOptions.rightArrowSelector);
    return [
      lArrow ? new ArrowElement(this.eventManager, lArrow, this.elementOptions, 'prev') : null,
      rArrow ? new ArrowElement(this.eventManager, rArrow, this.elementOptions, 'next') : null,
    ] as const;
  }
}
