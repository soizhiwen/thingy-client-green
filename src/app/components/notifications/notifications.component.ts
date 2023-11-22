import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  constructor(public dialogRef: MatDialogRef<NotificationsComponent>){}

  onCloseClick(): void {
    this.dialogRef.close();
  }

  newNotifications:Array<{message:string;status:'Mild'|'Average'|'Immediate';timeStamp:string}>=[
   {message:'The humidity level of Tomatoes has dropped to 20.',status:'Mild',timeStamp:'20:15 hr  24/10/2023'},
   {message:'The humidity level of Tomatoes has dropped to 20.',status:'Immediate',timeStamp:'20:15 hr  24/10/2023'},

  ]
}
