import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function CardList() {
  const navigate = useNavigate();
    const [cards, setCards] = useState([]);

    const apiUrl = `http://localhost:8000`;

    useEffect(() => {
        const fetchCards = async () => {
          try {
            const response = await fetch(`${apiUrl}/cards/`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (response.ok) {
              const data = await response.json();
              console.log(data)
              if (data.length > 0) { // Check if data is not empty
                setCards(data);
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
    
        if (cards.length === 0) {
          fetchCards();
        }
    
      }, []);

    const handleUrl = (url) => {
      navigate(url);
    };
  
    return (
      <div className="">
        <h1 className='text-center text-2xl font-bold	'>My cards</h1>
        <div className="mt-5 flex justify-center">
          {cards.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {cards.map((card, index) => (
                <div key={index} className="bg-gray-200 p-4 rounded-lg">
                  <p className="mt-2">{card.tag}</p>
                  <h2 className="text-lg font-semibold">{card.question}</h2>
                  <p className="mt-2">{card.answer}</p>
                  <p className="mt-2">Category : {card.category}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-5 flex justify-center">
          <button onClick={() => handleUrl('/new-card')} className="m-2 bg-gray-500 rounded mt-4 text-white px-4 py-2 rounded hover:bg-gray-600">Add a new card</button>
          <button onClick={() => handleUrl('/quiz')} className="m-2 bg-gray-500 rounded mt-4 text-white px-4 py-2 rounded hover:bg-gray-600">Start the quiz</button>
        </div>
      </div>

    );
  
};
  
export default CardList;