import { ItemElement } from '@topic-carousel/element';
import { TopicList } from '../data/TopicList';
import { BaseElement, ElementOptions } from './BaseElement';
import { EventManager } from '@topic-carousel/event';
import { INVALID_NUMBER_VALUE } from '@topic-carousel/constants';
import { Position, Topic } from '@topic-carousel/data';
import { debounce } from '@topic-carousel/util';

export type ItemsElementEvents = {
  updatePosition: (lastPosition: number) => void;
  updateItems: (itemsElement: ItemsElement) => void;
};

export class ItemsElement extends BaseElement implements IEventClass, IInit {
  private _items: ItemElement[] = [];
  private itemWidth = INVALID_NUMBER_VALUE;
  private lastPosition = INVALID_NUMBER_VALUE;

  constructor(
    eventManager: EventManager,
    selector: string | HTMLElement,
    options: ElementOptions,
    items: ItemElement[] = [],
  ) {
    super(eventManager, selector, options);
    this.items = items;
  }

  public override setupEvents(): void {
    window.addEventListener('resize', debounce(this.onResize));
    this.eventManager.on('topicChange', this.onTopicChange);
    this.eventManager.on('positionChange', this.onPositionChange);
    if (this.elementOptions.autoSetItemsWidth) this.eventManager.on('updateNCols', this.onResize);
  }

  public override init(): void {
    this.onResize();
    this.eventManager.emit('updateItems', this);
  }

  private onResize = (): void => {
    const item = this._items.find((item) => item.isActive || item.overrideIsActive);
    this.itemWidth = item?.width ?? INVALID_NUMBER_VALUE;
    if (this.lastPosition !== INVALID_NUMBER_VALUE) this.onPositionChange(this.lastPosition);
  };

  private onPositionChange = (prevPosition: number, position?: Position) => {
    const pos = position?.position ?? prevPosition;
    this.lastPosition = pos;
    this.translate(-pos * this.itemWidth, 0);
  };

  private onTopicChange = (topic: Topic | null, topicList: TopicList) => {
    this._items.forEach((item) => {
      item.overrideIsActive = false;
      if (topicList.areAllActive) {
        item.isActive = true;
      } else if (topicList.areAllInactive) {
        item.isActive = false;
        item.overrideIsActive = true;
      } else if (topic?.id === item.topic) {
        item.isActive = topic.isActive;
      }
      item.updateStyle();
    });
    if (this.itemWidth === INVALID_NUMBER_VALUE) this.onResize();
    this.eventManager.emit('updateItems', this);
  };

  public get nActive(): number {
    return this._items.reduce(
      (nActive, item) => (nActive += item.isActive || item.overrideIsActive ? 1 : 0),
      0,
    );
  }

  public get items(): ItemElement[] {
    return this._items;
  }

  public set items(items: ItemElement[]) {
    this._items = items;
    this.onResize();
    this.eventManager.emit('updateItems', this);
  }

  public get activeItems(): ItemElement[] {
    return this._items.filter((item) => item.isActive || item.overrideIsActive);
  }

  public get inactiveItems(): ItemElement[] {
    return this._items.filter((item) => !item.isActive && !item.overrideIsActive);
  }

  public addItem(item: ItemElement, idx = -1): void {
    if (this._items.indexOf(item) !== -1) return;
    this._items.push(item);
    this.eventManager.emit('updateItems', this);
  }

  public removeItem(item: ItemElement, del = true): void {
    this._items.splice(this._items.indexOf(item), 1);
    this.eventManager.emit('updateItems', this);
  }

  private translate(x: number, y: number): void {
    window.requestAnimationFrame(() => {
      this.element.style.transition = this.elementOptions.transitionTransform;
      this.element.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  private teleport(x: number, y: number): void {
    this.element.style.transition = this.elementOptions.transitionTeleport;
    this.element.style.transform = `translate(${x}px, ${y}px)`;
  }
}
