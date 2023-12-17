import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NotificationActions } from 'src/app/state/actions';
import { Notification } from 'src/app/state/notification/notification.model';
import { selectNotifications } from 'src/app/state/notification/notification.selectors';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  newNotifications:Notification[]=[];
  oldNotifications:Notification[]=[];
  constructor(public dialogRef: MatDialogRef<NotificationsComponent>,
              private store: Store,
              @Inject(MAT_DIALOG_DATA) public data: {newNotifications:Notification[],oldNotifications:Notification[]}
              ){

                this.newNotifications=data.newNotifications;
                this.oldNotifications=data.oldNotifications;
              }


  onCloseClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(){}


}
