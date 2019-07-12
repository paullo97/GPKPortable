import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { FirebaseServiceService, Firebase } from '../firebase-service.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})

export class SignUpPage implements OnInit{
  
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  firebase: Firebase[]; 

  constructor(public navCtrl: NavController, private CadService: FirebaseServiceService, private loadingController: LoadingController) { }

  async saveFirebasse(){
    const loading = await this.loadingController.create({ 
      message: 'Saving in Database'
    });
    await loading.present();

    if() 

  }

  BackHome(){
    this.navCtrl.navigateRoot('home');
  }

  /*create() {
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

    }*/ 

}
