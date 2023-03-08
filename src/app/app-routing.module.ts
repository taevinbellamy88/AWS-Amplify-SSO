import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { ToolfinderComponent } from './toolfinder/toolfinder.component';
import { LandingComponent } from './landing/landing.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

const routes: Routes = [
  { path: 'callbacks/aws', component: CallbackComponent },
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'toolfinder', component: ToolfinderComponent },
  { path: 'home', component: LandingComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
