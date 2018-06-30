import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email:string;
  password:string;

  error:string;

  constructor(private navCtrl: NavController, private auth: AuthProvider,
    private loading: LoadingController) {
  }

  showSignup() {
    this.navCtrl.setRoot(SignUpPage);
  }

  async login() {
    const loading = this.loading.create({
      content: 'Logging in...'
    });
    loading.present();

    try {
      await this.auth.login(this.email, this.password);
      loading.dismiss();
      this.navCtrl.setRoot(HomePage);
    } catch (err) {
      console.error(err);
      this.error = err.message || 'Server error';
      loading.dismiss();
    }
  }

}
