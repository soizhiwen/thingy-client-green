import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../notifications/notifications.component';
import { State, Store } from '@ngrx/store';
import { select } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { NotificationActions } from 'src/app/state/actions';
import { AuthActions } from 'src/app/state/actions';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent {

  isExpanded: boolean = true;
  mobile: boolean = false;
  sidenavOpened: boolean = true;
  activeRoute: string = '';


  navBarItems: Array<{ title: string; iconName: string; path: string }> = [
    { title: 'Dashboard', iconName: 'dashboard', path: 'dashboard' },
    { title: 'Users', iconName: 'person', path: 'users' },
    { title: 'Plants', iconName: 'eco', path: 'plants' },
  ]

  constructor(private router: Router, public dialog: MatDialog, private store: Store) {
    this.router.events.subscribe(() => this.getActivatedRoute());
  }

  ngOnInit() {
    if (window.screen.width < 600) {
      this.mobile = true;
      this.sidenavOpened = false;
    }
    this.store.dispatch(NotificationActions.loadNotifications());
  }

  // getValues(){

  //   this.store.select();

  // }

  getActivatedRoute() {
    this.activeRoute = this.router.url;
    this.activeRoute = this.activeRoute.split('/home/')[1];
  }

  openNotificationsDialog(): void {
    const dialogRef = this.dialog.open(NotificationsComponent, {
      backdropClass: 'dialogStyle',
      position: { top: '80px', right: '60px' },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logOut() {
    this.store.dispatch(AuthActions.logOut())
  }
}

