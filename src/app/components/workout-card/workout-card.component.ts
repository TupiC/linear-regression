import { Component, Input } from '@angular/core';
import { Workout } from '../workouts/workouts.component';

@Component({
  selector: 'app-workout-card',
  templateUrl: './workout-card.component.html'
})
export class WorkoutCardComponent {
  @Input() workout!: Workout;
}
