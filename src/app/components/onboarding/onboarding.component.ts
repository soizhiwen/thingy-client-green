import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthActions } from 'src/app/state/actions';
import { Store } from '@ngrx/store';
import { selectLoginError } from 'src/app/state/auth/auth.selectors';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent {

  hide :Boolean[] = [true,true,true];


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  registerForm = new FormGroup({
    userName: new FormControl('', [ Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: confirmPasswordValidator});

  loginError$ = this.store.select(selectLoginError);
  
  constructor(private router:Router,private store: Store){}

  signUp(){
    if (this.registerForm.invalid) {
      return;
    }
    this.store.dispatch(AuthActions.signUp({ email:this.registerForm.value.email??'',password:this.registerForm.value.password??'',name:this.registerForm.value.userName??'' }));
  }

  login(){
    if (this.loginForm.invalid) {
      return;
    }
    this.store.dispatch(AuthActions.login({ email:this.loginForm.value.email??'',password:this.loginForm.value.password??'' }));
    // this.router.navigate([ '/home/dashboard' ]);
  }
}

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value.password === control.value.confirmPassword
    ? null
    : { PasswordNoMatch: true };
};



