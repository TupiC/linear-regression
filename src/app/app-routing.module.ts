import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutsComponent } from './components/workouts/workouts.component';
import { WorkoutComponent } from './components/workout/workout.component';

const routes: Routes = [
  { path: '', component: WorkoutsComponent },
  { path: 'workouts', component: WorkoutsComponent },
  { path: 'workouts/:id', component: WorkoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
