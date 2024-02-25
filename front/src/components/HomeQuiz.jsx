import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function HomeQuiz() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([
    { id: 1, theme: "History" },
    { id: 2, theme: "Science" },
    { id: 3, theme: "Geography" },
    { id: 4, theme: "Literature" },
    // Add more quizzes as needed
  ]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="container mx-auto">
        <h1 className='text-center text-2xl font-bold mb-4'>Liste des quiz</h1>
        <div className='flex justify-end mr-4'>
          <button onClick={() => navigate(`/new-quiz`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4">Créer un nouveau quiz</button>
        </div>
        
        {quizzes.map(quiz => (
          <div key={quiz.id} className="flex justify-center items-center border p-4 my-4">
            <h2 className="text-lg font-semibold">{quiz.theme}</h2>
            <button onClick={() => navigate(`/quiz/${quiz.id}`)} className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">Commencer le quiz</button>
          </div>
        ))}
      </div>
    </div>
  );
}
  
export default HomeQuiz;