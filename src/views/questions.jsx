import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionCard from '../components/questionCard';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Result from './Result';
import Sidebar from '../components/sidebar';
function Questions() {
  const navigate = useNavigate();
  const [ques, setQues] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewedQuestions, setViewedQuestions] = useState(new Set());
  const [attemptedQuestions, setAttemptedQuestions] = useState(new Set());
  const [showSidebar, setShowSidebar] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 mins in seconds
  const [answers, setAnswers] = useState(Array(15).fill(null));
  const [correctAnswers, setCorrectAnswers] = useState(Array(15).fill(null));

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
    // when the user clicks on any option we are storing that option in the answers array at the current index
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentIndex] = option;
      return newAnswers;
    });
    setAttemptedQuestions((prev) => new Set(prev).add(currentIndex));
  };

  const handleNext = () => {
    if (currentIndex < ques.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // if the user is on the last question, we navigate to the results page
      navigate('/results', {
        state: {
          answers,
          ques
        }
      });
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
      <div className="flex-1 p-16 pr-0 lg:pr-72">
        <QuestionCard
        key={currentIndex}
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

export default Questions;
