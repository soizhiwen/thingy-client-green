import { NavBarModule } from './nav-bar/nav-bar.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { OnboardingModule } from './components/onboarding/onboarding.module';
import { authGuard } from './auth/auth-guard.service';
import { loginGuard } from './auth/login-guard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => NavBarModule,
    canActivate: [authGuard],
  },
  {
    path: '',
    loadChildren: () => OnboardingModule,
    canActivate: [loginGuard],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
