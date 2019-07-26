import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { FirebaseServiceService, Firebase } from '../firebase-service.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public user: any;
  @ViewChild('usuario') email;
  @ViewChild('senha') password;

  todo: Firebase = {
    name: 'null',
    email: '', 
    password: ''
  };


  todoId = null;
  
  constructor(public navCtrl: NavController, 
    private route: ActivatedRoute, 
    private nav: NavController, 
    private todoService: FirebaseServiceService, 
    private loadingController: LoadingController,
    public firebaseauth: AngularFireAuth,
    public toastCtrl: ToastController){
      firebaseauth.user.subscribe((data => {
        this.user = data;
      }));
  }


   //--------------------Metodo De Autenticação proprio do Firebase----------------------------------------------------------------------//

  public LoginComEmail(): void {
    this.firebaseauth.auth.signInWithEmailAndPassword(this.email.value , this.password.value)
      .then(() => {
        this.exibirToast('Login efetuado com sucesso');
        this.navCtrl.navigateRoot('sign-in');
      })
      .catch((erro: any) => {
        this.exibirToast(erro);
      });
  }
async exibirToast(mensagem: string){
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  //------------------------------------------------------------------------------------------//


  //Metodo para salvar no banco de Dados CloudFreStore
  async SignIn(){
    
    //this.navCtrl.navigateRoot('sign-in');
    const loading = await this.loadingController.create({
      message: 'Carregando'
    });
    await loading.present();

    this.todoService.getTodo(this.todo).subscribe(res => {
        loading.dismiss();
        this.todo = res;
    })
  }

  SignUp(){
    this.navCtrl.navigateRoot('sign-up');
  }

  ////https://www.youtube.com/watch?v=aNW444SpFNs See this for more Feature
}
