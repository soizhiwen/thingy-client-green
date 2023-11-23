import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubscriptSizing } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { PlantActions } from 'src/app/state/actions';
import { Plant } from 'src/app/state/plant/plant.model';
import { selectPlantOfId } from 'src/app/state/plant/plant.selectors';

@Component({
  selector: 'plant-dialog',
  templateUrl: './plant-dialog.component.html',
  styleUrls: ['./plant-dialog.component.scss']
})

export class PlantDialogComponent implements OnInit {
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

  constructor(private store: Store, @Inject(MAT_DIALOG_DATA) public plantId?: number) { }

  ngOnInit(): void {
    if (this.plantId != undefined) {
      this.store.select(selectPlantOfId(this.plantId)).subscribe((plant?: Plant) => {
        this.plantFormControl.setValue(plant?.name ?? '');
        this.dateFormControl.setValue(plant?.harvest_date ?? null);
        this.humidityFormControl.setValue(plant?.humidity ?? null);
        this.temperatureFormControl.setValue(plant?.temperature ?? null);
        this.co2FormControl.setValue(plant?.co2 ?? null);
        this.airQualityFormControl.setValue(plant?.air_quality ?? null);
      }
      ).unsubscribe()
    }
  }

  ngOnDestroy() {

  }

  addPlant() {
    this.store.dispatch(PlantActions.addPlant({
      plant: {
        id: undefined,
        name: this.plantFormControl.value ?? '',
        harvest_date: this.dateFormControl.value ?? undefined,
        temperature: this.temperatureFormControl.value ?? 0,
        humidity: this.humidityFormControl.value ?? 0,
        co2: this.co2FormControl.value ?? 0,
        air_quality: this.airQualityFormControl.value ?? 0,
      }
    }));
  }

  editPlant() {
    this.store.dispatch(PlantActions.updatePlant({
      plant: {
        id: this.plantId,
        name: this.plantFormControl.value ?? '',
        harvest_date: this.dateFormControl.value ?? undefined,
        temperature: this.temperatureFormControl.value ?? 0,
        humidity: this.humidityFormControl.value ?? 0,
        co2: this.co2FormControl.value ?? 0,
        air_quality: this.airQualityFormControl.value ?? 0,
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
