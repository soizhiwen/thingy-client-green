import { NgModule } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTabsModule} from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  exports:[
      MatButtonModule,
      MatSidenavModule,
      MatCheckboxModule,
      MatListModule,
      MatIconModule,
      MatToolbarModule,
      MatInputModule,
      MatBadgeModule,
      MatTabsModule,
      MatFormFieldModule,
      MatMenuModule,
  ]
  })
  export class MaterialModule{}
