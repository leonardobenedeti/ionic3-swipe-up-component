import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  drawerOptions: any;

  constructor(public navCtrl: NavController, public events: Events) {

      this.drawerOptions = {
          handleHeight: 40,
          thresholdFromBottom: 200,
          thresholdFromTop: 200,
          bounceBack: true
      };
  }

  callDetails(){
    this.events.publish('open', {dados: "Dados via parametro"});
  }
}
