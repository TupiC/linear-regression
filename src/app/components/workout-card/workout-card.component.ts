import { Component, Input, OnInit } from '@angular/core';
import { Workout } from '../workouts/workouts.component';
import { format } from 'date-fns/format';
import { de } from 'date-fns/locale'

@Component({
  selector: 'app-workout-card',
  templateUrl: './workout-card.component.html'
})
export class WorkoutCardComponent implements OnInit {
  @Input() workout!: Workout;
  weekday!: string;
  date!: string;

  ngOnInit(): void {
    this.weekday = format(this.workout.created, 'EE', { locale: de })
    this.date = format(this.workout.created, 'd. MMM', { locale: de });
  }
}
