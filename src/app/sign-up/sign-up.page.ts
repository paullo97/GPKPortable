import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseServiceService } from '../firebase-service.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})


export class SignUpPage{

email: string;
name: string; 
password: string; 

  constructor(public navCtrl: NavController, public dbService: FirebaseServiceService) { }

  BackHome(){
    this.navCtrl.navigateRoot('home');
  }

  create() {
    let usuario = {}; 
    usuario['name'] = this.name; 
    usuario['email'] = this.email;
    usuario['password'] = this.password;

    this.dbService.save(usuario).then(resp => {
      this.name = "";
      this.email = undefined;
      this.password = "";
      console.log(resp);
    })
    .catch(error => {
      console.log(error);
    });

    }

}
