import 'rxjs';
import '@tdm/data/add/resource-control';
import {
  BaseRequestOptions,
  HttpModule,
  Http,
  URLSearchParams,
  Response,
  ResponseOptions
} from '@angular/http';
import { TestBed, async, fakeAsync, tick, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ARMixin, HttpResource, HttpAction, UrlParam, HttpResourceModule, HttpActionMethodType } from '@tdm/ngx-http';
import { bucketFactory } from '@tdm/data/testing';

describe('NG-HTTP', () => {
  describe('HTTP Resource Action Handler', () => {
    const bucket = bucketFactory();
    afterEach(() => bucket.clear() );

    it('should throw if Http service not set (or action invoked before ng bootstrapped)', (done) => {
      @HttpResource({
        endpoint: '/api/users/:id?'
      })
      class User extends ARMixin(class { id: number; }) { }

      let event;
      new User().$refresh().$ar.events$.first().subscribe( e => event = e, null, () => {
        expect(event).toBeTruthy;
        expect(event.type).toEqual('ActionError');
        expect(event['error'].toString()).toEqual('Error: Http service not preset. Make sure you registered the provider and you are not invoking actions before angular bootstrapped.');
        done();
      });
    });


    describe('URL Parsing', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpModule, HttpResourceModule.forRoot()],
          providers: [
            {
              provide: Http,
              useFactory: (mockBackend, options) => {
                return new Http(mockBackend, options);
              },
              deps: [MockBackend, BaseRequestOptions]
            },
            MockBackend,
            BaseRequestOptions
          ]
        });
      });

      let mockBackend: MockBackend;
      beforeEach(inject([MockBackend], m => mockBackend = m));

      const bucket = bucketFactory();
      afterEach(() => bucket.clear() );

      it('should strip trailing slashes', fakeAsync(() => {
        @HttpResource({
          endpoint: '/api/users/',
          trailingSlashes: 'strip'
        })
        class User extends ARMixin(class { id: number; }) { }

        mockBackend.connections.subscribe( conn => {
          expect(conn.request.url).toBe('/api/users');
        });

        bucket.bucket.push(User.query());
        tick();
      }));

      it('should force trailing slashes',  fakeAsync(() => {
        @HttpResource({
          endpoint: '/api/users',
          trailingSlashes: 'force'
        })
        class User extends ARMixin(class { id: number; }) { }

        mockBackend.connections.subscribe( conn => {
          expect(conn.request.url).toBe('/api/users/');
        });

        bucket.bucket.push(User.query());
        tick();
      }));

      it('should build resource with default param ',  fakeAsync(() => {
        @HttpResource({
          endpoint: '/api/users/:id/:param',
          urlParams: { param: '99' }
        })
        class User extends ARMixin(class { id: number; }) { }

        mockBackend.connections.subscribe( conn => {
          expect(conn.request.url).toBe('/api/users/15/99');
        });

        bucket.bucket.push(User.find(15));
        tick();
      }));


      it('should replace http on each call', fakeAsync(() => {
        @HttpResource({
          endpoint: '/api/users'
        })
        class User extends ARMixin(class { id: number; }) { }

        mockBackend.connections.subscribe( conn => {
          expect(conn.request.url).toBe('/api/users');
        });

        bucket.bucket.push(User.query());
        tick();
      }));


      it('should throw if id not supplied and not optional', fakeAsync(() => {
        @HttpResource({
          endpoint: '/api/users/:id'
        })
        class User extends ARMixin(class { id: number; }) { }

        const EVENTS = ['ActionStart', 'ActionError'];

        let event;
        new User().$refresh().$ar.events$.first().subscribe( e => event = e, null, () => {
          expect(event).toBeTruthy;

          expect(event.type).toEqual(EVENTS.shift());
          if (event.type === 'ActionError') {
            expect(event['error'].toString()).toEqual('Error: URL Parameter Error in HttpAdapter: Expected "id" to be defined');
          }
        });
        tick();
      }));

      it('should build resource with bound param', fakeAsync(() => {
        class User_ {
          id: number;
          @UrlParam() param: number = 99;
        }

        @HttpResource({
          endpoint: '/api/users/:id/:param',
          urlParams: { param: '15' }
        })
        class User extends ARMixin(User_) { }

        mockBackend.connections.subscribe( conn => {
          expect(conn.request.url).toBe('/api/users/15/99');
        });

        bucket.bucket.push(User.find(15));
        tick();
      }));

      it('should use urlTemplateParamName, if defined',  fakeAsync(() => {
        class User_ {
          id: number;

          @UrlParam('myId') someId = 1;
          @UrlParam('onQS') qs1 = 2;

          @UrlParam({
            urlTemplateParamName: 'myId2'
          }) id2 = 4;

          @UrlParam({
            urlTemplateParamName: 'onQS2'
          }) qs2 = 8;
        }

        @HttpResource({
          endpoint: '/api/users/:id/:myId/:myId2'
        })
        class User extends ARMixin(User_) { }

        mockBackend.connections.subscribe( conn => {
          const [path, qs] = conn.request.url.split('?');

          expect(path).toBe('/api/users/15/1/4');
          expect(qs).toBeDefined();

          const search = new URLSearchParams(qs);
          expect(search.get('onQS')).toEqual('2');
          expect(search.get('onQS2')).toEqual('8');
        });

        bucket.bucket.push(User.find(15));
        tick();
      }));

      it('should apply method filter, if set.',  fakeAsync(() => {
        class User_ {
          id: number;

          @UrlParam({
            urlTemplateParamName: 'myId',
            methods: [HttpActionMethodType.Post]
          }) someId = 1;

          @UrlParam({
            urlTemplateParamName: 'myId2',
            methods: [HttpActionMethodType.Post]
          }) id2 = 78;

          @UrlParam({
            urlTemplateParamName: 'myId2',
            methods: [HttpActionMethodType.Delete, HttpActionMethodType.Get]
          }) id3 = 55;

          @UrlParam({
            urlTemplateParamName: 'onQS',
            methods: [HttpActionMethodType.Post, HttpActionMethodType.Get]
          }) id4 = 4;

          @UrlParam({
            urlTemplateParamName: 'onQS2',
            methods: [HttpActionMethodType.Post, HttpActionMethodType.Delete]
          }) id5 = 9;

          @UrlParam({
            urlTemplateParamName: 'onQS3',
            methods: HttpActionMethodType.Get
          }) id6 = 99;
        }

        @HttpResource({
          endpoint: '/api/users/:id/:myId/:myId2',
          urlParams: {
            myId: '5'
          }
        })
        class User extends ARMixin(User_) { }

        mockBackend.connections.subscribe( conn => {
          const [path, qs] = conn.request.url.split('?');

          expect(path).toBe('/api/users/15/5/55');
          expect(qs).toBeDefined();

          const search = new URLSearchParams(qs);
          expect(search.get('onQS')).toEqual('4');
          expect(search.get('onQS2')).toBeNull();
          expect(search.get('onQS3')).toEqual('99');

        });

        bucket.bucket.push(User.find(15));
        tick();
      }));

      it('should set non path param as query string',  fakeAsync(() => {
        class User_ {
          @UrlParam() qs1 = 1;
        }

        @HttpResource({
          endpoint: '/api/users'
        })
        class User extends ARMixin(User_) { }

        mockBackend.connections.subscribe( conn => {
          const qs = conn.request.url.split('?')[1];
          expect(qs).toBeDefined();

          const search = new URLSearchParams(qs);
          expect(search.get('qs1')).toEqual('1');
          expect(search.get('qs2')).toEqual('2');

        });

        bucket.bucket.push(User.find(15, { urlParams: { qs2: '2'} }));
        tick();
      }));

      it('should override ', fakeAsync(() => {
        class User_ {
          @UrlParam() qs1 = 'param1-instance';
          @UrlParam() qs2 = 'param2-instance';
        }

        @HttpResource({
          endpoint: '/api/users',
          urlParams: {
            qs1: 'param1',
            qs2: 'param2',
          }
        })
        class User extends ARMixin(User_) { }

        mockBackend.connections.subscribe( conn => {
          const qs = conn.request.url.split('?')[1];
          expect(qs).toBeDefined();

          const search = new URLSearchParams(qs);
          expect(search.get('qs1')).toEqual('param1-instance');
          expect(search.get('qs2')).toEqual('param2-adhoc');

        });

        bucket.bucket.push(User.find(15, { urlParams: { qs2: 'param2-adhoc'} }));
        tick();
      }));
    });
  });
});

