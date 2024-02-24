import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// Component for quiz functionality
function QuizPage() {
  const navigate = useNavigate();
  const [quizCards, setQuizCards] = useState([]);

  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userResponse, setUserResponse] = useState('');
  const [showNextButton, setShowNextButton] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLastQuestion, setIsLastQuestion] = useState(false);

  const apiUrl = `http://localhost:8000`;

    useEffect(() => {
        const fetchQuizCards = async () => {
            try {
                
                const response = await fetch(`${apiUrl}/cards/quizz/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    if (data.length > 0) { // Check if data is not empty
                      setQuizCards(data);
                      console.log(cards)
                    } else {
                      console.log('No cards found');
                    }
                    
                } else {
                    console.error('Failed to fetch cards');
                }
                
                
            } catch (error) {
                console.error('Error fetching cards:', error);
            }
        };
    
        if (quizCards.length === 0) {
          fetchQuizCards();
        }
        
    }, [quizCards]); // Include 'cards' in the dependency array

    const handleResponseSubmit = () => {
      // Logic to handle response submission
      setShowNextButton(true); // Display the next button
      setShowAnswer(true); // Show the answer
    };
  
    const handleNextCard = () => {
      // Logic to move to the next card
      setShowNextButton(false); // Hide the next button
      setShowAnswer(false); // Hide the answer
      setCurrentCardIndex(currentCardIndex + 1); // Move to the next card
      setUserResponse(''); // Reset the user response field
    };

    const handleCheckResponse = async (e, cardId, isValid) => {
      e.preventDefault();
      if (currentCardIndex === quizCards.length - 1) {
        setIsLastQuestion(true);
        setShowNextButton(false);
      } else {
          const bodyQuizResponse = {
            isValid: isValid
          }
        
          try {
            const response = await fetch(`${apiUrl}/cards/${cardId}/answer`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(bodyQuizResponse)
            });
    
            if (response.ok) {
              console.log('Check response successfully');
              handleNextCard();
    
            } else {
            throw new Error('Failed to check response');
            }
          } catch (error) {
            console.error('Error checking response:', error);
          }
          
        };
      }
      

    const handleFinish = () => {
      navigate("/");
    };
  
    return (
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Quiz</h1>
        {quizCards.length > 0 && (
          <div className="bg-white shadow-md rounded px-8 py-6">
            <h2 className="text-xl font-semibold mb-4">Question {currentCardIndex + 1}</h2>
            <p className="mb-4 font-light"> Tag : {quizCards[currentCardIndex].tag}</p>
            <p className="mb-4 font-normal">{quizCards[currentCardIndex].question}</p>
            <input
              type="text"
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              placeholder="Enter your answer"
            />
            {!showAnswer && (
              <button
                onClick={handleResponseSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2"
              >
                Submit Response
              </button>
            )}
            {showAnswer && (
              <p className="text-gray-700 mb-4">Actual response: {quizCards[currentCardIndex].answer}</p>
            )}
            {showNextButton && (
              <div className="flex justify-between mt-4">
                <button
                  onClick={(e) => handleCheckResponse(e, quizCards[currentCardIndex].id, false)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Invalidate the answer
                </button>
                <button
                  onClick={(e) => handleCheckResponse(e, quizCards[currentCardIndex].id, true)}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Validate the answer
                </button>
              </div>
            )}
            {isLastQuestion && (
              <button
                onClick={handleFinish}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
              >
                Finish
              </button>
            )}
          </div>
        )}
      </div>

    );
  }
  
  export default QuizPage;
