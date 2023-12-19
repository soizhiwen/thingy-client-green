import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentAirQuality, selectCurrentCo2, selectCurrentHumidity, selectCurrentTemperature } from '../../state/greenhouse/greenhouse.selectors';
import { Observable, map } from 'rxjs';
import { DashboardActions, NotificationActions, PlantActions } from '../../state/actions';
import { Plant } from 'src/app/state/plant/plant.model';
import { Notification } from 'src/app/state/notification/notification.model';
import { selectPlantOfId, selectPlants } from 'src/app/state/plant/plant.selectors';
import { selectPlantNotifications } from 'src/app/state/notification/notification.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import io from 'socket.io-client';
import { selectGraphData } from 'src/app/state/graph/graph.selectors';
import { AppId } from 'src/app/api/AppId';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  socket = io('http://localhost:8080/');

  currentDetails = [
    { name: 'Temperature', appId: 'TEMP' as AppId, value$: this.store.select(selectCurrentTemperature), img: "../../assets/temperature.png", unit: '°C' },
    { name: 'Humidity', appId: 'HUMID' as AppId, value$: this.store.select(selectCurrentHumidity), img: "../../assets/humidity.png", unit: '%' },
    { name: 'CO2 Level', appId: 'CO2_EQUIV' as AppId, value$: this.store.select(selectCurrentCo2), img: "../../assets/co2.png" },
    { name: 'Air Quality', appId: 'AIR_QUAL' as AppId, value$: this.store.select(selectCurrentAirQuality), img: "../../assets/air-quality.png" }
  ]

  currentPlants$: Observable<Plant[]> = this.store.select(selectPlants);
  plantNotifications$: Observable<Notification[]> = this.store.select(selectPlantNotifications);

  plantSelected?: number = undefined;
  notificationColumns = ['notification', 'time'];
  dataSource: MatTableDataSource<Notification> | undefined;
  notificationData: Notification[] = [];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  showGraph: Boolean = false;
  chartOptions: any;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(DashboardActions.loadCurrentGreenhouseData())
    this.store.dispatch(PlantActions.loadPlants());
    this.socket.emit("greeenhouseData", 'settingGreenhouseSocket');
    this.socket.on("greeenhouseData", (data) => {
      if (data = "newGreeenhouseData") {
        this.store.dispatch(DashboardActions.loadCurrentGreenhouseData())
      }
    })
  }

  daysLeft(date: Date): number {
    return Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 3600 * 24));
  }

  selectPlant(plantId?: number) {
    if (plantId != undefined && plantId !== this.plantSelected) {
      this.plantSelected = plantId;
      this.store.dispatch(NotificationActions.loadNotificationsByPlant({ plantId: this.plantSelected }));
      this.plantNotifications$.subscribe((data) => {
        this.notificationData = data;
        this.dataSource = new MatTableDataSource(this.notificationData);
        this.dataSource.paginator = this.paginator;
      })
    } else if (plantId == this.plantSelected) {
      this.plantSelected = undefined;
      this.showGraph = false;
    }
  }

  getgraphDetails(name: string, appId: AppId) {
    if (this.plantSelected == undefined) {
      this.showGraph = false;
      return;
    }

    this.store.dispatch(DashboardActions.loadGreenhouseGraphData({ appId }))
    var graphData: object[] = [];

    this.store.select(selectGraphData)
      .pipe(map(data => data == undefined ? [] : data.map(({ timestamp: t, value: v }) => ({ x: new Date(t), y: v }))))
      .subscribe(
        dataPoints => {
          this.chartOptions = {
            zoomEnabled: true,
            theme: "light2",
            backgroundColor: "transparent",
            title: {
              text: name + " Graph",
              fontColor: '#666853'
            },
            data: [{
              xValueType: "dateTime",
              xValueFormatString: "DD.MM.YY, hh:ss:mm",
              type: "line",
              color: '#666853',
              dataPoints: dataPoints,
            }]
          }
        }
      );
    this.showGraph = true;
  }
}
