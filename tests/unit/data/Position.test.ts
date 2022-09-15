import { expect, use } from 'chai';
import { Position } from '@topic-carousel/data';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';

use(sinonChai);

describe('Topic', function () {
  const defaultMaxPos = 10;

  it('should be created', function () {
    expect(new Position(100)).to.be.ok;
  });
  it('should have the correct default setup', function () {
    const position = new Position(defaultMaxPos);
    expect(position.maxPosition).to.equal(defaultMaxPos);
    expect(position.position).to.equal(0);
    expect(position.loop).to.be.false;
  });
  it('should have the correct setup with custom data', function () {
    const options = { loop: true, initialPosition: defaultMaxPos / 2 };
    const position = new Position(defaultMaxPos, options);
    expect(position.maxPosition).to.equal(defaultMaxPos);
    expect(position.position).to.equal(options.initialPosition);
    expect(position.loop).to.equal(options.loop);
  });
  it('should clamp starting position too high', function () {
    const initialPosition = defaultMaxPos + 1;
    const position = new Position(defaultMaxPos, { initialPosition });
    expect(position.position).to.equal(defaultMaxPos);
  });
  it('should clamp starting position too low', function () {
    const initialPosition = -1;
    const position = new Position(defaultMaxPos, { initialPosition });
    expect(position.position).to.equal(0);
  });
  it('should go to the next position', function () {
    const listener = spy();
    const initialPosition = defaultMaxPos / 2;
    const position = new Position(defaultMaxPos, { initialPosition });
    position.on('onPositionChange', listener);
    position.goNext();
    expect(position.position).to.equal(initialPosition + 1);
    expect(listener).to.have.been.calledOnceWithExactly(true, initialPosition + 1, initialPosition);
  });
});
