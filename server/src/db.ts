import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(__dirname, '../data/workouts.json');

export interface Workout {
  id: string;
  title: string;
  notes?: string;
  date?: string;
  duration?: number;
}

export const getWorkouts = (): Workout[] => {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
};

export const saveWorkouts = (workouts: Workout[]): void => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(workouts, null, 2));
};
