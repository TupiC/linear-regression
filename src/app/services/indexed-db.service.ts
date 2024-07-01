import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Workout } from '../components/workouts/workouts.component';

interface MyDB extends DBSchema {
  workouts: {
    key: number;
    value: Workout;
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
        db.createObjectStore('workouts', { keyPath: 'id' });
      },
    });
  }

  async getAllWorkouts(): Promise<any[]> {
    return (await this.dbPromise).getAll('workouts');
  }

  async addWorkout(workout: Workout) {
    try {
      console.log('Adding workout', workout);
      return await (await this.dbPromise).add('workouts', workout);
    } catch (error) {
      console.log('Error adding workout', error);
      return error;
    }
  }

  async deleteWorkout(id: number) {
    return (await this.dbPromise).delete('workouts', id);
  }

  async getWorkout(id: number) {
    return (await this.dbPromise).get('workouts', id);
  }

  async updateWorkout(workout: any) {
    return (await this.dbPromise).put('workouts', workout);
  }
}