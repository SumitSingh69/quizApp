import React from 'react'
import { useLocation } from 'react-router-dom';
import calculateScore from '../hooks/calculateScore';

function Result() {
  // parameters needed are correct_answers and our answers
  const {state} = useLocation();
  const { answers, ques } = state;
  const score = calculateScore({answers, ques});

  return (
    <div>
      <h1>{score} / 15</h1>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>
            Q{index + 1}: {answer + " " + ques[index].correct_answer + " " + ques[index].question}

          </li>
        ))}
        </ul>
    </div>
  )
}

export default Result