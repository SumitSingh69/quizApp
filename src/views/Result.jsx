import React from 'react'
import { useLocation } from 'react-router-dom';
import calculateScore from '../hooks/calculateScore';
import { useNavigate } from 'react-router-dom';

function Result() {
  // parameters needed are correct_answers and our answers
  const navigate = useNavigate();
  const {state} = useLocation();
  const { answers, ques } = state;
  const score = calculateScore({answers, ques});
  const handleRetake = () => {
    navigate('/questions');
  }
  return (
    <div className='min-h-screen w-full'>
      <div className='p-15'>
          <h1 className='font-bold text-4xl'> You Scored :  {score}/15</h1>
          <h1 className='p-4 ml-4'>{score >= 10 ? "great job" : <button onClick={handleRetake} className='px-4 py-2 border-1 rounded-md bg-red-600 text-white cursor-pointer'> try again </button>}</h1>
      </div>
      <div className='p-6'>
        {answers.map((answer, index) => (
          <div className='p-4'>
          <div key={index}>
            Q{index + 1}: {ques[index].question}
            <br />
            <span className='font-semibold'>Your Answer</span> : {answer ? answer : "Not Attempted"}
            <br />
            <span className='font-semibold'>Correct Answer</span> : {ques[index].correct_answer}
            <br />
            <span className='font-semibold'>Marking</span> : {answer === ques[index].correct_answer ? "+ 1" : "0"}
          </div>
          </div>
        ))}
        </div>
    </div>
  )
}

export default Result