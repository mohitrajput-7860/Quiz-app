import React from 'react';

const categories = [
  { id: 9, name: 'General Knowledge' },
  { id: 18, name: 'Computer Science' },
  { id: 23, name: 'History' },
];

const difficulties = ['easy', 'medium', 'hard'];

function QuizSettings({ onStartQuiz }) {
  const [category, setCategory] = React.useState('');
  const [difficulty, setDifficulty] = React.useState('');

  const handleStart = () => {
    onStartQuiz(category, difficulty);
  };

  return (
    <div className="quiz-settings">
      <h2>Quiz Settings</h2>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="">Select Difficulty</option>
        {difficulties.map((diff) => (
          <option key={diff} value={diff}>
            {diff.charAt(0).toUpperCase() + diff.slice(1)}
          </option>
        ))}
      </select>
      <button onClick={handleStart}>Start Quiz</button>
    </div>
  );
}

export default QuizSettings;