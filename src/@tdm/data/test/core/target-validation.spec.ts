import 'rxjs';

import { MockMixin, MockResource, bucketFactory } from '@tdm/data/testing';
import { Prop, ValidationContext } from '@tdm/data';

describe('@tdm/data', () => {
  describe('Target Validation', () => {
    const bucket = bucketFactory();
    afterEach(() => bucket.clear() );

    it('should apply transform function for incoming & outgoing', (done) => {
      class User_ {
        @Prop({
          validation: {
            name: 'test-validator',
            validate(ctx: ValidationContext) {
              return false;
            },
            errorMessage(ctx: ValidationContext) {
              return 'error';
            }
          }
        })
        validatable: string;
      }

      @MockResource({
        endpoint: '/api/users/:id?'
      })
      class User extends MockMixin(User_) { }

      const returnValue = {
        validatable: 'validatable'
      };

      const user = bucket.create(User);

      user.$refresh({returnValue}).$rc.next()
        .then( data => done.fail(new Error('Validation not triggered')) )
        .catch( err => {
          expect(err.validationErrors[0].errors['test-validator']).toBe('error');
          done();
        });
    });

  });
});
