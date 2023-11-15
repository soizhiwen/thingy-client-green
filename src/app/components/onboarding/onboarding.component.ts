import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent {
  hide = true;
  constructor(private router:Router){}

  login(){
    this.router.navigate([ '/home/dashboard' ])
  }
}



