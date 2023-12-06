import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentAirQuality, selectCurrentCo2, selectCurrentHumidity, selectCurrentTemperature } from '../../state/greenhouse/greenhouse.selectors';
import { Observable } from 'rxjs';
import { DashboardActions, PlantActions } from '../../state/actions';
import { Plant } from 'src/app/state/plant/plant.model';
import { selectPlants } from 'src/app/state/plant/plant.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentDetails = [
    { name: 'Temperature', value$: this.store.select(selectCurrentTemperature), img: "../../assets/temperature.png", unit: '°C' },
    { name: 'Humidity', value$: this.store.select(selectCurrentHumidity), img: "../../assets/humidity.png", unit: '%' },
    { name: 'CO2 Level', value$: this.store.select(selectCurrentCo2), img: "../../assets/co2.png" },
    { name: 'Air Quality', value$: this.store.select(selectCurrentAirQuality), img: "../../assets/air-quality.png" }
  ]

  currentPlants$: Observable<Plant[]> = this.store.select(selectPlants);

  plantSelected?: number = undefined;
  notificationColumns = ['notification', 'time'];
  notificationData = [{ message: 'Plant is too humid', timeStamp: Date.now() }, { message: 'Plant is too cold', timeStamp: Date.now() }]

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(DashboardActions.loadGreenhouseData())
    this.store.dispatch(PlantActions.loadPlants());
  }

  daysLeft(date: Date): number {
    return Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 3600 * 24));
  }
}
