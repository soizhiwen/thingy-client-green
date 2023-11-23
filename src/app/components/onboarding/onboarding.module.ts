import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingComponent } from './onboarding.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    OnboardingRoutingModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    OnboardingComponent
  ]
})

export class OnboardingModule  {
}
