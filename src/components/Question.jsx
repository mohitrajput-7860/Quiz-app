import React from 'react';
import AnswerOptions from './AnswerOptions';

function Question({ question, selectedAnswer, onAnswerSelect }) {
  if (!question) {
    return null;
  }

  return (
    <div className="question">
      <h2>{question.text}</h2>
      <AnswerOptions
        options={question.options}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={onAnswerSelect}
      />
    </div>
  );
}

export default Question;