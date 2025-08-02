import React from 'react'
function Sidebar({ ques, currentIndex, setCurrentIndex, viewedQuestions, attemptedQuestions }) {
    return (
      <>
        <h2 className="text-lg font-bold mb-4">Questions Navigator</h2>
        <div className="grid grid-cols-5 gap-2">
          {ques.map((_, idx) => {
            let bgColor = 'bg-gray-300';
            if (attemptedQuestions.has(idx)) bgColor = 'bg-green-600';
            else if (viewedQuestions.has(idx)) bgColor = 'bg-blue-300';
  
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-10 h-10 rounded-md text-white font-bold hover:scale-105 transition ${bgColor} ${
                  currentIndex === idx ? 'ring-2 ring-black' : ''
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
  
        {/* instructions for the user to understand */}
        <div className="mt-6 text-sm text-gray-600 space-y-2">
          <div><span className="inline-block w-4 h-4 bg-green-600 rounded-full mr-2"></span>Attempted</div>
          <div><span className="inline-block w-4 h-4 bg-blue-300 rounded-full mr-2"></span>Viewed</div>
        </div>
      </>
    );
  }
  export default Sidebar;