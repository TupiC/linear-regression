import { Component, Input, OnInit, inject } from '@angular/core';
import { Exercise, ExerciseWorkout, Workout } from '../workouts/workouts.component';
import { IndexedDbService } from 'src/app/services/indexed-db.service';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { de } from 'date-fns/locale/de';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
})
export class WorkoutComponent implements OnInit {
  workout!: Workout;
  exerciseWorkouts!: ExerciseWorkout[];
  indexedDbService = inject(IndexedDbService);
  router = inject(Router);
  workoutId: number | undefined;
  formattedWorkoutDate: string | undefined;

  async ngOnInit() {
    const url = this.router?.url;
    if (!url) {
      return;
    }
    this.workoutId = parseInt(url.split('/').pop()!);
    this.workout = await this.indexedDbService.getWorkout(this.workoutId!);
    this.exerciseWorkouts = this.workout.exerciseWorkouts;
    this.formattedWorkoutDate = format(this.workout.created, 'd. MMMM yyyy', { locale: de });
  }

  addExercise() {
    this.router.navigate([`/workouts/${this.workoutId}/exercises`]);
  }
}