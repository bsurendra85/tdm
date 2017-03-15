import { Component } from '@angular/core';


import { UserBaseClass, UserConst, UsersInterface } from '../../resource';
import '@tdm/json-api-mapper/src/add/active-record/json-api';

const User = UserConst;
type User = UserConst;

@Component({
  selector: 'home',
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public user: User;

  constructor() {
    this.user = new User();


    // this.user.rawDeserialized({trailingSlashes: 'force'}).$ar.next()
    //   .then( () => this.user.raw({withCredentials: true}).$ar.next() )
    //   .then( () => this.gogo());

    this.user.id = 5;
    this.user.$refresh().$ar.next()
      .then(() => {

      })
      .catch((err) => {
      console.error(err);
      });


    // this.gogo();

    // UserConst.query().$ar.next()
    //   .then( coll => {
    //   })
  }

  gogo() {

    let $ar = this.user.$ar;
    let subs = $ar.events$.subscribe(e => {
      console.log(e.type);
      if (e.type === 'ActionError') {
        console.log(e['error'])
      } else if (e.type === 'ActionEnd') {
        setTimeout(() => {
          this.user.id--;
          if (this.user.id === 0) {
            $ar.disconnect();
          } else {
            this.user.$refresh();
          }
        }, 500)
      }
    });

    this.user.id = 2;
    this.user.$refresh();
  }
}
