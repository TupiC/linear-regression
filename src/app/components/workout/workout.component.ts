import { Component, Input } from '@angular/core';
import { Workout } from '../workouts/workouts.component';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
})
export class WorkoutComponent {
  @Input() workout!: Workout;
}
