import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubscriptSizing } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { UserActions } from 'src/app/state/actions';
import { User } from 'src/app/state/user/user.model';
import { selectUserOfId } from 'src/app/state/user/user.selectors';

@Component({
  selector: 'user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})

export class UserDialogComponent implements OnInit {
  userNameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  roleFormControl = new FormControl<'Admin' | 'User'>('User', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]);

  hide = true;

  inputFields = [
    this.userNameFormControl,
    this.emailFormControl,
    this.roleFormControl,
    this.passwordFormControl,
  ]

  constructor(private store: Store, @Inject(MAT_DIALOG_DATA) public userId?: number) { }

  ngOnInit(): void {
    if (this.userId != undefined) {
      this.store.select(selectUserOfId(this.userId)).subscribe((user?: User) => {
        this.userNameFormControl.setValue(user?.name ?? '');
        this.emailFormControl.setValue(user?.email ?? null);
        this.roleFormControl.setValue(user?.role ?? null);
      }
      ).unsubscribe()
    }
  }

  ngOnDestroy() {

  }

  addUser() {
    this.store.dispatch(UserActions.addUser({
      user: {
        id: undefined,
        name: this.userNameFormControl.value ?? '',
        email: this.emailFormControl.value ?? '',
        role: this.roleFormControl.value ?? 'User',
        password: this.passwordFormControl.value ?? ''
      }
    }));
  }

  editUser() {
    this.store.dispatch(UserActions.updateUser({
      user: {
        id: this.userId,
        name: this.userNameFormControl.value ?? '',
        email: this.emailFormControl.value ?? '',
        role: this.roleFormControl.value ?? 'User',
        password: this.passwordFormControl.value ?? ''
      }
    }));
  }

  isButtonDisabled(): boolean {
    for (const inputField of this.inputFields) {
      if (inputField.hasError('required') || inputField.hasError('pattern') || inputField.hasError('email'))
        return true;
    }
    return false;
  }
}
