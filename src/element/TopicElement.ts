import { Topic } from '../data/Topic';
import { TopicList } from '../data/TopicList';
import { BaseElement, ElementOptions } from './BaseElement';

export class TopicElement extends BaseElement implements ITopic {
  public readonly topic: string;
  additionalData: unknown;
  private _isActive;

  constructor(
    elementOrSelector: HTMLElement | string,
    options: ElementOptions,
    private readonly topicList: TopicList,
  ) {
    super(elementOrSelector, options);
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

  public override addListeners(): void {
    this.element.addEventListener('click', this.onClick);
    this.topicList.on('onTopicChange', this.onTopicChange);
  }

  private onClick = () => {
    this.topicList.toggleTopic(this.topic);
  };

  private onTopicChange = (topic: Topic | null, topicList: TopicList) => {
    if (topicList.areAllInactive) this.isActive = false;
    else if (topicList.areAllActive) this.isActive = true;
    else if (topic && this.topic === topic.id) this.toggleActive();
  };
}
