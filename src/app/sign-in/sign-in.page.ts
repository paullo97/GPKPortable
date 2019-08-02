import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseServiceService, Firebase } from '../firebase-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {


  /*todo: Firebase = {
    name: 'nome',
    email: 'email', 
    password: 'senha',
    sexo: 'sexo'
  }
  todoId = null;*/ 


  todos: Firebase[];

  public user: any;
  @ViewChild('usuario') email;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    private loadingController: LoadingController,
    private todoService: FirebaseServiceService,
    private route: ActivatedRoute,
    public firebaseauth: AngularFireAuth) {
      firebaseauth.user.subscribe((data => {
        this.user = data;
      }));
    }
 
  ngOnInit() {
   this.email = this.firebaseauth.auth.currentUser.email;
   this.todoService.getTodoID(this.email).subscribe(res => {
      console.log(res); 
      //this.todos = res;
    });
    //this.email = this.firebaseauth.auth.currentUser.email;  
  }  

  public Sair(): void {
    this.firebaseauth.auth.signOut()
    .then(() => {
      this.exibirToast('Você saiu');
      this.navCtrl.navigateRoot('home');
    })
    .catch((erro: any) => {
      this.exibirToast(erro);
    });
  }

  async exibirToast(mensagem: string){
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }
}
