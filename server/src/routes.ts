import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getWorkouts, saveWorkouts, Workout } from './db';

const router = express.Router();

router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

router.get('/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from API' });
});

router.get('/workouts', (req: Request, res: Response) => {
  const workouts = getWorkouts();
  res.json(workouts);
});

router.get('/workouts/:id', (req: Request, res: Response) => {
  const workouts = getWorkouts();
  const workout = workouts.find((w) => w.id === req.params.id);
  if (!workout) {
    return res.status(404).json({ error: 'Workout not found' });
  }
  res.json(workout);
});

router.post('/workouts', (req: Request, res: Response) => {
  const { title, notes, date, duration } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newWorkout: Workout = {
    id: uuidv4(),
    title,
    notes,
    date,
    duration: duration ? Number(duration) : undefined,
  };

  const workouts = getWorkouts();
  workouts.push(newWorkout);
  saveWorkouts(workouts);

  res.status(201).json(newWorkout);
});

router.put('/workouts/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, notes, date, duration } = req.body;

  const workouts = getWorkouts();
  const index = workouts.findIndex((w) => w.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Workout not found' });
  }

  const updatedWorkout = {
    ...workouts[index],
    title: title || workouts[index].title,
    notes: notes !== undefined ? notes : workouts[index].notes,
    date: date !== undefined ? date : workouts[index].date,
    duration: duration !== undefined ? Number(duration) : workouts[index].duration,
  };

  workouts[index] = updatedWorkout;
  saveWorkouts(workouts);

  res.json(updatedWorkout);
});

router.delete('/workouts/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  let workouts = getWorkouts();
  const initialLength = workouts.length;
  workouts = workouts.filter((w) => w.id !== id);

  if (workouts.length === initialLength) {
    return res.status(404).json({ error: 'Workout not found' });
  }

  saveWorkouts(workouts);
  res.status(204).send();
});

export default router;
