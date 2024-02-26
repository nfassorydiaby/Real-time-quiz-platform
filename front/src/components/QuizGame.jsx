import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';


function QuizGame(props) {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [questionsOptions, setQuestionsOptions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);


  const location = useLocation();

  const quiz = props.quiz;

  useEffect(() => {
    const fetchQuestionsOptions = async () => {
      try {
        const response = await fetch(`http://localhost:8000/quizs/${quiz.id}/question`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const dataQuestions = await response.json();

          // Sequentially fetch options for each question
          const questionsWithOptions = await Promise.all(dataQuestions.map(async (dataQuestion) => {
            const questionWithOptions = { ...dataQuestion }; // Copy question data
            try {
              const response = await fetch(`http://localhost:8000/question/${dataQuestion.id}/options`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              if (response.ok) {
                const dataOptions = await response.json();
                questionWithOptions.options = dataOptions; // Add options to question
              } else {
                console.log('Une erreur est survenue lors de la récupération des options');
              }
            } catch (error) {
              console.log(error);
            }
            return questionWithOptions;
          }));

          setQuestionsOptions(questionsWithOptions);
        } else {
          console.log('Une erreur est survenue lors de la récupération des questions');
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (questionsOptions.length === 0) {
      fetchQuestionsOptions();
    }

  }, []);

  const handleNextQuestion = () => {
    // Move to the next question if there are more questions available
    if (currentQuestionIndex < questionsOptions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // Reset selected option when moving to the next question
    } else {
      // Quiz completed, navigate to the next page or perform any action
      navigate('/quiz-summary');
    }
  };

  const handleValidateAnswer = () => {
    // Validate the selected option and proceed to the next question
    // You can add your logic here to handle validation
    handleNextQuestion();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {questionsOptions.length > 0 ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Quiz en cours : {quiz.title}</h1>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Question {currentQuestionIndex + 1}:</h2>
            <p className="text-lg mb-4">{questionsOptions[currentQuestionIndex].question_text}</p>
            <form>
              {questionsOptions[currentQuestionIndex].options.map((option, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="checkbox"
                    id={`option-${index}`}
                    value={option.id}
                    checked={selectedOption === option.id}
                    onChange={() => setSelectedOption(option.id)}
                    className="mr-2"
                  />
                  <label htmlFor={`option-${index}`} className="text-lg">{option.option_text}</label>
                </div>
              ))}
            </form>
            <button onClick={handleValidateAnswer} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Valider la réponse
            </button>
          </div>
        </div>
      ) : (
        <h1 className="text-3xl font-bold">Chargement...</h1>
      )}
    </div>
  );
}
  
export default QuizGame;