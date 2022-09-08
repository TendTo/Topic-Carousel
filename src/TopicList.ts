import { Topic } from './Topic';

type OnTopicsCallback = (topics: Topic[]) => void;
type OnTopicChangeCallback = (topic: Topic) => void;

type TopicListEvents = {
  onTopicChange: OnTopicChangeCallback;
  onAllTopicsActive: OnTopicsCallback;
  onAllTopicsInactive: OnTopicsCallback;
};

export class TopicList implements IEventEmitter<TopicListEvents> {
  private _topics: Topic[];
  private _onTopicChangeCallbacks: OnTopicChangeCallback[] = [];
  private _onAllTopicsActiveCallbacks: OnTopicsCallback[] = [];
  private _onAllTopicsInactiveCallbacks: OnTopicsCallback[] = [];
  private _nActive = 0;

  constructor(topics?: Topic[]) {
    this._topics = topics ?? [];
    this._nActive = this._topics.reduce((nActive, topic) => (nActive += topic.isActive ? 1 : 0), 0);
  }

  public on<E extends keyof TopicListEvents>(event: E, callback: TopicListEvents[E]) {
    switch (event) {
      case 'onTopicChange':
        this._onTopicChangeCallbacks.push(callback as OnTopicChangeCallback);
        break;
      case 'onAllTopicsActive':
        this._onAllTopicsActiveCallbacks.push(callback as OnTopicsCallback);
        break;
      case 'onAllTopicsInactive':
        this._onAllTopicsInactiveCallbacks.push(callback as OnTopicsCallback);
        break;
      default:
        throw new Error(`Event ${event} not found`);
    }
  }

  public off<E extends keyof TopicListEvents>(event: E, callback: TopicListEvents[E]): void {
    switch (event) {
      case 'onTopicChange':
        this._onTopicChangeCallbacks = this._onTopicChangeCallbacks.filter((cb) => cb !== callback);
        break;
      case 'onAllTopicsActive':
        this._onAllTopicsActiveCallbacks = this._onAllTopicsActiveCallbacks.filter(
          (cb) => cb !== callback,
        );
        break;
      case 'onAllTopicsInactive':
        this._onAllTopicsInactiveCallbacks = this._onAllTopicsInactiveCallbacks.filter(
          (cb) => cb !== callback,
        );
        break;
      default:
        throw new Error(`Event ${event} not found`);
    }
  }

  public setTopics(topics: Topic[]) {
    this._topics = topics;
  }

  public addTopic(topic: Topic) {
    this._topics.push(topic);
  }

  public get topics(): Topic[] {
    return this._topics;
  }

  public get activeTopics(): Topic[] {
    return this._topics.filter((topic) => topic.isActive);
  }

  public get inactiveTopics(): Topic[] {
    return this._topics.filter((topic) => !topic.isActive);
  }

  public get areAllActive(): boolean {
    return this._topics.every((topic) => topic.isActive);
  }

  public get areAllInactive(): boolean {
    return this._topics.every((topic) => !topic.isActive);
  }

  public getTopicByName(name: string): Topic | undefined {
    return this._topics.find((topic) => topic.name === name);
  }

  private onTopicChange(topic: Topic) {
    this._onTopicChangeCallbacks.forEach((callback) => callback(topic));
    this._nActive += topic.isActive ? 1 : -1;
    if (this._nActive === this._topics.length) {
      this._onAllTopicsActiveCallbacks.forEach((callback) => callback(this._topics));
    } else if (this._nActive === 0) {
      this._onAllTopicsInactiveCallbacks.forEach((callback) => callback(this._topics));
    }
  }

  public toggleTopic(id: string | number): void {
    let topic: Topic | undefined;
    if (typeof id === 'string') {
      topic = this.getTopicByName(id);
    } else {
      topic = this._topics[id];
    }
    if (!topic) throw new Error(`Topic ${id} not found`);
    topic.toggleActive();
    this.onTopicChange(topic);
  }

  public setTopicActive(id: string | number, isActive: boolean): void {
    let topic: Topic | undefined;
    if (typeof id === 'string') {
      topic = this.getTopicByName(id);
    } else {
      topic = this._topics[id];
    }
    if (!topic) throw new Error(`Topic ${id} not found`);
    if (topic.isActive !== isActive) {
      topic.isActive = isActive;
      this.onTopicChange(topic);
    }
  }

  public toggleTopics(): void {
    this._topics.forEach((topic) => {
      topic.toggleActive();
      this.onTopicChange(topic);
    });
  }

  public setTopicsActive(isActive: boolean): void {
    this._topics.forEach((topic) => {
      if (topic.isActive !== isActive) {
        topic.isActive = isActive;
        this.onTopicChange(topic);
      }
    });
  }
}
