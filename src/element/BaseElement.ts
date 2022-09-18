import { EventManager, EventClass } from '@topic-carousel/event';

/** Options for the initialization of an Element object */
export type ElementOptions = {
  /** Css selector used for the carousel container */
  carouselSelector: string;
  /** Css selector used to identify the items flex-box of the carousel */
  itemsSelector: string;
  /** Css selector used to identify the items of the carousel */
  itemSelector: string;
  /** Css selector for the topic buttons*/
  topicSelector: string;
  /** Css selector for button that handles the selection or deselection of all topics */
  topicAllSelector?: string;
  /** Css selector for the right arrow button */
  rightArrowSelector: string;
  /** Css selector for the left arrow button */
  leftArrowSelector: string;
  /** The data-[attribute] that will be used to identify and filter using topics */
  topicDataAttribute: string;
  /** Class added to an active topic button */
  topicButtonActiveClass: string;
  /** Transform property applied to the items element when sliding to another item */
  transitionTransform: string;
  /**
   * Transform property applied to the items element when it needs to teleport.
   * Can be useful if you already expect the element to have some transition applied.
   */
  transitionTeleport: string;
  /** Data attribute in the carousel element that indicates the number of columns */
  nColsDataAttribute: string;
  /** Default number of columns if the {@link nColsDataAttribute} was not found */
  defaultNCols: number;
  /** Wether the width of each item should be set automatically based on the number of columns  */
  autoSetItemsWidth: boolean;
};

export class BaseElement extends EventClass {
  public readonly element: HTMLElement;

  /**
   * Creates a new BaseElement instance.
   * @param selector css selector for the element to be returned
   * @param options option configuration shared by all elements
   */
  public constructor(eventManager: EventManager, selector: string, options: ElementOptions);
  /**
   * Creates a new BaseElement instance.
   * @param element element to be wrapped
   * @param options option configuration shared by all elements
   */
  public constructor(eventManager: EventManager, element: HTMLElement, options: ElementOptions);
  public constructor(
    eventManager: EventManager,
    elementOrSelector: string | HTMLElement,
    options: ElementOptions,
  );
  public constructor(
    eventManager: EventManager,
    elementOrSelector: string | HTMLElement,
    public readonly elementOptions: ElementOptions,
  ) {
    super(eventManager);
    if (typeof elementOrSelector === 'string') {
      const element = document.querySelector(elementOrSelector);
      if (!(element instanceof HTMLElement)) {
        throw new Error(`Topic button with selector ${elementOrSelector} not found`);
      }
      this.element = element;
    } else {
      this.element = elementOrSelector;
    }
  }

  /**
   * Apply a {@link document.querySelector} to the element and return the result.
   * @param selector css selector for the element to be returned
   * @returns element that match the selector on null if none is found
   */
  public querySelector(selector: string): HTMLElement | null {
    return this.element.querySelector(selector);
  }

  /**
   * Apply a {@link document.querySelectorAll} to the element and return the result.
   * @param selector css selector for the elements to be returned
   * @returns list of elements that match the selector
   */
  public querySelectorAll(selector: string): HTMLElement[] {
    return Array.from(this.element.querySelectorAll(selector));
  }
}
