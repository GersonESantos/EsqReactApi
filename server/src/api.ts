import { Router, Request, Response } from 'express';
import { getWorkouts, getWorkoutById, createWorkout, updateWorkout, deleteWorkout } from './db';

const router = Router();

// Health check
router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Hello message
router.get('/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the API!' });
});

// Workout routes
router.get('/workouts', (req: Request, res: Response) => {
  res.json(getWorkouts());
});

router.get('/workouts/:id', (req: Request, res: Response) => {
  const workout = getWorkoutById(req.params.id);
  if (workout) {
    res.json(workout);
  } else {
    res.status(404).json({ message: 'Workout not found' });
  }
});

router.post('/workouts', (req: Request, res: Response) => {
  const newWorkout = createWorkout(req.body);
  res.status(201).json(newWorkout);
});

router.put('/workouts/:id', (req: Request, res: Response) => {
  const updatedWorkout = updateWorkout(req.params.id, req.body);
  if (updatedWorkout) {
    res.json(updatedWorkout);
  } else {
    res.status(404).json({ message: 'Workout not found' });
  }
});

router.delete('/workouts/:id', (req: Request, res: Response) => {
  const success = deleteWorkout(req.params.id);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Workout not found' });
  }
});

export default router;
