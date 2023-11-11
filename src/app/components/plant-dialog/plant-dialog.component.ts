import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PlantActions } from 'src/app/state/actions';

@Component({
  selector: 'plant-dialog',
  templateUrl: './plant-dialog.component.html',
  styleUrls: ['./plant-dialog.component.scss']
})
export class PlantDialogComponent {
  plantFormControl = new FormControl('', [Validators.required]);
  dateFormControl = new FormControl<Date | null>(new Date());
  humidityFormControl = new FormControl<number | null>(null, [Validators.required]);
  temperatureFormControl = new FormControl<number | null>(null, [Validators.required]);
  co2FormControl = new FormControl<number | null>(null, [Validators.required]);
  airQualityFormControl = new FormControl<number | null>(null, [Validators.required]);

  inputFields = [
    { id: 'name', placeholder: 'Plant name', formControl: this.plantFormControl, type: 'text' },
    { id: 'harvest-time', placeholder: 'Expected Harvest time', formControl: this.dateFormControl, type: 'date' },
    { id: 'humidiy', placeholder: 'Humidity', formControl: this.humidityFormControl, type: 'number' },
    { id: 'temperature', placeholder: 'Temperature', formControl: this.temperatureFormControl, type: 'number' },
    { id: 'co2', placeholder: 'C02 Level', formControl: this.co2FormControl, type: 'number' },
    { id: 'air-quality', placeholder: 'Air Quality', formControl: this.airQualityFormControl, type: 'number' }
  ]

  constructor(private store: Store) { }

  addPlant() {
    this.store.dispatch(PlantActions.addPlant({
      plant: {
        name: this.plantFormControl.value ?? '',
        harvest_date: this.dateFormControl.value ?? undefined,
        temperature: this.temperatureFormControl.value ?? 0,
        humidity: this.humidityFormControl.value ?? 0,
        co2: this.co2FormControl.value ?? 0,
        airQuality: this.airQualityFormControl.value ?? 0,
      }
    }));
  }

  isButtonDisabled(): boolean {
    for (const inputField of this.inputFields) {
      if (inputField.formControl.hasError('required'))
        return true;
    }
    return false;
  }
}
