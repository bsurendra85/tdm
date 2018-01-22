import { Observable } from 'rxjs/Observable';
import { toPromise } from 'rxjs/operator/toPromise';

import { RenderInstruction } from '../tdm-model-form/render-instruction';

const asyncUsed = (done: Promise<void> | Observable<void>) => {
  throw new Error('async() was already called once.');
};

export class BeforeRenderEventHandler {
  /**
   * An object whose values are instances of [[RenderInstruction]] and keys are the full static paths of the
   * [[RenderInstruction]] instance they refer to.
   */
  public instructions: { [path: string]: RenderInstruction };

  constructor(instructions: { [path: string]: RenderInstruction },
              private notify: (done: Promise<void>) => void) {
    this.instructions = instructions;
  }

  /**
   * Mark this render operation as asynchronous, providing a notifier to signal when the rendering can
   * proceed.
   *
   * For example, when a render instruction of type select requires the options of the select to be
   * fetched from a remote server.
   *
   * @param done
   */
  async(done: Promise<void> | Observable<void>): void {
    if (typeof done['then'] === 'function') {
      this.notify(<any> done);
    } else if (typeof done['subscribe'] === 'function') {
      this.notify( toPromise.call(<Observable<void>>done) );
    } else {
      throw new Error('Invalid input');
    }
    Object.defineProperty(this, 'async', { value: asyncUsed });
  }

}
