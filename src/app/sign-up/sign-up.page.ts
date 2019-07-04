import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage{

  constructor(public navCtrl: NavController) { }

  BackHome(){
    this.navCtrl.navigateRoot('home');
  }

}
