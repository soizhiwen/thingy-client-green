import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../notifications/notifications.component';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent {

  isExpanded:boolean=true;
  mobile:boolean =false;
  sidenavOpened:boolean=true ;
  activeRoute:string='';


  navBarItems:Array<{title:string;iconName:string;path:string}>=[
    {title:'Dashboard',iconName:'dashboard',path:'dashboard'},
    {title:'Users',iconName:'person',path:'users'},
    {title:'Plants',iconName:'eco',path:'plants'},
  ]

  constructor(private router: Router,public dialog: MatDialog){
    this.router.events.subscribe(() =>this.getActivatedRoute() );
  }

  ngOnInit() {
    if (window.screen.width < 600) {
      this.mobile = true;
      this.sidenavOpened=false;
    }
  }


  getActivatedRoute(){
    this.activeRoute=this.router.url;
    this.activeRoute=this.activeRoute.split('/home/')[1];
  }

  openNotificationsDialog(): void {
    const dialogRef = this.dialog.open(NotificationsComponent ,{
      backdropClass: 'dialogStyle',
      position:{ top: '80px', right: '60px' },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

