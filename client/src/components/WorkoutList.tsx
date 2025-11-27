import type { FC } from 'react';
import type { Workout } from '../types';

interface WorkoutListProps {
  workouts: Workout[];
  onEdit: (workout: Workout) => void;
  onDelete: (id: string) => void;
}

const WorkoutList: FC<WorkoutListProps> = ({ workouts, onEdit, onDelete }) => {
  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja deletar este treino?')) {
      onDelete(id);
    }
  };

  return (
    <div className="workout-list">
      <h3>Meus Treinos</h3>
      {workouts.length === 0 ? (
        <p>Nenhum treino cadastrado.</p>
      ) : (
        <ul>
          {workouts.map((workout) => (
            <li key={workout.id} className="workout-item">
              <div className="workout-info">
                <h4>{workout.title}</h4>
                {workout.date && <span className="workout-date">{workout.date}</span>}
                {workout.duration && <span className="workout-duration">{workout.duration} min</span>}
                {workout.notes && <p className="workout-notes">{workout.notes}</p>}
              </div>
              <div className="workout-actions">
                <button onClick={() => onEdit(workout)}>Editar</button>
                <button onClick={() => handleDelete(workout.id)} className="delete-btn">Deletar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkoutList;
