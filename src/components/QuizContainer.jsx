// QuizContainer.js
import React, { useState, useEffect } from 'react';
import Question from './Question';
import NavigationButtons from './NavigationButtons';
import ScoreDisplay from './ScoreDisplay';
import QuizSettings from './QuizSettings';
import ProgressBar from './ProgressBar';

function QuizContainer() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

  useEffect(() => {
    let timer;
    if (quizStarted && !quizCompleted && timeRemaining > 0) {
      timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
    } else if (timeRemaining === 0) {
      handleNextQuestion();
    }
    return () => clearTimeout(timer);
  }, [quizStarted, quizCompleted, timeRemaining]);

  function decodeHTML(html) {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  const fetchQuestions = async (category, difficulty) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      const formattedQuestions = data.results.map((q) => ({
        text: decodeHTML(q.question),
        options: q.incorrect_answers.map(decodeHTML).concat(decodeHTML(q.correct_answer)).sort(() => Math.random() - 0.5),
        correctAnswer: decodeHTML(q.correct_answer),
      }));
      setQuestions(formattedQuestions);
      setQuizStarted(true);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleStartQuiz = (category, difficulty) => {
    fetchQuestions(category, difficulty);
  };

  const handleAnswerSelect = (answer) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newUserAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeRemaining(30);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTimeRemaining(30);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (question.correctAnswer === userAnswers[index]) {
        score++;
      }
    });
    return score;
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setTimeRemaining(30);
    setShowCorrectAnswers(false);
  };

  if (loading) {
    return <div>Loading questions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!quizStarted) {
    return <QuizSettings onStartQuiz={handleStartQuiz} />;
  }

  if (quizCompleted) {
    return (
      <div>
        <ScoreDisplay score={calculateScore()} total={questions.length} />
        <button onClick={() => setShowCorrectAnswers(!showCorrectAnswers)}>
          {showCorrectAnswers ? 'Hide' : 'Show'} Correct Answers
        </button>
        {showCorrectAnswers && (
          <div>
            {questions.map((q, index) => (
              <div key={index}>
                <p>{q.text}</p>
                <p>Your answer: {userAnswers[index] || 'Not answered'}</p>
                <p>Correct answer: {q.correctAnswer}</p>
              </div>
            ))}
          </div>
        )}
        <button onClick={handleRestartQuiz}>Restart Quiz</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
      <div>Time remaining: {timeRemaining} seconds</div>
      <Question
        question={questions[currentQuestionIndex]}
        selectedAnswer={userAnswers[currentQuestionIndex]}
        onAnswerSelect={handleAnswerSelect}
      />
      <NavigationButtons
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        onNextQuestion={handleNextQuestion}
        onPreviousQuestion={handlePreviousQuestion}
      />
    </div>
  );
}

export default QuizContainer;