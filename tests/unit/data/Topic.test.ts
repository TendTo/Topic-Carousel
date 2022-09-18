import { expect } from 'chai';
import { Topic } from '@topic-carousel/data';

describe('Topic', function () {
  it('should be created', function () {
    expect(new Topic('')).to.be.ok;
  });

  it('should have the correct setup', function () {
    const id = 'name';
    const topic = new Topic(id);
    expect(topic.id).to.equal(id);
    expect(topic.isActive).to.be.false;
    expect(topic.additionalData).to.be.undefined;
  });

  it('should have the correct setup with additional data', function () {
    const id = 'name';
    const additionalData = { key: 'value' };
    const topic = new Topic(id, additionalData);
    expect(topic.id).to.equal(id);
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
