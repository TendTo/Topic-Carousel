import { INVALID_NUMBER_VALUE } from '@topic-carousel/constants';
import { Position } from '@topic-carousel/data';
import { ItemElement } from '@topic-carousel/element';
import { EventManager } from '@topic-carousel/event';
import { ElementOptions } from './BaseElement';
import { ItemsElement } from './ItemsElement';

export class ItemsElementTranslate extends ItemsElement {
  constructor(
    eventManager: EventManager,
    selector: string | HTMLElement,
    options: ElementOptions,
    items: ItemElement[] = [],
  ) {
    super(eventManager, selector, options, items);
  }

  protected onResize = (): void => {
    const item = this._items.find((item) => item.isActive || item.overrideIsActive);
    this.itemWidth = item?.width ?? INVALID_NUMBER_VALUE;
    if (this.lastPosition !== INVALID_NUMBER_VALUE) this.onPositionChange(this.lastPosition);
  };

  protected onPositionChange = (prevPosition: number, position?: Position) => {
    const pos = position?.position ?? prevPosition;
    this.lastPosition = pos;
    this.translate(-pos * this.itemWidth, 0);
  };
}
