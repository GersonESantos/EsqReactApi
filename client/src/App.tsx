import { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:4000/api';

interface Workout {
  id: string;
  title: string;
  notes?: string;
}

function App() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [newWorkoutTitle, setNewWorkoutTitle] = useState('');
  const [newWorkoutNotes, setNewWorkoutNotes] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/workouts`)
      .then(res => res.json())
      .then(data => setWorkouts(data));
  }, []);

  const addWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkoutTitle) return;

    fetch(`${API_URL}/workouts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newWorkoutTitle, notes: newWorkoutNotes }),
    })
      .then(res => res.json())
      .then(newWorkout => {
        setWorkouts([...workouts, newWorkout]);
        setNewWorkoutTitle('');
        setNewWorkoutNotes('');
      });
  };

  return (
    <div className="App">
      <header>
        <h1>Octfit</h1>
      </header>
      <main>
        <div className="card">
          <h2>Workouts</h2>
          <ul>
            {workouts.map(workout => (
              <li key={workout.id}>
                <strong>{workout.title}</strong>
                {workout.notes && <p>{workout.notes}</p>}
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2>Add New Workout</h2>
          <form onSubmit={addWorkout}>
            <input
              type="text"
              value={newWorkoutTitle}
              onChange={e => setNewWorkoutTitle(e.target.value)}
              placeholder="Workout title"
              required
            />
            <textarea
              value={newWorkoutNotes}
              onChange={e => setNewWorkoutNotes(e.target.value)}
              placeholder="Notes (optional)"
            ></textarea>
            <button type="submit">Add Workout</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
