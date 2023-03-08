import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  constructor(private router: Router) {}

  goToCallback() {
    this.router.navigate(['/callbacks/aws'], {
      queryParams: {
        code: '4treC$#6rne&w65GYthdUJ4h!%',
      },
    });
  }

  goToRestaurants() {
    this.router.navigate(['/restaurants']);
  }
}
