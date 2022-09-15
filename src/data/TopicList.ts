import { TopicElement } from '../element/TopicElement';
import { Topic } from './Topic';

type OnTopicChangeCallback = (topic: Topic | null, topicList: TopicList) => void;

type TopicListEvents = {
  onTopicChange: OnTopicChangeCallback;
};

export class TopicList implements IEventEmitter<TopicListEvents> {
  private _topics: Topic[];
  private _onTopicChangeCallbacks: OnTopicChangeCallback[] = [];
  private _nActive = 0;

  static fromTopicElements(topicElements: TopicElement[]): TopicList {
    return new TopicList(topicElements.map((topicElement) => new Topic(topicElement.topic)));
  }

  constructor(topics?: Topic[]) {
    this._topics = [...new Set(topics)] ?? [];
    this._nActive = this.calculateNActive();
  }

  public on<E extends keyof TopicListEvents>(event: E, listener: TopicListEvents[E]) {
    switch (event) {
      case 'onTopicChange':
        this._onTopicChangeCallbacks.push(listener as OnTopicChangeCallback);
        break;
      default:
        throw new Error(`Event ${event} not found`);
    }
  }

  public off<E extends keyof TopicListEvents>(event: E, listener: TopicListEvents[E]): void {
    switch (event) {
      case 'onTopicChange':
        this._onTopicChangeCallbacks = this._onTopicChangeCallbacks.filter((cb) => cb !== listener);
        break;
      default:
        throw new Error(`Event ${event} not found`);
    }
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
    this._onTopicChangeCallbacks.forEach((callback) => callback(topic, this));
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
