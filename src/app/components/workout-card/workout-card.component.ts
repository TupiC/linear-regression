import { Component, Input, OnInit, inject } from '@angular/core';
import { Workout } from '../workouts/workouts.component';
import { format } from 'date-fns/format';
import { de } from 'date-fns/locale'
import { FormControl, FormGroup } from '@angular/forms';
import { IndexedDbService } from 'src/app/services/indexed-db.service';

@Component({
  selector: 'app-workout-card',
  templateUrl: './workout-card.component.html'
})
export class WorkoutCardComponent implements OnInit {
  @Input() workout!: Workout;
  weekday!: string;
  date!: string;
  isEditPopupActive = false;
  editWorkoutForm!: FormGroup;
  indexedDbService = inject(IndexedDbService);

  ngOnInit(): void {
    this.weekday = format(this.workout.created, 'EE', { locale: de })
    this.date = format(this.workout.created, 'd. MMM', { locale: de });
    this.editWorkoutForm = new FormGroup({
      name: new FormControl(this.workout.name),
    });
  }

  editWorkout() {
    this.isEditPopupActive = true;
  }

  saveWorkout() {
    this.workout.name = this.editWorkoutForm.value.name;
    this.indexedDbService.updateWorkout(this.workout)
    this.isEditPopupActive = false;
  }
}
