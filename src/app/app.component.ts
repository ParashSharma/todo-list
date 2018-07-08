import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { TodoList, TodoListProvider } from '../providers/todo-list/todo-list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  lists: TodoList[] = [];

  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, private auth: AuthProvider,
    private alert: AlertController,
    private todoListProvider: TodoListProvider,
    private loading:LoadingController) {
    this.initializeApp();
    this.updateLists();
  }

  async updateLists() {
    const loading = this.loading.create({
      content: 'Loading lists...'
    });
    try {
      this.lists = await this.todoListProvider.fetchLists();
      console.log(this.lists);
      loading.dismiss();
    } catch (err) {
      console.log(err);
      loading.dismiss();
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logOut() {
    this.auth.logout()
      .then(() => this.nav.setRoot(LoginPage));
  }

  addList() {
    const prompt = this.alert.create({
      title: 'Add list',
      message: "Enter a name for new todo list",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            const loading = this.loading.create({
              content: 'Loading lists...'
            });
            this.todoListProvider.addList(data.name)
              .then(() => this.updateLists())
              .then(() => loading.dismiss())
              .catch((err) => {
                console.error(err);
                loading.dismiss();
              });
          }
        }
      ]
    });
    prompt.present();
  }
}
