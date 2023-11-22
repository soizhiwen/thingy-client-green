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
  emailFormControl = new FormControl('', [Validators.required]);
  RoleFormControl = new FormControl<'Admin' | 'User'>('User', [Validators.required]);

  inputFields = [
    { id: 'user-name', placeholder: 'User name', formControl: this.userNameFormControl, type: 'text' },
    { id: 'email', placeholder: 'Email', formControl: this.emailFormControl, type: 'email' },
    { id: 'role', placeholder: 'Role', formControl: this.RoleFormControl, type: 'text' },
  ]

  constructor(private store: Store, @Inject(MAT_DIALOG_DATA) public userId?: number) { }

  ngOnInit(): void {
    if (this.userId != undefined) {
      this.store.select(selectUserOfId(this.userId)).subscribe((user?: User) => {
        this.userNameFormControl.setValue(user?.name ?? '');
        this.emailFormControl.setValue(user?.email ?? null);
        this.RoleFormControl.setValue(user?.role ?? null);
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
        role: this.RoleFormControl.value ?? 'User'
      }
    }));
  }

  editUser() {
    this.store.dispatch(UserActions.updateUser({
      user: {
        id: this.userId,
        name: this.userNameFormControl.value ?? '',
        email: this.emailFormControl.value ?? '',
        role: this.RoleFormControl.value ?? 'User'
      }
    }));
  }

  isButtonDisabled(): boolean {
    for (const inputField of this.inputFields) {
      if (inputField.formControl.hasError('required'))
        return true;
    }
    return false;
  }
}
