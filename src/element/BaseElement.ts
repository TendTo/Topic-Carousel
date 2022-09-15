export type ElementOptions = {
  /** Css selector used for the carousel container */
  carouselSelector: string;
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
};

export class BaseElement {
  public readonly element: HTMLElement;

  /**
   * Creates a new BaseElement instance.
   * @param selector css selector for the element to be returned
   * @param options option configuration shared by all elements
   */
  public constructor(selector: string, options: ElementOptions);
  /**
   * Creates a new BaseElement instance.
   * @param element element to be wrapped
   * @param options option configuration shared by all elements
   */
  public constructor(element: HTMLElement, options: ElementOptions);
  public constructor(elementOrSelector: string | HTMLElement, options: ElementOptions);
  public constructor(
    elementOrSelector: string | HTMLElement,
    public readonly elementOptions: ElementOptions,
  ) {
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

  /**
   * @virtual
   * Adds all the listeners the element needs for its interactivity.
   */
  public addListeners() {
    throw new Error('This element does not support adding listeners');
  }
}
