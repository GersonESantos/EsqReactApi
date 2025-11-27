import axios from 'axios';
import type { Workout } from '../types';

const API_URL = 'http://localhost:4000/api';

export const api = axios.create({
  baseURL: API_URL,
});

export const getWorkouts = async () => {
  const response = await api.get<Workout[]>('/workouts');
  return response.data;
};

export const createWorkout = async (workout: Omit<Workout, 'id'>) => {
  const response = await api.post<Workout>('/workouts', workout);
  return response.data;
};

export const updateWorkout = async (id: string, workout: Partial<Workout>) => {
  const response = await api.put<Workout>(`/workouts/${id}`, workout);
  return response.data;
};

export const deleteWorkout = async (id: string) => {
  await api.delete(`/workouts/${id}`);
};
