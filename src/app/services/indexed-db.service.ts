import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Exercise, Workout } from '../components/workouts/workouts.component';

interface MyDB extends DBSchema {
  workouts: {
    key: number;
    value: Workout;
  };
  exercises: {
    key: number;
    value: Exercise;
  };
}

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private dbPromise: Promise<IDBPDatabase<MyDB>>;

  constructor() {
    this.dbPromise = openDB('workouts-db', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('workouts')) {
          db.createObjectStore('workouts', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('exercises')) {
          db.createObjectStore('exercises', { keyPath: 'name' });
        }
      },
    });
  }

  async getAllWorkouts(): Promise<any[]> {
    return (await this.dbPromise).getAll('workouts');
  }

  async addWorkout(workout: Workout) {
    return await (await this.dbPromise).add('workouts', workout);
  }

  async deleteWorkout(id: number) {
    return (await this.dbPromise).delete('workouts', id);
  }

  async deleteEmptyWorkouts() {
    const workouts = await this.getAllWorkouts();
    const emptyWorkouts = workouts.filter((workout: any) => workout.exercises.length === 0);
    emptyWorkouts.forEach((workout: any) => this.deleteWorkout(workout.id));
  }

  async getWorkout(id: number): Promise<any> {
    return (await this.dbPromise).get('workouts', id);
  }

  async updateWorkout(workout: any) {
    return (await this.dbPromise).put('workouts', workout);
  }


  async getAllExercises(): Promise<any[]> {
    return (await this.dbPromise).getAll('exercises');
  }

  async addExercise(exercise: Exercise) {
    return await (await this.dbPromise).add('exercises', exercise);
  }

  async deleteExercise(id: number) {
    return (await this.dbPromise).delete('exercises', id);
  }
}