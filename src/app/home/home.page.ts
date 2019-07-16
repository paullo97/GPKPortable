import { Component } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { FirebaseServiceService, Firebase } from '../firebase-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todo: Firebase = {
    name: '',
    email: '', 
    password: ''
  };


  todoId = null;
  
  constructor(public navCtrl: NavController, private route: ActivatedRoute, private nav: NavController, private todoService: FirebaseServiceService, private loadingController: LoadingController){}

  async SignIn(){
    
    //this.navCtrl.navigateRoot('sign-in');
    const loading = await this.loadingController.create({
      message: 'Carregando'
    });
    await loading.present();
  
    this.todoService.getTodo(this.todo.email).subscribe(res => {
      loading.dismiss();
      this.todo = res;
    })
  }

  SignUp(){
    this.navCtrl.navigateRoot('sign-up');
  }

}
