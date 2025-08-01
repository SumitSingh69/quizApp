import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionCard from '../components/questionCard';
import { useNavigate } from 'react-router-dom';

function Questions() {
  const navigate = useNavigate();
  const [ques, setQues] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes = 1800 seconds

  // Handle timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      navigate('/results');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  // Fetch questions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=15');
        setQues(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAnswerSelect = (selectedOption) => {
    // optionally store the selected answer
  };

  const handleNext = () => {
    if (currentIndex < ques.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate('/results');
    }
  };

  // Format time (mm:ss)
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  if (ques.length === 0) return null;

  return (
    <div className="min-h-screen p-8 relative">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-lg font-semibold text-red-600">
  Time Left: {formatTime(timeLeft)}
</div>

      <QuestionCard
        index={currentIndex}
        handleAnswerSelect={handleAnswerSelect}
        ques={ques}
      />

      <button
        onClick={handleNext}
        className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded shadow-lg"
      >
        {currentIndex < ques.length - 1 ? 'Next Question' : 'Finish'}
      </button>
    </div>
  );
}

export default Questions;
