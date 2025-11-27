import React, { useEffect, useState } from 'react';
import { getWorkouts, createWorkout, updateWorkout, deleteWorkout } from './services/api';
import { Workout } from './types';
import WorkoutForm from './components/WorkoutForm';
import WorkoutList from './components/WorkoutList';
import './App.css';

function App() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [editingWorkout, setEditingWorkout] = useState<Workout | undefined>(undefined);
  const [health, setHealth] = useState<string>('Checking...');

  const fetchWorkouts = async () => {
    try {
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
    // Check health
    fetch('http://localhost:4000/api/health')
      .then((res) => res.json())
      .then((data) => setHealth(data.status))
      .catch(() => setHealth('Error'));
  }, []);

  const handleCreate = async (workout: Omit<Workout, 'id'>) => {
    try {
      await createWorkout(workout);
      fetchWorkouts();
    } catch (error) {
      console.error('Error creating workout:', error);
    }
  };

  const handleUpdate = async (workout: Omit<Workout, 'id'>) => {
    if (!editingWorkout) return;
    try {
      await updateWorkout(editingWorkout.id, workout);
      setEditingWorkout(undefined);
      fetchWorkouts();
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteWorkout(id);
      fetchWorkouts();
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Octfit - Workout Manager</h1>
        <p>API Health: {health}</p>
      </header>
      <main className="main-content">
        <section className="left-column">
          <WorkoutForm
            onSubmit={editingWorkout ? handleUpdate : handleCreate}
            initialData={editingWorkout}
            onCancel={() => setEditingWorkout(undefined)}
          />
        </section>
        <section className="right-column">
          <WorkoutList
            workouts={workouts}
            onEdit={setEditingWorkout}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
