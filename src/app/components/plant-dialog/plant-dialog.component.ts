import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubscriptSizing } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { PlantActions } from 'src/app/state/actions';
import { Plant } from 'src/app/state/plant/plant.model';
import { selectPlantOfId } from 'src/app/state/plant/plant.selectors';

const rangeValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value.min <= control.value.max
    ? null
    : { invalidRange: true };
};

@Component({
  selector: 'plant-dialog',
  templateUrl: './plant-dialog.component.html',
  styleUrls: ['./plant-dialog.component.scss']
})

export class PlantDialogComponent implements OnInit {
  plantFormControl = new FormControl('', [Validators.required]);
  dateFormControl = new FormControl<Date | null>(new Date());

  minHumidityFormControl = new FormControl<number | null>(null, [Validators.required, Validators.min(0)]);
  minTemperatureFormControl = new FormControl<number | null>(null, [Validators.required, Validators.min(0)]);
  minCo2FormControl = new FormControl<number | null>(null, [Validators.required, Validators.min(0)]);
  minAirQualityFormControl = new FormControl<number | null>(null, [Validators.required, Validators.min(0)]);

  maxHumidityFormControl = new FormControl<number | null>(null, [Validators.required]);
  maxTemperatureFormControl = new FormControl<number | null>(null, [Validators.required]);
  maxCo2FormControl = new FormControl<number | null>(null, [Validators.required]);
  maxAirQualityFormControl = new FormControl<number | null>(null, [Validators.required]);

  rangeFields = [
    { id: 'humidiy', placeholder: 'Humidity', formGroup: new FormGroup({ min: this.minHumidityFormControl, max: this.maxHumidityFormControl }, { validators: rangeValidator }) },
    { id: 'temperature', placeholder: 'Temperature', formGroup: new FormGroup({ min: this.minTemperatureFormControl, max: this.maxTemperatureFormControl }, { validators: rangeValidator }) },
    { id: 'co2', placeholder: 'C02 Level', formGroup: new FormGroup({ min: this.minCo2FormControl, max: this.maxCo2FormControl }, { validators: rangeValidator }) },
    { id: 'air-quality', placeholder: 'Air Quality', formGroup: new FormGroup({ min: this.minAirQualityFormControl, max: this.maxAirQualityFormControl }, { validators: rangeValidator }) }
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
      const min = inputField.formGroup.get('min');
      const max = inputField.formGroup.get('max');
      if (
        min?.hasError('required')
        || min?.hasError('min')
        || max?.hasError('required')
        || inputField.formGroup.errors?.['invalidRange']
      )
        return true;
    }
    return this.plantFormControl.hasError('required');
  }

  hasRangeError(): boolean {
    for (const inputField of this.rangeFields) {
      if (
        inputField.formGroup.errors?.['invalidRange']
      )
        return true;
    }
    return false;
  }
}
