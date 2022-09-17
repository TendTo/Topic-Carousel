import { TopicList, Topic } from '@topic-carousel/data';
import { BaseElement } from './BaseElement';

export type TopicAllElementEvents = {
  topicAllClick: () => void;
};

export class TopicAllElement extends BaseElement {
  private _isActive = false;

  public get isActive(): boolean {
    return this._isActive;
  }

  public set isActive(isActive: boolean) {
    // No need to update anything if the state is the same
    if (this._isActive === isActive) return;
    this._isActive = isActive;
    this.element.classList.toggle(this.elementOptions.topicButtonActiveClass, isActive);
  }

  public override setupEvents(): void {
    this.element.addEventListener('click', this.onClick);
    this.eventManager.on('topicChange', this.onTopicChange);
  }

  private onClick = () => this.eventManager.emit('topicAllClick');

  private onTopicChange = (_: Topic | null, topicList: TopicList) =>
    (this.isActive = topicList.areAllInactive);
}
