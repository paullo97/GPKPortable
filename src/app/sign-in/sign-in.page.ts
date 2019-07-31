import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  public user: any;
  @ViewChild('usuario') email;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public firebaseauth: AngularFireAuth) {
      firebaseauth.user.subscribe((data => {
        this.user = data;
      }));
    }

  ngOnInit() {
    this.email = this.firebaseauth.auth.currentUser.email;
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
      position: 'top',
    });
    toast.present();
  }

}
