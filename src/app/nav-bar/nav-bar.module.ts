import { NgModule } from '@angular/core';
import { NavBarRoutingModule } from './nav-bar-routing.module';
import { WrapperComponent } from '../components/wrapper/wrapper.component';
import { UsersComponent } from '../components/users/users.component';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { PlantDialogComponent } from '../components/plant-dialog/plant-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlantsComponent } from '../components/plants/plants.component';
import { UserDialogComponent } from '../components/user-dialog/user-dialog.component';


/** @title Sidenav open & close behavior */

@NgModule({
  imports: [
    NavBarRoutingModule,
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    WrapperComponent,
    UsersComponent,
    PlantsComponent,
    PlantDialogComponent,
    UserDialogComponent,
  ]
})

export class NavBarModule {

}
