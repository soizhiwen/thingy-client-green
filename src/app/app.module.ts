import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import { greenhouseReducer } from './state/greenhouse/greenhouse.reducer';
import { HttpClientModule } from '@angular/common/http';
import { plantReducer } from './state/plant/plant.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { GreenhouseEffects } from './state/greenhouse/greenhouse.effects';
import { EffectsModule } from '@ngrx/effects';
import { PlantEffects } from './state/plant/plant.effects';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        StoreModule.forRoot({
            greenhouse: greenhouseReducer,
            plants: plantReducer,
        }),
        EffectsModule.forRoot([
            GreenhouseEffects,
            PlantEffects
        ]),
        MaterialModule,
        StoreDevtoolsModule.instrument({
            maxAge: 25,
        }),
    ]
})
export class AppModule { }
