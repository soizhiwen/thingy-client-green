import { Component } from '@angular/core';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.scss']
})

export class PlantsComponent {
  columns = ['plant', 'date', 'actions']
  data = [
    { plant: "Tomato", date: Date() },
    { plant: "Salad", date: Date() },
    { plant: "Orchid", date: Date() }
  ]
}
