import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

function HomeQuiz() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("http://localhost:8000/quizs/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setQuizzes(data);
        } else {
          console.log('Une erreur est survenue lors de la récupération des quiz');
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (quizzes.length === 0) {
      fetchQuizzes();
    }
    
  }, []); // Empty dependency array to run the effect only once on mount

  const quizGame = (quiz) => () => {
    navigate(
      `/room`,
      {
        state: {
          quiz: quiz,
        },
      },
      { replace: true }
    );
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="container mx-auto">
        <h1 className='text-center text-2xl font-bold mb-4'>Liste des quiz</h1>
        <div className='flex justify-end mr-4'>
          <button onClick={() => navigate(`/new-quiz`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4">Créer un nouveau quiz</button>
        </div>
        
        {quizzes.length > 0 && (
          quizzes.map(quiz => (
            <div key={quiz.id} className="flex justify-center items-center border p-4 my-4">
              <h2 className="text-lg font-semibold">{quiz.title}</h2>
              {/* <button onClick={quizGame(quiz)} className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">Commencer le quiz</button> */}
              <button onClick={quizGame(quiz)} className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">Salle d'attente</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
  
export default HomeQuiz;