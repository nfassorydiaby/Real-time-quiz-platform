import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import QuizGame from './QuizGame';


function Room() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [questionsOptions, setQuestionsOptions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [salle, setSalle] = useState([]);
  const [quizLaunched, setQuizLaunched] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const location = useLocation();

  const quiz = location.state.quiz;

  let bodyRoom = {
    title: "Salle_" + quiz.title,
    is_open: true,
    is_quiz_active: false,
    quiz_id: quiz.id
  }

  console.log(connectedUsers)

  console.log(messages)

  useEffect(() => {

    // const ws = new WebSocket(`ws://localhost:8000/ws/${user.id}`);

    // ws.onmessage = event => {
    //   const newMessage = "slt c'est " + user.username;
    //   console.log(event.data);
    //   setMessages(prevMessages => [...prevMessages, newMessage]);
    // };

    // ws.onclose = () => {
    //   console.log(`User ${user.id} has disconnected from the WebSocket`);

    // };

    // return () => {
    //   ws.close();
    // };



    const fetchSalle = async () => {
      try {
        const response = await fetch(`http://localhost:8000/quizs/${quiz.id}/salle`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const dataSalleIsOpen = await response.json();

          console.log(dataSalleIsOpen);

          if (dataSalleIsOpen.length === 0) {

            try {
                const response = await fetch(`http://localhost:8000/salle`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(bodyRoom),
                });
        
                if (response.ok) {
                  const dataSalle = await response.json();

                  console.log(dataSalle);

                  setSalle(dataSalle)
        
        
                } else {
                  console.log('Une erreur est survenue lors de creation salle');
                }
              } catch (error) {
                console.log(error);
              }


          } else {
            setSalle(dataSalleIsOpen[0]);
          }


        } else {
          console.log('Une erreur est survenue lors de la récupération de salle');
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (salle.length === 0) {
      fetchSalle();
    }

  }, []);

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      
      {salle && !quizLaunched && (
        <>
          <h1>Nom de la salle : {salle.title}</h1>
          <h1>Theme du quiz : {quiz.title}</h1>
          <h2>Description : {quiz.description}</h2>
          <p className='font-semibold'>En attente</p>
          <button onClick={() => setQuizLaunched(true)} className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">Lancer le quiz</button>
        </>
      )}
      {quizLaunched && <QuizGame quiz={quiz} />}
    </div>

    // <div className="container mt-3">
    //   <h1>Welcome to the Room</h1>
    //   <h2>Messages:</h2>
    //   <ul id="messages" className="mt-5">
    //     {messages.map((message, index) => (
    //       <li key={index}>{message}</li>
    //     ))}
    //   </ul>
    // </div>
    
    
  );
}
  
export default Room;