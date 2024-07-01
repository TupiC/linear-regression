import { Component, OnInit, inject } from '@angular/core';
import { IndexedDbService } from 'src/app/services/indexed-db.service';

@Component({
  selector: 'app-projects',
  templateUrl: './workouts.component.html'
})
export class WorkoutsComponent implements OnInit {
  workouts: Workout[] = [];

  constructor(private indexedDbService: IndexedDbService) { }

  async ngOnInit() {
    this.workouts = await this.indexedDbService.getAllWorkouts();
  }

  async addWorkout() {
    const workout: Workout = {
      id: Date.now(),
      name: 'New Workout',
      muscleGroup: 'Chest',
      description: 'This is a new workout',
      exercises: [
        {
          name: 'Bench Press',
          description: 'This is a bench press',
          sets: 4,
          reps: 8,
          weight: 135
        },
        {
          name: 'Incline Bench Press',
          description: 'This is an incline bench press',
          sets: 4,
          reps: 8,
          weight: 135
        }
      ],
      created: new Date(),
      updated: new Date()
    };
    try {
      await this.indexedDbService.addWorkout(workout);
      console.log('Workout added');
      this.workouts = await this.indexedDbService.getAllWorkouts();
    } catch (error) {
      console.log('Error adding workout', error);
    }
  }

}
export type Workout = {
  id: number;
  name: string;
  muscleGroup: MuscleGroup;
  description: string;
  exercises: Exercise[];
  created: Date;
  updated: Date;
}

type Exercise = {
  name: string;
  description: string;
  sets: number;
  reps: number;
  weight: number;
  startTime?: Date;
}

type MuscleGroup = 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core';