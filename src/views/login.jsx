import React, { useState } from "react";
import Questions from "./questions";
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [isValid, setIsValid] = useState(false);
  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(regex.test(value));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      console.log("hi its working ")
      navigate("/questions");
    } else {
      alert("Please enter a valid email address.");
    }
  };
  return (
    <div className="p-12 bg-white rounded-lg shadow flex flex-col items-center">
      <h1 className="font-bold text-2xl mb-6">Login to enter the Quiz</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          validateEmail(e.target.value);
        }}
        className={`border px-4 py-2 rounded w-full ${
          isValid ? "border-green-500" : "border-red-500"
        }`}
        placeholder="Enter your email"
      />
      {/* {!isValid && <p className="text-red-500 mt-1">Invalid email format</p>} */}

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white p-2 rounded w-full cursor-pointer"
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
