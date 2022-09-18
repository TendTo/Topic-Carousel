import { EventManager } from '@topic-carousel/event';
import { BaseElement, ElementOptions } from './BaseElement';

export class ItemElement extends BaseElement {
  public isActive = false;
  public overrideIsActive = false;
  public readonly topic: string;

  constructor(
    eventManager: EventManager,
    elementOrSelector: HTMLElement | string,
    options: ElementOptions,
  ) {
    super(eventManager, elementOrSelector, options);
    this.topic = this.element.dataset[this.elementOptions.topicDataAttribute] ?? '';
  }

  public get width(): number {
    return this.element.getBoundingClientRect().width;
  }

  public get height(): number {
    return this.element.getBoundingClientRect().height;
  }

  public override setupEvents(): void {
    if (this.elementOptions.autoSetItemsWidth)
      this.eventManager.on('updateNCols', this.onUpdateNCols);
  }

  private onUpdateNCols = (nCols: number) => (this.element.style.width = `${100 / nCols}%`);

  public updateStyle() {
    if (this.overrideIsActive || this.isActive) this.element.style.display = 'block';
    else this.element.style.display = 'none';
  }

  public setPos(x: number, y: number) {
    this.element.style.position = 'absolute';
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
  }

  public translate(x: number, y: number) {
    this.element.style.transition = 'transform 1s ease-in-out';
    window.requestAnimationFrame(() => (this.element.style.transform = `translate(${x}px,${y}px)`));
  }
}
