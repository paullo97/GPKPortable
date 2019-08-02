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
    password: '',
    sexo: 'NBin'
  } 

  @ViewChild('usuario') email;
  @ViewChild('senha') password;
  @ViewChild('nome') name; 
  @ViewChild('sexo') sex; 


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
      this.saveTodo(); 
      this.exibirToast('Usuário criado com sucesso');
      this.nav.navigateRoot('home');
    })
    .catch((erro: any) => {
      this.exibirToast(erro);
    });
  }
async exibirToast(mensagem: string){
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }



//----------------------------Fim ----------------------------------------------------//

// ---------------------------------------Metodo de Banco de dados -------------- // 

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
 
    /* const loading = await this.loadingController.create({
      message: 'Cadastrando'
    });
    await loading.present(); */ 
 
    if (this.todoId) {
      this.todoService.updateTodo(this.todo, this.todoId);
    } else {
      if(!this.todoService.addTodo(this.todo)){
        console.log("Deu erro! ");
      }
    }
  }
// --------------------------------------- Fim -------------------------------//
  BackHome(){
    this.nav.navigateRoot('home');
  }
  
}
