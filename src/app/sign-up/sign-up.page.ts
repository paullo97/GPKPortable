import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { FirebaseServiceService, Firebase } from '../firebase-service.service'
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})

export class SignUpPage /*implements OnInit*/{
  

  todo: Firebase = {
    name: '',
    email: '', 
    password: ''
  };


  public user: any;
  @ViewChild('usuario') email;
  @ViewChild('senha') password;

  todoId = null;
 
  constructor(private route: ActivatedRoute, 
    private nav: NavController, 
    private todoService: FirebaseServiceService, 
    private loadingController: LoadingController,
    public firebaseauth: AngularFireAuth,
    public toastCtrl: ToastController) { }
 
//https://www.youtube.com/watch?v=tYSebyHsa5k
  //----------------------------Metodo de Cadastro com Firebase Auth ----------------------------------------------------//
  public cadastrarUsuario(): void {
    this.firebaseauth.auth.createUserWithEmailAndPassword(this.email.value , this.password.value)
    .then(() => {
      this.exibirToast('Usuário criado com sucesso');
      this.nav.navigateRoot('home');
    })
    .catch((erro: any) => {
      this.exibirToast(erro);
    });
  }
async exibirToast(mensagem: string){
    /*let toast = this.toastCtrl.create({
      message: mensagem, 
      duration: 3000, 
      position: 'bottom'
    });
    //toast.setMessage(mensagem);
    //toast.present(); */

    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }



//----------------------------Fim ----------------------------------------------------//



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
      message: 'Cadastrando'
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
  
}
