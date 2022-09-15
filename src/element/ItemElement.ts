import { Topic } from '../data/Topic';
import { TopicList } from '../data/TopicList';
import { BaseElement, ElementOptions } from './BaseElement';

export class ItemElement extends BaseElement {
  private _isActive;
  public readonly topic: string;

  constructor(
    elementOrSelector: HTMLElement | string,
    options: ElementOptions,
    private readonly topicList: TopicList,
  ) {
    super(elementOrSelector, options);
    this.topic = this.element.dataset[this.elementOptions.topicDataAttribute] ?? '';
    this._isActive = getComputedStyle(this.element).display !== 'none';
  }

  public get isActive(): boolean {
    return this._isActive;
  }

  public set isActive(isActive: boolean) {
    if (this._isActive === isActive) return;
    this._isActive = isActive;
    this.element.style.display = isActive ? 'block' : 'none';
  }

  public override addListeners(): void {
    this.element.addEventListener('click', this.onClick);
    this.topicList.on('onTopicChange', this.onTopicChange);
  }

  private onClick = () => {
    console.log('Item clicked');
  };

  private onTopicChange = (_: Topic | null, topicList: TopicList) => {
    if (topicList.areAllActive || topicList.areAllInactive) this.isActive = true;
    else
      this.isActive = topicList.topics.some((topic) => topic.id === this.topic && topic.isActive);
  };
}
