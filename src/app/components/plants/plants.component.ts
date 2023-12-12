import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlantDialogComponent } from '../plant-dialog/plant-dialog.component';
import { Observable, map, of } from 'rxjs';
import { Plant } from 'src/app/state/plant/plant.model';
import { Store } from '@ngrx/store';
import { PlantActions } from 'src/app/state/actions';
import { selectPlants } from 'src/app/state/plant/plant.selectors';
import { selectUserOfId } from 'src/app/state/user/user.selectors';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.scss']
})

export class PlantsComponent {
  private userIdString: string | undefined = localStorage.getItem('userId') ?? undefined;
  columns = ['plant', 'date', 'actions']
  plant$: Observable<Plant[]> = this.store.select(selectPlants);
  isAdmin$: Observable<Boolean> = this.userIdString != undefined ? this.store.select(selectUserOfId(+this.userIdString))
    .pipe(map(user => user?.role == 'Admin')) : of(false);

  constructor(public dialog: MatDialog, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(PlantActions.loadPlants());
  }

  deletePlant(plantId: number) {
    this.store.dispatch(PlantActions.deletePlant({ plantId }));
  }

  openDialog(plantId?: number) {
    this.dialog.open(PlantDialogComponent, {
      minHeight: 650,
      data: plantId
    });
  }
}
