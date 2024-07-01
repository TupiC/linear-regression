import { Component, Input, OnInit, inject } from '@angular/core';
import { Exercise, Workout } from '../workouts/workouts.component';
import { IndexedDbService } from 'src/app/services/indexed-db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
})
export class WorkoutComponent implements OnInit {
  workout!: Workout;
  exercises!: Exercise[];
  indexedDbService = inject(IndexedDbService);
  router = inject(Router);

  async ngOnInit() {
    const id = this.router?.url.split('/').pop();
    this.workout = await this.indexedDbService.getWorkout(parseInt(id!));
    this.exercises = this.workout.exercises;
  }

  addExercise() {


  }
}