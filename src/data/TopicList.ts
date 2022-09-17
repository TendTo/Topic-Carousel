import { EventManager, EventClass } from '@topic-carousel/event';
import { TopicElement } from '@topic-carousel/element';
import { Topic } from './Topic';

type OnTopicChangeCallback = (topic: Topic | null, topicList: TopicList) => void;

export type TopicListEvents = {
  topicChange: OnTopicChangeCallback;
};

export class TopicList extends EventClass {
  private _topics: Topic[];
  private _nActive = 0;

  static fromTopicElements(eventManager: EventManager, topicElements: TopicElement[]): TopicList {
    return new TopicList(
      eventManager,
      topicElements.map((topicElement) => new Topic(topicElement.topic)),
    );
  }

  constructor(eventManager: EventManager, topics?: Topic[]) {
    super(eventManager);
    this._topics = [...new Set(topics)] ?? [];
    this._nActive = this.calculateNActive();
  }

  public override setupEvents(): void {
    this.eventManager.on('topicClick', this.onTopicClick);
    this.eventManager.on('topicAllClick', this.onTopicAllClick);
  }

  private onTopicClick = (topic: string) => this.toggleTopic(topic);
  private onTopicAllClick = () => this.setTopicsActive(false);

  protected override init(): void {
    this.eventManager.emit('topicChange', null, this);
  }

  private calculateNActive(): number {
    return this._topics.reduce((nActive, topic) => (nActive += topic.isActive ? 1 : 0), 0);
  }

  public get topics(): Topic[] {
    return this._topics;
  }

  public set topics(topics: Topic[]) {
    this._topics = [...new Set(topics)];
    this._nActive = this.calculateNActive();
  }

  public addTopic(topic: Topic) {
    if (this._topics.indexOf(topic) !== -1) return;
    this._topics.push(topic);
    this._nActive += topic.isActive ? 1 : 0;
    this.onTopicChange();
  }

  public removeTopic(id: string | number): void {
    const topic = this.getTopic(id);
    if (!topic) throw new Error(`Topic ${id} not found`);
    this._topics = this._topics.filter((topic) => topic.id !== id);
    this._nActive -= topic.isActive ? 1 : 0;
    this.onTopicChange();
  }

  public get activeTopics(): Topic[] {
    return this._topics.filter((topic) => topic.isActive);
  }

  public get inactiveTopics(): Topic[] {
    return this._topics.filter((topic) => !topic.isActive);
  }

  public get areAllActive(): boolean {
    return this._nActive === this._topics.length;
  }

  public get areAllInactive(): boolean {
    return this._nActive === 0;
  }

  public getTopic(id: string | number): Topic | undefined {
    let topic: Topic | undefined;
    if (typeof id === 'string') {
      topic = this._topics.find((topic) => topic.id === id);
    } else {
      topic = this._topics[id];
    }
    return topic;
  }

  private onTopicChange(topic: Topic | null = null) {
    if (topic) this._nActive += topic.isActive ? 1 : -1;
    this.eventManager.emit('topicChange', topic, this);
  }

  public toggleTopic(id: string | number): void {
    const topic = this.getTopic(id);
    if (!topic) throw new Error(`Topic ${id} not found`);
    topic.toggleActive();
    this.onTopicChange(topic);
  }

  public setTopicActive(id: string | number, isActive: boolean): void {
    const topic = this.getTopic(id);
    if (!topic) throw new Error(`Topic ${id} not found`);
    if (topic.isActive !== isActive) {
      topic.isActive = isActive;
      this.onTopicChange(topic);
    }
  }

  public toggleTopics(): void {
    this._topics.forEach((topic) => topic.toggleActive());
    this._nActive = this.calculateNActive();
    this.onTopicChange();
  }

  public setTopicsActive(isActive: boolean): void {
    this._topics.forEach((topic) => (topic.isActive = isActive));
    this._nActive = isActive ? this._topics.length : 0;
    this.onTopicChange();
  }
}
