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
    this.workouts = await this.indexedDbService.getAllWorkouts();
  }

  addWorkout() {
    const workout =
    {
      id: Date.now(),
      exercises: [],
      created: new Date(),
      updated: new Date()
    };

    this.indexedDbService.addWorkout(workout);
    this.router.navigate(['/workouts', workout.id]);
  }
}
export type Workout = {
  id: number;
  name?: string;
  muscleGroup?: MuscleGroup;
  description?: string;
  exercises: Exercise[];
  created: Date;
  updated: Date;
}

export type Exercise = {
  name: string;
  note: string;
  sets: number;
  reps: number;
  weight: number;
  startTime?: Date;
}

type MuscleGroup = 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core';