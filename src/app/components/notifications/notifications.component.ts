import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Notification } from 'src/app/state/notification/notification.model';
import { selectNotifications } from 'src/app/state/notification/notification.selectors';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  constructor(public dialogRef: MatDialogRef<NotificationsComponent>,private store: Store){}
  notification$: Observable<Notification[]> = this.store.select(selectNotifications);


  onCloseClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    console.log("NOTO",this.notification$);
  }

  newNotifications:Array<{message:string;status:'Mild'|'Average'|'Immediate';timeStamp:string}>=[
   {message:'The humidity level of Tomatoes has dropped to 20.',status:'Mild',timeStamp:'20:15 hr  24/10/2023'},
   {message:'The humidity level of Tomatoes has dropped to 20.',status:'Immediate',timeStamp:'20:15 hr  24/10/2023'},

  ]
}
