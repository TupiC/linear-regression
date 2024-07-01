import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { WorkoutsComponent } from './components/workouts/workouts.component';
import { IndexedDbService } from './services/indexed-db.service';
import { WorkoutComponent } from './components/workout/workout.component';
import { HeaderComponent } from './components/header/header.component';
import { WorkoutCardComponent } from './components/workout-card/workout-card.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkoutsComponent,
    WorkoutComponent,
    HeaderComponent,
    WorkoutCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
