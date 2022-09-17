import { expect } from 'chai';
import { EventManager } from '@topic-carousel/event';
import { spy, createStubInstance } from 'sinon';
import { Topic, TopicList } from '@topic-carousel/data';

describe('EventManager', function () {
  let eventManager: EventManager;
  const noOp = () => void 0;
  const listener = spy();
  const topic = createStubInstance(Topic);
  const topicList = createStubInstance(TopicList);

  beforeEach(function () {
    eventManager = new EventManager();
  });

  afterEach(function () {
    listener.resetHistory();
    eventManager.emit('destroy');
  });

  describe('general', function () {
    it('should be created', function () {
      expect(new EventManager()).to.be.ok;
    });

    it('should use the holder target, if provided', function () {
      const eventTarget = document.createDocumentFragment();
      const manager = new EventManager({ eventTarget });
      expect(manager.target).to.be.equal(eventTarget);
    });
  });

  describe('on', function () {
    it('should add a listener', function () {
      eventManager.on('topicChange', noOp);

      expect(eventManager.binder.listeners).to.have.lengthOf(1);
      expect(eventManager.binder.listeners[0][0]).to.be.equal('topicChange');
      expect(eventManager.binder.listeners[0][1]).to.be.equal(noOp);
    });

    it('should add multiple listener to the same event', function () {
      eventManager.on('topicChange', noOp);
      eventManager.on('topicChange', noOp);

      expect(eventManager.binder.listeners).to.have.lengthOf(2);
      expect(eventManager.binder.listeners[0][0]).to.be.equal('topicChange');
      expect(eventManager.binder.listeners[0][1]).to.be.equal(noOp);
      expect(eventManager.binder.listeners[1][0]).to.be.equal('topicChange');
      expect(eventManager.binder.listeners[1][1]).to.be.equal(noOp);
    });

    it('should listen on multiple events', function () {
      eventManager.on('topicChange', noOp);
      eventManager.on('positionChange', noOp);

      expect(eventManager.binder.listeners).to.have.lengthOf(2);
      expect(eventManager.binder.listeners[0][0]).to.be.equal('topicChange');
      expect(eventManager.binder.listeners[0][1]).to.be.equal(noOp);
      expect(eventManager.binder.listeners[1][0]).to.be.equal('positionChange');
      expect(eventManager.binder.listeners[1][1]).to.be.equal(noOp);
    });
  });

  describe('off', function () {
    it('should remove a listener', function () {
      eventManager.on('topicChange', noOp);
      eventManager.off('topicChange', noOp);

      expect(eventManager.binder.listeners).to.have.lengthOf(0);
    });

    it('should remove only the specified listener', function () {
      eventManager.on('topicChange', noOp);
      eventManager.on('topicChange', () => void 0);
      eventManager.off('topicChange', noOp);

      expect(eventManager.binder.listeners).to.have.lengthOf(1);
    });

    it('should remove all listeners of the event', function () {
      eventManager.on('topicChange', noOp);
      eventManager.on('topicChange', () => void 0);
      eventManager.off('topicChange');

      expect(eventManager.binder.listeners).to.have.lengthOf(0);
    });

    it('should remove all listeners only from the specified event ', function () {
      eventManager.on('topicChange', noOp);
      eventManager.on('positionChange', noOp);
      eventManager.off('topicChange');

      expect(eventManager.binder.listeners).to.have.lengthOf(1);
    });

    it('should remove only the listener of the specified event', function () {
      eventManager.on('topicChange', noOp);
      eventManager.on('positionChange', noOp);
      eventManager.off('topicChange', noOp);

      expect(eventManager.binder.listeners).to.have.lengthOf(1);
    });
  });

  describe('emit', function () {
    it('should call the listener', function () {
      eventManager.on('topicChange', listener);
      eventManager.emit('topicChange', topic, topicList);

      expect(listener).to.have.been.calledOnce;
    });

    it('should call the listener with the provided args', function () {
      eventManager.on('topicChange', listener);
      eventManager.emit('topicChange', topic, topicList);

      expect(listener).to.have.been.calledOnceWithExactly(topic, topicList);
    });

    it('should call all the listeners', function () {
      eventManager.on('topicChange', listener);
      eventManager.on('topicChange', listener);
      eventManager.on('topicChange', listener);
      eventManager.emit('topicChange', topic, topicList);

      expect(listener).to.have.been.calledThrice;
    });

    it('should not call removed listeners', function () {
      eventManager.on('topicChange', listener);
      eventManager.emit('topicChange', topic, topicList);

      expect(listener).to.have.been.calledOnce;

      eventManager.off('topicChange', listener);
      eventManager.emit('topicChange', topic, topicList);

      expect(listener).to.have.been.calledOnce;
    });
  });
});
