import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

function QuestionCard({ index, ques, handleAnswerSelect }) {
  const [selected, setSelected] = useState(null);

  // w used useMemo so that options are recalculated only when ques or index changes
  const options = useMemo(() => {
    if (ques.length === 0 || !ques[index]) return [];
    const { correct_answer, incorrect_answers } = ques[index];
    // this is done to randomize the options
    return [...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5);
  }, [ques, index]);

  // Don't render if question data is missing
  if (ques.length === 0 || !ques[index]) return null;

  const { question } = ques[index];

  const handleSelect = (option) => {
    setSelected(option);
    handleAnswerSelect(option);
  };

  return (
    // used framer motion to animate the question card ( Bonus feature )
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white shadow-md rounded p-4 max-w-2xl"
    >
      <h3 className="text-lg font-semibold mb-4">
        Q{index + 1}. {question}
      </h3>
      <ul className="space-y-2">
        {options.map((option, i) => (
          <li
            key={i}
            onClick={() => handleSelect(option)}
            className={`border p-3 rounded cursor-pointer transition-colors duration-200 ${
              selected === option
                ? 'bg-blue-500 text-white border-blue-500'
                : 'hover:bg-blue-100'
            }`}
          >
            {option}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default QuestionCard;
