import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingComponent } from './onboarding.component';


@NgModule({
  imports: [
    OnboardingRoutingModule,
    MaterialModule,
    CommonModule,
  ],
  declarations: [
    OnboardingComponent
  ]
})

export class OnboardingModule  {

}
