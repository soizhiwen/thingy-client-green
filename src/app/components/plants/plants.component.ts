import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogData } from '../dialog/dialog.component';
import { FormControl, Validators } from '@angular/forms';

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

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogData: DialogData = {
      title: "Add Plant",
      subtitle: "Create a new plant for the system",
      imageTitle: 'Plant image',
      buttonText: 'Add Plant',
      inputFields: [
        { id: 'name', placeholder: 'Plant name', formControl: new FormControl('', [Validators.required]), type: 'text' },
        { id: 'harvest-time', placeholder: 'Expected Harvest time', formControl: new FormControl(''), type: 'date' },
        { id: 'humidiy', placeholder: 'Humidity', formControl: new FormControl('', [Validators.required]), type: 'text' },
        { id: 'temperature', placeholder: 'Temperature', formControl: new FormControl('', [Validators.required]), type: 'text' },
        { id: 'co2', placeholder: 'C02 Level', formControl: new FormControl('', [Validators.required]), type: 'text' },
        { id: 'air-quality', placeholder: 'Air Quality', formControl: new FormControl('', [Validators.required]), type: 'text' }
      ]
    }
    this.dialog.open(DialogComponent, {
      data: dialogData,
      minHeight: 650
    });
  }
}
