import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentAirQuality, selectCurrentCo2, selectCurrentHumidity, selectCurrentTemperature } from '../../state/greenhouse/greenhouse.selectors';
import { Observable } from 'rxjs';
import { DashboardActions } from '../../state/actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentTemperature$: Observable<number> = this.store.select(selectCurrentTemperature);
  currentHumidity$: Observable<number> = this.store.select(selectCurrentHumidity);
  currentCo2$: Observable<number> = this.store.select(selectCurrentCo2);
  currentAirQuality$: Observable<number> = this.store.select(selectCurrentAirQuality);

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(DashboardActions.loadGreenhouseData())
  }
}
