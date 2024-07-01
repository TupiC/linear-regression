import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutsComponent } from './components/workouts/workouts.component';

const routes: Routes = [
  { path: '', component: WorkoutsComponent },
  { path: 'workouts', component: WorkoutsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
