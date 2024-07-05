import { Component, inject } from '@angular/core';
import { Exercise, ExerciseWorkout, MuscleGroup, Workout } from '../workouts/workouts.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndexedDbService } from 'src/app/services/indexed-db.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html'
})
export class ExercisesComponent {
  indexedDbService = inject(IndexedDbService);
  showAddExercise = false;
  showChooseExercise = false;
  exerciseForm: FormGroup;
  muscleGroupForm: FormGroup;
  currentWorkout!: Workout;

  muscleGroups: MuscleGroup[] = [
    'Chest',
    'Back',
    'Legs',
    'Shoulders',
    'Biceps',
    'Triceps',
    'Abs',
    'Calves',
    'Forearms',
    'Other'
  ];
  exercises: Exercise[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.exerciseForm = this.formBuilder.group({
      name: ['', Validators.required],
      muscleGroup: ['', Validators.required],
      note: [''],
      created: [new Date()]
    });

    this.muscleGroupForm = this.formBuilder.group({
      muscleGroup: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.indexedDbService.getAllExercises().then((exercises) => {
      this.exercises = exercises;
    });

    // http://localhost:4200/workouts/1720169560242/exercises
    const workoutId = window.location.pathname.split('/')[2];
    this.indexedDbService.getWorkout(parseInt(workoutId)).then((workout) => {
      this.currentWorkout = workout;
    });
  }

  setShowAddExercise(value: boolean) {
    this.showAddExercise = value;
  }

  setShowChooseExercise(value: boolean) {
    this.showChooseExercise = value;
  }

  saveExercise() {
    if (this.exerciseForm.valid) {
      // Save the exercise logic here
      console.log(this.exerciseForm.value);
      this.showAddExercise = false;
      this.indexedDbService.addExercise(this.exerciseForm.value);
      this.exerciseForm.reset(); // Reset the form after saving
      //reload
      location.reload();
    } else {
      // Handle form validation errors
      console.log('Form is invalid');
    }
  }

  addExerciseToWorkout(exercise: Exercise) {
    const exerciseWorkout: ExerciseWorkout = {
      exercise,
      sets: 3,
      reps: 10,
      weight: 20,
      startTime: new Date()
    };
    const workout = this.currentWorkout;
    workout.exerciseWorkouts.push(exerciseWorkout)

    this.indexedDbService.updateWorkout(workout);
    // Navigate back to the workout page
    window.history.back();
  }
}
