import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../notifications/notifications.component';
import { Notification } from 'src/app/state/notification/notification.model';
import { State, Store } from '@ngrx/store';
import { NotificationActions } from 'src/app/state/actions';
import { AuthActions } from 'src/app/state/actions';
import { Observable } from 'rxjs';
import { selectNotifications } from 'src/app/state/notification/notification.selectors';
import { webSocket } from "rxjs/webSocket";

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
  notification$: Observable<Notification[]> = this.store.select(selectNotifications);

  newNotifications:Notification[]=[];
  oldNotifications:Notification[]=[];
  notificationCount:number=0;

  subject = webSocket('http://localhost:8080/');




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
    this.getNotifications();
  }


  getActivatedRoute() {
    this.activeRoute = this.router.url;
    this.activeRoute = this.activeRoute.split('/home/')[1];
  }

  openNotificationsDialog(): void {
    const dialogRef = this.dialog.open(NotificationsComponent, {
      backdropClass: 'dialogStyle',
      position: { top: '80px', right: '60px' },
      width: '400px',
      data:{newNotifications:this.newNotifications.reverse(),oldNotifications:this.oldNotifications.reverse()},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(this.newNotifications.length !=0){
        this.store.dispatch(NotificationActions.updateNotification({notification:this.newNotifications}));
        this.notificationCount=0;
        this.newNotifications=[];
      }
    });
  }

  getNotifications(){
    this.notification$.subscribe((data)=>{
      data.forEach((item)=>{
        if(item.viewed=='New'){
          this.newNotifications.push(item);
          this.notificationCount++;
        }
        else this.oldNotifications.push(item);
      })
    })
    this.newNotifications.sort((x,y)=>{
      return new Date(x.timestamp) < new Date(y.timestamp) ? 1 : -1
    })
    this.oldNotifications.sort((x,y)=>{
      return new Date(x.timestamp) < new Date(y.timestamp) ? 1 : -1
    })
  }


  logOut() {
    this.store.dispatch(AuthActions.logOut())
  }
}

