import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionCard from '../components/questionCard';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';

function Questions() {
  const navigate = useNavigate();
  const [ques, setQues] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewedQuestions, setViewedQuestions] = useState(new Set());
  const [attemptedQuestions, setAttemptedQuestions] = useState(new Set());
  const [showSidebar, setShowSidebar] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 mins in seconds

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate('/results');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  // Format MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

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

  useEffect(() => {
    if (ques.length > 0) {
      setViewedQuestions((prev) => new Set(prev).add(currentIndex));
    }
  }, [currentIndex, ques]);

  const handleAnswerSelect = (option) => {
    setAttemptedQuestions((prev) => new Set(prev).add(currentIndex));
  };

  const handleNext = () => {
    if (currentIndex < ques.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate('/results');
    }
  };

  if (ques.length === 0) return <div>Loading...</div>;

  return (
    <div className="flex w-full min-h-screen bg-gray-100 relative">
      {/* Timer */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white shadow px-4 py-2 rounded text-lg font-semibold z-40">
        Time Left: {formatTime(timeLeft)}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 bg-gray-800 text-white p-2 rounded"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu />
      </button>

      {/* Main Content */}
      <div className="flex-1 p-8 pr-0 lg:pr-72">
        <QuestionCard
          index={currentIndex}
          handleAnswerSelect={handleAnswerSelect}
          ques={ques}
        />
        <button
          onClick={handleNext}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          {currentIndex < ques.length - 1 ? 'Next Question' : 'Finish'}
        </button>
      </div>

      {/* Sidebar (desktop) */}
      <div className="hidden lg:flex fixed top-0 right-0 h-screen w-72 bg-white border-l p-4 flex-col items-center shadow-lg z-30">
        <Sidebar
          ques={ques}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          viewedQuestions={viewedQuestions}
          attemptedQuestions={attemptedQuestions}
        />
      </div>

      {/* Sidebar (mobile) */}
      {showSidebar && (
        <div className="lg:hidden fixed top-0 right-0 h-screen w-72 bg-white border-l p-4 flex-col items-center shadow-lg z-40">
          <Sidebar
            ques={ques}
            currentIndex={currentIndex}
            setCurrentIndex={(i) => {
              setCurrentIndex(i);
              setShowSidebar(false);
            }}
            viewedQuestions={viewedQuestions}
            attemptedQuestions={attemptedQuestions}
          />
        </div>
      )}
    </div>
  );
}

function Sidebar({ ques, currentIndex, setCurrentIndex, viewedQuestions, attemptedQuestions }) {
  return (
    <>
      <h2 className="text-lg font-bold mb-4">Questions</h2>
      <div className="grid grid-cols-5 gap-2">
        {ques.map((_, idx) => {
          let bgColor = 'bg-gray-400';
          if (attemptedQuestions.has(idx)) bgColor = 'bg-green-600';
          else if (viewedQuestions.has(idx)) bgColor = 'bg-yellow-400';

          return (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-10 h-10 rounded-full text-white font-bold hover:scale-105 transition ${bgColor} ${
                currentIndex === idx ? 'ring-2 ring-black' : ''
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 text-sm text-gray-600 space-y-2">
        <div><span className="inline-block w-4 h-4 bg-green-600 rounded-full mr-2"></span>Attempted</div>
        <div><span className="inline-block w-4 h-4 bg-yellow-400 rounded-full mr-2"></span>Viewed</div>
        <div><span className="inline-block w-4 h-4 bg-gray-400 rounded-full mr-2"></span>Not Visited</div>
      </div>
    </>
  );
}

export default Questions;
