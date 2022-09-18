import { expect } from 'chai';
import { Position } from '@topic-carousel/data';
import { spy } from 'sinon';
import { EventManager } from '@topic-carousel/event';

describe('Position', function () {
  const maxPosition = 10;
  const initialPosition = maxPosition / 2;
  let eventManager: EventManager;
  let position: Position;

  beforeEach(function () {
    eventManager = new EventManager();
    position = new Position(eventManager, { maxPosition, initialPosition });
    eventManager.emit('setup');
    eventManager.emit('init');
  });

  afterEach(function () {
    eventManager.emit('destroy');
  });

  it('should be created', function () {
    expect(new Position(eventManager)).to.be.ok;
  });

  it('should have the correct default setup', function () {
    expect(position.maxPosition).to.equal(maxPosition);
    expect(position.position).to.equal(initialPosition);
    expect(position.loop).to.equal('none');
  });

  it('should have the correct setup with custom data', function () {
    const loop = 'none';
    const position = new Position(eventManager, { maxPosition, loop, initialPosition });
    expect(position.maxPosition).to.equal(maxPosition);
    expect(position.position).to.equal(initialPosition);
    expect(position.loop).to.equal(loop);
  });

  it('should clamp starting position too high', function () {
    const initialPosition = maxPosition + 1;
    const position = new Position(eventManager, { maxPosition, initialPosition });
    expect(position.position).to.equal(maxPosition);
  });

  it('should clamp starting position too low', function () {
    const initialPosition = -1;
    const position = new Position(eventManager, { maxPosition, initialPosition });
    expect(position.position).to.equal(0);
  });

  it('should go to the next position', function () {
    const listener = spy();
    eventManager.on('positionChange', listener);
    eventManager.emit('goNext');
    expect(position.position).to.equal(initialPosition + 1);
    expect(listener).to.have.been.calledOnceWithExactly(initialPosition, position);
  });
});
