import { NavBarModule } from './nav-bar/nav-bar.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingComponent } from './components/onboarding/onboarding.component';

const routes: Routes = [
  {
    path:'home',
    loadChildren: () => NavBarModule
  },
  {
    path:'',
    component:OnboardingComponent
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
