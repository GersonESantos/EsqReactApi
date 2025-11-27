import fs from 'fs';
import path from 'path';

const dataPath = path.join(__dirname, '..', 'data', 'workouts.json');

interface Workout {
  id: string;
  title: string;
  notes?: string;
}

const readWorkouts = (): Workout[] => {
  if (!fs.existsSync(dataPath)) {
    return [];
  }
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
};

const writeWorkouts = (workouts: Workout[]) => {
  fs.writeFileSync(dataPath, JSON.stringify(workouts, null, 2));
};

export const getWorkouts = (): Workout[] => {
  return readWorkouts();
};

export const getWorkoutById = (id: string): Workout | undefined => {
  const workouts = readWorkouts();
  return workouts.find(w => w.id === id);
};

export const createWorkout = (workoutData: { title: string; notes?: string }): Workout => {
  const workouts = readWorkouts();
  const newWorkout: Workout = {
    id: Date.now().toString(),
    ...workoutData,
  };
  workouts.push(newWorkout);
  writeWorkouts(workouts);
  return newWorkout;
};

export const updateWorkout = (id: string, workoutData: { title?: string; notes?: string }): Workout | undefined => {
  const workouts = readWorkouts();
  const index = workouts.findIndex(w => w.id === id);
  if (index > -1) {
    workouts[index] = { ...workouts[index], ...workoutData };
    writeWorkouts(workouts);
    return workouts[index];
  }
  return undefined;
};

export const deleteWorkout = (id: string): boolean => {
  const workouts = readWorkouts();
  const newWorkouts = workouts.filter(w => w.id !== id);
  if (newWorkouts.length < workouts.length) {
    writeWorkouts(newWorkouts);
    return true;
  }
  return false;
};
