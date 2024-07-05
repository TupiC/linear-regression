import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { WorkoutsComponent } from './components/workouts/workouts.component';
import { WorkoutComponent } from './components/workout/workout.component';
import { HeaderComponent } from './components/header/header.component';
import { WorkoutCardComponent } from './components/workout-card/workout-card.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WorkoutsComponent,
    WorkoutComponent,
    HeaderComponent,
    WorkoutCardComponent,
    ExercisesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
