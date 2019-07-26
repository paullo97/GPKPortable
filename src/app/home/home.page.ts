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
    name: 'null',
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

    this.todoService.getTodo(this.todo).subscribe(res => {
      if(typeof this.todoService.getEmail == this.todo.email){
        loading.dismiss();
        this.todo = res;
        this.nav.navigateRoot('sing-in');
      }
      else{ 
        loading.dismiss();
        this.todo = res;
        this.nav.navigateRoot('home');
      }
      
    })
    
  }

  SignUp(){
    this.navCtrl.navigateRoot('sign-up');
  }

  ////https://www.youtube.com/watch?v=aNW444SpFNs See this for more Feature
}
