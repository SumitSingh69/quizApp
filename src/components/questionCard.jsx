import React, { useState, useMemo } from 'react';

function QuestionCard({ index, ques, handleAnswerSelect }) {
  const [selected, setSelected] = useState(null);

  // ✅ Move hooks before any early return
  const options = useMemo(() => {
    if (ques.length === 0) return [];
    const { correct_answer, incorrect_answers } = ques[index];
    return [...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5);
  }, [ques, index]);

  if (ques.length === 0 || !ques[index]) return null;

  const { question } = ques[index];

  const handleSelect = (option) => {
    setSelected(option);
    handleAnswerSelect(option);
  };

  return (
    <div>
      <h3 className='p-4'>Q{index + 1}. {question}</h3>
      <ul>
        {options.map((option, i) => (
          <li
            key={i}
            onClick={() => handleSelect(option)}
            className={`border p-2 w-1/2 rounded cursor-pointer hover:bg-blue-100 ${
              selected === option ? 'bg-blue-500 text-white' : ''
            }`}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionCard;
