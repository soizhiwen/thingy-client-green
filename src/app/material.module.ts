import { NgModule } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';



@NgModule({
  exports:[
      MatButtonModule,
      MatSidenavModule,
      MatCheckboxModule,
      MatListModule,
      MatIconModule,
      MatToolbarModule,
      MatInputModule,
      MatBadgeModule
  ]
  })
  export class MaterialModule{}
