import { expect } from 'chai';
import { Topic } from '../../src/Topic';

describe('Topic', function () {
  it('should be created', function () {
    expect(new Topic('')).to.be.ok;
  });
  it('should have the correct setup', function () {
    const name = 'name';
    const topic = new Topic(name);
    expect(topic.name).to.equal(name);
    expect(topic.isActive).to.be.false;
    expect(topic.additionalData).to.deep.equal({});
  });
  it('should have the correct setup with additional data', function () {
    const name = 'name';
    const additionalData = { key: 'value' };
    const topic = new Topic(name, additionalData);
    expect(topic.name).to.equal(name);
    expect(topic.isActive).to.be.false;
    expect(topic.additionalData).to.deep.equal(additionalData);
  });
  it('should toggle isActive', function () {
    const topic = new Topic('');
    expect(topic.isActive).to.be.false;
    topic.toggleActive();
    expect(topic.isActive).to.be.true;
    topic.toggleActive();
    expect(topic.isActive).to.be.false;
  });
});
