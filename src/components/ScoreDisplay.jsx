import React from 'react';

function ScoreDisplay({ score, total }) {
  return (
    <div className="score-display">
      <h2>Quiz Completed!</h2>
      <p>
        Your score: {score} out of {total}
      </p>
      <p>Percentage: {((score / total) * 100).toFixed(2)}%</p>
    </div>
  );
}

export default ScoreDisplay;