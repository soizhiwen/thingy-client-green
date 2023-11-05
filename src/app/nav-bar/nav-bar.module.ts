import { NgModule } from '@angular/core';
import { NavBarRoutingModule } from './nav-bar-routing.module';
import { WrapperComponent } from '../components/wrapper/wrapper.component';
import { UsersComponent } from '../components/users/users.component';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';


/** @title Sidenav open & close behavior */

@NgModule({
  imports: [
    NavBarRoutingModule,
    MaterialModule,
    CommonModule
  ],
  declarations: [
    WrapperComponent,
    UsersComponent
  ]
})

export class NavBarModule  {

}
