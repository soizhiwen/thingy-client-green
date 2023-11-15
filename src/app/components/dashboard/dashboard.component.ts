import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentAirQuality, selectCurrentCo2, selectCurrentHumidity, selectCurrentTemperature } from '../../state/greenhouse/greenhouse.selectors';
import { Observable } from 'rxjs';
import { DashboardActions } from '../../state/actions';
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

  plantSelected = false;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(DashboardActions.loadGreenhouseData())
  }

  daysLeft(date: Date): number {
    return Math.ceil((date.getTime() - Date.now()) / (1000 * 3600 * 24));
  }
}
