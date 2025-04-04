import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import { greenhouseReducer } from './state/greenhouse/greenhouse.reducer';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { plantReducer } from './state/plant/plant.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { GreenhouseEffects } from './state/greenhouse/greenhouse.effects';
import { EffectsModule } from '@ngrx/effects';
import { PlantEffects } from './state/plant/plant.effects';
import { userReducer } from './state/user/user.reducer';
import { UserEffects } from './state/user/user.effects';
import { authReducer } from './state/auth/auth.reducer';
import { AuthEffects } from './state/auth/auth.effects';
import { AuthService } from './api/auth.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AuthInterceptor } from './api/auth-interceptor';
import { NotificationEffects } from './state/notification/notification.effects';
import { NotificationReducer, plantNotificationReducer } from './state/notification/notification.reducer';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { graphReducer } from './state/graph/graph.reducer';
import { GraphEffects } from './state/graph/graph.effects';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent
    ],
    providers: [
        AuthService,
        AuthInterceptor,
        {
            provide: HTTP_INTERCEPTORS,
            useExisting: AuthInterceptor,
            multi: true
        },
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        StoreModule.forRoot({
            greenhouse: greenhouseReducer,
            plants: plantReducer,
            users: userReducer,
            auth: authReducer,
            notification: NotificationReducer,
            plantNotification: plantNotificationReducer,
            graph: graphReducer
        }),
        EffectsModule.forRoot([
            GreenhouseEffects,
            PlantEffects,
            UserEffects,
            AuthEffects,
            NotificationEffects,
            GraphEffects,
        ]),
        MaterialModule,
        StoreDevtoolsModule.instrument({
            maxAge: 25,
        }),
        CanvasJSAngularChartsModule
    ]
})
export class AppModule { }
