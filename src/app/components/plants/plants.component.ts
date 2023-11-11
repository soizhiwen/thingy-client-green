import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlantDialogComponent } from '../plant-dialog/plant-dialog.component';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Plant } from 'src/app/state/plant/plant.model';
import { Store } from '@ngrx/store';
import { ApiService } from 'src/app/api/api.service';
import { ApiActions, PlantActions } from 'src/app/state/actions';
import { selectPlants } from 'src/app/state/plant/plant.selectors';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.scss']
})

export class PlantsComponent {
  columns = ['plant', 'date', 'actions']
  data$: Observable<Plant[]> = this.store.select(selectPlants);

  constructor(public dialog: MatDialog, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(PlantActions.loadPlants());
  }

  deletePlant(plantId: number) {
    this.store.dispatch(PlantActions.deletePlant({ plantId }));
  }

  openDialog() {
    this.dialog.open(PlantDialogComponent, {
      minHeight: 650
    });
  }
}
