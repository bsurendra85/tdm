import { MockMixin, MockResource, MockDeserializer, MockActionOptions, MockAdapter, bucketFactory } from '@tdm/core/testing';
import { ActiveRecord, Constructor, Prop } from '@tdm/core';
import { internalMetadataStore } from '../../src/metadata/reflection/internal-metadata-store';

describe('CORE', () => {
  describe('Decorators', () => {
    const bucket = bucketFactory();
    afterEach(() => bucket.clear() );

    xit('should register ResourceAdapter', () => {

    });

    xit('should register ExtendAction', () => {

    });

    xit('should register Prop', () => {

    });

    xit('should register Exclude', () => {

    });

    xit('should register Hook', () => {

    });
  });
});
