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

  minHumidityFormControl = new FormControl<number | null>(null, [Validators.required]);
  minTemperatureFormControl = new FormControl<number | null>(null, [Validators.required]);
  minCo2FormControl = new FormControl<number | null>(null, [Validators.required]);
  minAirQualityFormControl = new FormControl<number | null>(null, [Validators.required]);

  maxHumidityFormControl = new FormControl<number | null>(null, [Validators.required]);
  maxTemperatureFormControl = new FormControl<number | null>(null, [Validators.required]);
  maxCo2FormControl = new FormControl<number | null>(null, [Validators.required]);
  maxAirQualityFormControl = new FormControl<number | null>(null, [Validators.required]);


  rangeFields = [
    { id: 'humidiy', placeholder: 'Humidity', formControls: [this.minHumidityFormControl, this.maxHumidityFormControl] },
    { id: 'temperature', placeholder: 'Temperature', formControls: [this.minHumidityFormControl, this.maxHumidityFormControl] },
    { id: 'co2', placeholder: 'C02 Level', formControls: [this.minHumidityFormControl, this.maxHumidityFormControl] },
    { id: 'air-quality', placeholder: 'Air Quality', formControls: [this.minHumidityFormControl, this.maxHumidityFormControl] }
  ]

  constructor(private store: Store, @Inject(MAT_DIALOG_DATA) public plantId?: number) { }

  ngOnInit(): void {
    if (this.plantId != undefined) {
      this.store.select(selectPlantOfId(this.plantId)).subscribe((plant?: Plant) => {
        this.plantFormControl.setValue(plant?.name ?? '');
        this.dateFormControl.setValue(plant?.harvest_date ?? null);
        this.minHumidityFormControl.setValue(plant?.min_humidity ?? null);
        this.minTemperatureFormControl.setValue(plant?.min_temperature ?? null);
        this.minCo2FormControl.setValue(plant?.min_co2 ?? null);
        this.minAirQualityFormControl.setValue(plant?.min_air_quality ?? null);
        this.maxHumidityFormControl.setValue(plant?.max_humidity ?? null);
        this.maxTemperatureFormControl.setValue(plant?.max_temperature ?? null);
        this.maxCo2FormControl.setValue(plant?.max_co2 ?? null);
        this.maxAirQualityFormControl.setValue(plant?.max_air_quality ?? null);
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
        min_temperature: this.minTemperatureFormControl.value ?? 0,
        min_humidity: this.minHumidityFormControl.value ?? 0,
        min_co2: this.minCo2FormControl.value ?? 0,
        min_air_quality: this.minAirQualityFormControl.value ?? 0,
        max_temperature: this.maxTemperatureFormControl.value ?? 0,
        max_humidity: this.maxHumidityFormControl.value ?? 0,
        max_co2: this.maxCo2FormControl.value ?? 0,
        max_air_quality: this.maxAirQualityFormControl.value ?? 0,
      }
    }));
  }

  editPlant() {
    this.store.dispatch(PlantActions.updatePlant({
      plant: {
        id: this.plantId,
        name: this.plantFormControl.value ?? '',
        harvest_date: this.dateFormControl.value ?? undefined,
        min_temperature: this.minTemperatureFormControl.value ?? 0,
        min_humidity: this.minHumidityFormControl.value ?? 0,
        min_co2: this.minCo2FormControl.value ?? 0,
        min_air_quality: this.minAirQualityFormControl.value ?? 0,
        max_temperature: this.maxTemperatureFormControl.value ?? 0,
        max_humidity: this.maxHumidityFormControl.value ?? 0,
        max_co2: this.maxCo2FormControl.value ?? 0,
        max_air_quality: this.maxAirQualityFormControl.value ?? 0,
      }
    }));
  }

  isButtonDisabled(): boolean {
    for (const inputField of this.rangeFields) {
      if (
        inputField.formControls[0].hasError('required')
        || inputField.formControls[1].hasError('required')
      )
        return true;
    }
    return this.plantFormControl.hasError('required');
  }
}
