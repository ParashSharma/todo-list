import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  name: string;
  email: string;
  password: string;

  error: string;

  constructor(private navCtrl: NavController, private auth: AuthProvider,
    private loading: LoadingController, private toast: ToastController) {
  }

  showLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

  async signup() {
    const loading = this.loading.create({
      content: 'Signing up...'
    });
    loading.present();

    try {

      await this.auth.signUp(this.name, this.email, this.password);

      this.toast.create({
        message: 'Sign up succesful!',
        position: 'bottom',
        duration: 3000
      });
      loading.dismiss();
      this.navCtrl.setRoot(HomePage);

    } catch (err) {
      console.error(err);
      this.error = err.message || 'Server error';
      loading.dismiss();
    }
  }

}
