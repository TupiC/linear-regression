import { Component, inject } from '@angular/core';
import { Exercise, MuscleGroup } from '../workouts/workouts.component';
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
    });

    this.muscleGroupForm = this.formBuilder.group({
      muscleGroup: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.indexedDbService.getAllExercises().then((exercises) => {
      this.exercises = exercises;
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
    } else {
      // Handle form validation errors
      console.log('Form is invalid');
    }
  }

  addExerciseToWorkout(exercise: Exercise) {
    const workout = {
      id: Date.now(),
      exercises: [exercise],
      created: new Date(),
      updated: new Date()
    };

    this.indexedDbService.updateWorkout(exercise);
  }
}
