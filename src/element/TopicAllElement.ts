import { Topic } from '../data/Topic';
import { TopicList } from '../data/TopicList';
import { BaseElement, ElementOptions } from './BaseElement';

export class TopicAllElement extends BaseElement {
  private _isActive = false;

  constructor(
    elementOrSelector: HTMLElement | string,
    options: ElementOptions,
    private readonly topicList: TopicList,
  ) {
    super(elementOrSelector, options);
    this.isActive = this.topicList.areAllInactive;
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
    this.isActive = true;
    this.topicList.setTopicsActive(false);
  };

  private onTopicChange = (_: Topic | null, topicList: TopicList) => {
    this.isActive = topicList.areAllInactive;
  };
}
