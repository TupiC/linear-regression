import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ro } from 'date-fns/locale';
import { IndexedDbService } from 'src/app/services/indexed-db.service';

@Component({
  selector: 'app-projects',
  templateUrl: './workouts.component.html'
})
export class WorkoutsComponent implements OnInit {
  workouts: Workout[] = [];
  router = inject(Router);

  constructor(private indexedDbService: IndexedDbService) { }

  async ngOnInit() {
    await this.indexedDbService.deleteEmptyWorkouts();
    this.workouts = await this.indexedDbService.getAllWorkouts();
  }

  addWorkout() {
    const workout: Workout =
    {
      id: Date.now(),
      exerciseWorkouts: [],
      created: new Date(),
      updated: new Date()
    };

    this.indexedDbService.addWorkout(workout);
    this.router.navigate(['/workouts', workout.id]);
  }

  clearDb() {
    indexedDB.deleteDatabase('workouts-db');
    location.reload();
  }
}
export type Workout = {
  id: number;
  name?: string;
  exerciseWorkouts: ExerciseWorkout[];
  created: Date;
  updated: Date;
}

export type ExerciseWorkout = {
  exercise: Exercise;
  sets?: Set[];
}

export type Set = {
  reps: number;
  weight: number;
  startTime: Date;
}

export type Exercise = {
  name: string;
  muscleGroup?: MuscleGroup;
  note: string;
  created: Date;
}

export type MuscleGroup = 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Biceps' | 'Triceps' | 'Abs' | 'Calves' | 'Forearms' | 'Other';