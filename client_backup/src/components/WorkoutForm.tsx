import React, { useState, useEffect } from 'react';
import { Workout } from '../types';

interface WorkoutFormProps {
  onSubmit: (workout: Omit<Workout, 'id'>) => void;
  initialData?: Workout;
  onCancel?: () => void;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState<number | ''>('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setNotes(initialData.notes || '');
      setDate(initialData.date || '');
      setDuration(initialData.duration || '');
    } else {
      setTitle('');
      setNotes('');
      setDate('');
      setDuration('');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      notes,
      date,
      duration: duration ? Number(duration) : undefined,
    });
    if (!initialData) {
      setTitle('');
      setNotes('');
      setDate('');
      setDuration('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="workout-form">
      <h3>{initialData ? 'Editar Treino' : 'Novo Treino'}</h3>
      <div className="form-group">
        <label>Título (obrigatório)</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Notas</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Data</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Duração (minutos)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value === '' ? '' : Number(e.target.value))}
        />
      </div>
      <div className="form-actions">
        <button type="submit">{initialData ? 'Atualizar' : 'Criar'}</button>
        {initialData && onCancel && (
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default WorkoutForm;
