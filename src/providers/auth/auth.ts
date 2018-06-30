import Parse from 'parse';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class AuthProvider {

  signUp(name, email, password) {
    return Parse.User.signUp(email, password, {
      name,
      email
    });
  }

  login(email, password) {
    return Parse.User.logIn(email, password);
  }

  isLoggedIn() {
    return Parse.User.current()
  }

}
