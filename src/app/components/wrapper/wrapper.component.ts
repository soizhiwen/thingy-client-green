import { Component } from '@angular/core';


@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent {
  isExpanded:boolean=true;

  navBarItems:Array<{title:string;iconName:string;path:string}>=[
    {title:'Dashboard',iconName:'dashboard',path:'dashboard'},
    {title:'Users',iconName:'person',path:'users'},
    {title:'Plants',iconName:'eco',path:'plants'},
  ]
}
