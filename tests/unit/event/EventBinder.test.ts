import { expect } from 'chai';
import { EventBinder } from '@topic-carousel/event';
import { spy } from 'sinon';

describe('EventBinder', function () {
  const eventName = 'test';
  const eventNames = ['test', 'test2'];
  const noOp = () => void 0;
  const listener = spy();
  let target: EventTarget;
  let eventBinder: EventBinder;

  beforeEach(function () {
    target = document.createDocumentFragment();
    eventBinder = new EventBinder(target);
  });

  afterEach(function () {
    listener.resetHistory();
    eventBinder.dispatch('destroy');
  });

  describe('general', function () {
    it('should be created', function () {
      expect(new EventBinder(target)).to.be.ok;
    });
  });

  describe('bind', function () {
    it('should bind an event', function () {
      eventBinder.bind(eventName, noOp);

      expect(eventBinder.listeners).to.have.lengthOf(1);
      expect(eventBinder.listeners[0][0]).to.equal(eventName);
      expect(eventBinder.listeners[0][1]).to.equal(noOp);
    });

    it('should bind multiple listeners to an event', function () {
      eventBinder.bind(eventName, noOp);
      eventBinder.bind(eventName, noOp);

      expect(eventBinder.listeners).to.have.lengthOf(2);
      expect(eventBinder.listeners[0][0]).to.equal(eventName);
      expect(eventBinder.listeners[0][1]).to.equal(noOp);
      expect(eventBinder.listeners[1][0]).to.equal(eventName);
      expect(eventBinder.listeners[1][1]).to.equal(noOp);
    });

    it('should bind multiple events', function () {
      eventBinder.bind(eventNames, noOp);

      expect(eventBinder.listeners).to.have.lengthOf(2);
      expect(eventBinder.listeners[0][0]).to.equal(eventNames[0]);
      expect(eventBinder.listeners[0][1]).to.equal(noOp);
      expect(eventBinder.listeners[1][0]).to.equal(eventNames[1]);
      expect(eventBinder.listeners[1][1]).to.equal(noOp);
    });
  });

  describe('unbind', function () {
    it('should unbind from an event without callback', function () {
      eventBinder.bind(eventName, noOp);
      eventBinder.unbind(eventName);

      expect(eventBinder.listeners).to.have.lengthOf(0);
    });

    it('should unbind from an event with callback', function () {
      eventBinder.bind(eventName, noOp);
      eventBinder.unbind(eventName, noOp);

      expect(eventBinder.listeners).to.have.lengthOf(0);
    });

    it('should unbind from multiple different events without callback', function () {
      eventBinder.bind(eventNames, noOp);
      eventBinder.unbind(eventNames);

      expect(eventBinder.listeners).to.have.lengthOf(0);
    });

    it('should unbind from multiple different events with callback', function () {
      eventBinder.bind(eventNames, noOp);
      eventBinder.unbind(eventNames, noOp);

      expect(eventBinder.listeners).to.have.lengthOf(0);
    });

    it('should unbind single event without callback leaving different ones', function () {
      eventBinder.bind(eventNames, noOp);
      eventBinder.unbind(eventName);

      expect(eventBinder.listeners).to.have.lengthOf(1);
    });

    it('should unbind all callbacks from single event', function () {
      eventBinder.bind(eventName, noOp);
      eventBinder.bind(eventName, () => 1);
      eventBinder.unbind(eventName);

      expect(eventBinder.listeners).to.have.lengthOf(0);
    });

    it('should unbind only provided callback from single event', function () {
      eventBinder.bind(eventName, noOp);
      eventBinder.bind(eventName, () => 1);
      eventBinder.unbind(eventName, noOp);

      expect(eventBinder.listeners).to.have.lengthOf(1);
    });

    it('should unbind all events', function () {
      eventBinder.bind(eventNames, noOp);
      eventBinder.unbindAll();

      expect(eventBinder.listeners).to.have.lengthOf(0);
    });

    it('should call "unbindAll" upon destroy', function () {
      const unbindAll = spy(eventBinder, 'unbindAll');
      eventBinder.dispatch('destroy');

      expect(unbindAll).to.have.been.calledOnceWithExactly();
    });
  });

  describe('dispatch', function () {
    it('should dispatch an event', function () {
      eventBinder.bind(eventName, listener);
      eventBinder.dispatch(eventName);

      expect(listener).to.have.been.calledOnce;
    });

    it('should dispatch an event with arguments', function () {
      const args = [1, 2, 3];
      eventBinder.bind(eventName, listener);
      eventBinder.dispatch(eventName, args);

      expect(listener).to.have.been.calledOnceWithExactly(...args);
    });

    it('should call all the listeners bound to an event', function () {
      eventBinder.bind(eventName, listener);
      eventBinder.bind(eventName, listener);
      eventBinder.bind(eventName, listener);
      eventBinder.dispatch(eventName);

      expect(listener).to.have.been.calledThrice;
    });

    it('should not dispatch not bound events', function () {
      eventBinder.dispatch(eventName);

      expect(listener).to.not.have.been.called;
    });

    it('should not dispatch events that have been unbound', function () {
      eventBinder.bind(eventName, listener);
      eventBinder.dispatch(eventName);

      expect(listener).to.have.been.calledOnce;

      eventBinder.unbind(eventName);
      eventBinder.dispatch(eventName);

      expect(listener).to.have.been.calledOnce;
    });
  });
});
