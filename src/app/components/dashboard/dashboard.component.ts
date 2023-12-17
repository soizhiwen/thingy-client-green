import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentAirQuality, selectCurrentCo2, selectCurrentHumidity, selectCurrentTemperature } from '../../state/greenhouse/greenhouse.selectors';
import { Observable } from 'rxjs';
import { DashboardActions, NotificationActions, PlantActions } from '../../state/actions';
import { Plant } from 'src/app/state/plant/plant.model';
import { Notification } from 'src/app/state/notification/notification.model';
import { selectPlants } from 'src/app/state/plant/plant.selectors';
import { selectPlantNotifications } from 'src/app/state/notification/notification.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Chart from 'chart.js/auto';
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
  plantNotifications$: Observable<Notification[]> = this.store.select(selectPlantNotifications);


  plantSelected?: number = undefined;
  notificationColumns = ['notification', 'time'];
  dataSource: MatTableDataSource<Notification> | undefined;
  notificationData:Notification[] = [];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  showGraph:Boolean =false;
  // labels = ["himash","i","p"];
  // data = {
  //   labels: this.labels,
  //   datasets: [{
  //     label: 'My First Dataset',
  //     data: [65, 59, 80],
  //     borderColor: 'rgb(75, 192, 192)',
  //     tension: 0.1
  //   }]
  // };
  chartOptions = {
    title: {
      text: "Basic Column Chart in Angular"
    },
    data: [{
      type: "column",
      dataPoints: [
        { label: "Apple",  y: 10  },
        { label: "Orange", y: 15  },
        { label: "Banana", y: 25  },
        { label: "Mango",  y: 30  },
        { label: "Grape",  y: 28  }
      ]
    }]
  };

  public chart: any;


  constructor(private store: Store) {
  }

  ngAfterContentInit(): void{
    this.chart =new Chart('myChart', {
      type: 'line',
      data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  }

  ngOnInit(): void {
    this.store.dispatch(DashboardActions.loadGreenhouseData())
    this.store.dispatch(PlantActions.loadPlants());



  }

  daysLeft(date: Date): number {
    return Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 3600 * 24));
  }

  selectPlant(plantId:number){
    if(plantId !=0 && plantId !== this.plantSelected){
      this.plantSelected=plantId;
      this.store.dispatch(NotificationActions.loadNotificationsByPlant({plantId:this.plantSelected}));
      this.plantNotifications$.subscribe((data)=>{
          this.notificationData=data;
          this.dataSource = new MatTableDataSource(this.notificationData);
          this.dataSource.paginator=this.paginator;
      })
    }
  }

  getgraphDetails(detailName:string){
    this.showGraph=true;
  }
}
