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
  exercises: Exercise[] = [];
  muscleGroups: MuscleGroup[] = ['Chest', 'Back', 'Legs', 'Shoulders', 'Biceps', 'Triceps', 'Abs', 'Calves', 'Forearms', 'Other'].sort((a, b) => a.localeCompare(b)).map((muscleGroup) => muscleGroup as MuscleGroup);
  filteredExercises: Exercise[] = [];
  selectedMuscleGroup: MuscleGroup | undefined;

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

  showAddExercisePopup() {
    this.showAddExercise = true;
  }

  hideAddExercisePopup() {
    this.showAddExercise = false;
  }

  showChooseExercisePopup(muscleGroup: MuscleGroup) {
    this.selectedMuscleGroup = muscleGroup;
    this.filteredExercises = this.exercises.filter((exercise) => exercise.muscleGroup === this.selectedMuscleGroup);
    console.log(this.selectedMuscleGroup, this.filteredExercises);

    this.showChooseExercise = true;
  }

  saveExercise() {
    if (this.exerciseForm.valid) {
      this.showAddExercise = false;
      this.indexedDbService.addExercise(this.exerciseForm.value);
      this.exerciseForm.reset();
      location.reload();
    } else {
      console.log('Form is invalid');
    }
  }

  addExerciseToWorkout(exercise: Exercise) {
    const exerciseWorkout: ExerciseWorkout = {
      exercise,
    };

    const workout = this.currentWorkout;
    workout.exerciseWorkouts.push(exerciseWorkout)
    workout.name = this.formatWorkoutName();

    this.indexedDbService.updateWorkout(workout);
    window.history.back();
  }

  formatWorkoutName() {
    return this.currentWorkout.exerciseWorkouts.map((exerciseWorkout) => exerciseWorkout.exercise.muscleGroup).join(' - ');
  }

}
