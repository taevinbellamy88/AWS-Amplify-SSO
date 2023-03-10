import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  stateObject: any;
  title = 'MC-Amplify-App';
  currentUserEmail: string | undefined;
  currentIdp: string | undefined;

  constructor(
    private router: Router,
    private authenticator: AuthenticatorService
  ) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  async getCurrentUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        console.log(user);
        const usernameParts = user.username.split('_'); // split the username by underscore
        const provider = usernameParts[0].toLowerCase(); // get the first part and convert to lowercase

        if (provider === 'loginwithamazon') {
          this.currentUserEmail = user.attributes.email;
          this.currentIdp = 'Amazon'; // if provider is "loginwithamazon", set it to "amazon"
        }

        if (provider === 'google') {
          this.currentUserEmail = user.signInUserSession.idToken.payload.email;
          this.currentIdp = 'Google'; // if provider is "google", set it to "google"
        }
      }
    } catch (error) {
      console.log('error getting user', error);
    }
  }

  async loginWithSaml() {
    try {
      this.goToMC();
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  goToMC() {
    window.open(
      'https://mcamplifyapp480d493c-480d493c-dev.auth.us-west-2.amazoncognito.com/oauth2/authorize?client_id=5tp6lsbf60evjqvvjetpl6kf06&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fcallbacks%2Faws%2F',
      '_blank'
    );
  }
}
