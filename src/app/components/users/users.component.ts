import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserActions } from 'src/app/state/actions';
import { User } from 'src/app/state/user/user.model';
import { selectUsers } from 'src/app/state/user/user.selectors';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  columns = ['user-name', 'email', 'role', 'actions']
  user$: Observable<User[]> = this.store.select(selectUsers);

  constructor(public dialog: MatDialog, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  deleteUser(userId: number) {
    this.store.dispatch(UserActions.deleteUser({ userId }));
  }

  openDialog(userId?: number) {
    this.dialog.open(UserDialogComponent, {
      data: userId
    });
  }

}
