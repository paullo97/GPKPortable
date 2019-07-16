import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { FirebaseServiceService, Firebase } from '../firebase-service.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})

export class SignUpPage{
  

  todo: Firebase = {
    name: '',
    email: '', 
    password: ''
  };


  todoId = null;
 
  constructor(private route: ActivatedRoute, private nav: NavController, private todoService: FirebaseServiceService, private loadingController: LoadingController) { }
 
  /*ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId)  {
      this.loadTodo();
    }
  }
 
  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Loading Todo..'
    });
    await loading.present();
 
    this.todoService.getTodo(this.todoId).subscribe(res => {
      loading.dismiss();
      this.todo = res;
    });
  }*/ 
 
  async saveTodo() {
 
    const loading = await this.loadingController.create({
      message: 'Saving Todo..'
    });
    await loading.present();
 
    if (this.todoId) {
      this.todoService.updateTodo(this.todo, this.todoId).then(() => {
        loading.dismiss();
        //this.nav.back();
        this.nav.navigateRoot('home');
      });
    } else {
      this.todoService.addTodo(this.todo).then(() => {
        loading.dismiss();
        //this.nav.back();
        this.nav.navigateRoot('home');
      });
    }
  }

  BackHome(){
    this.nav.navigateRoot('home');
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
