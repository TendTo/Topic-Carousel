import { TopicList, Topic } from '@topic-carousel/data';
import { EventManager } from '@topic-carousel/event';
import { BaseElement, ElementOptions } from './BaseElement';

export type TopicElementEvents = {
  topicClick: (topic: string) => void;
};

export class TopicElement extends BaseElement implements ITopic {
  public readonly topic: string;
  additionalData: unknown;
  private _isActive;

  constructor(
    eventManager: EventManager,
    elementOrSelector: HTMLElement | string,
    options: ElementOptions,
  ) {
    super(eventManager, elementOrSelector, options);
    this.topic = this.element.dataset[this.elementOptions.topicDataAttribute] ?? '';
    this._isActive = this.element.classList.contains(this.elementOptions.topicButtonActiveClass);
  }

  public get isActive(): boolean {
    return this._isActive;
  }

  public set isActive(isActive: boolean) {
    // No need to update anything if the state is the same
    if (this._isActive === isActive) return;
    this._isActive = isActive;
    this.element.classList.toggle(this.elementOptions.topicButtonActiveClass, isActive);
  }

  toggleActive(): void {
    this.isActive = !this._isActive;
  }

  public override setupEvents(): void {
    this.element.addEventListener('click', this.onClick);
    this.eventManager.on('topicChange', this.onTopicChange);
  }

  private onClick = () => this.eventManager.emit('topicClick', this.topic);

  private onTopicChange = (topic: Topic | null, topicList: TopicList) => {
    if (topicList.areAllInactive) this.isActive = false;
    else if (topicList.areAllActive) this.isActive = true;
    else if (topic && this.topic === topic.id) this.toggleActive();
  };
}
