import { Component } from '@angular/core';

@Component({
  selector: 'ngx-http-todo',
  templateUrl: './todo.component.html',
  styleUrls: [ './todo.component.scss' ],
})
export class TodoComponent {
  /* @tdm-ignore:* */
  code: any = System.import(/* webpackChunkName: "NgxHttpTodoComponent" */ './__tdm-code__.ts'); // tslint:disable-line
  static tutorial = {
    id: 'todo',
    name: 'TODO',
    subHeader: ' '
  };
  /* @tdm-ignore:* */
}
