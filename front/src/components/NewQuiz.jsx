import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function NewQuiz() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [theme, setTheme] = useState('');
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isAddQuestionEnabled, setIsAddQuestionEnabled] = useState(false);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState('');
  const [isCorrect, setIsCorrect] = useState(false); // State to manage if the option is correct or not
  const [existingQuestions, setExistingQuestions] = useState([]); // State to manage if the option is correct or not
  const [quiz, setQuiz] = useState({});


  const [formQuiz, setFormQuiz] = useState({
    title: '',
    description : '',
    creator_id : user.id,
  });

  const [formQuestion, setFormQuestion] = useState({
    question_text: '',
    options: []
  });

  const handleChangeQuiz = (e) => {
    const { name, value } = e.target;
    setFormQuiz({
      ...formQuiz,
      [name]: value
    });
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleOptionChange = (event) => {
    setOption(event.target.value);
  };

  const handleAddQuestion = () => {
    if (question.trim() !== '') {
      setIsAddingQuestion(true);
      setFormQuestion({
        ...formQuestion,
        ['question_text']: question
      });
    }
  };

  const handleAddOption = () => {
    if (option.trim() !== '') {
      const newOption = {
        option_text: option,
        is_correct: isCorrect, // Assuming isCorrect is a state representing whether the option is correct or not
      };
      setOptions([...options, newOption]);
      setFormQuestion(prevState => ({
        ...prevState,
        options: [...prevState.options, newOption]
      }));
      setOption('');
      setIsCorrect(false);
      console.log(formQuestion)
    }
  };

  const handleCheckboxChange = (event) => {
    setIsCorrect(event.target.checked);
  };

  const handleSubmitQuiz = async (event) => {
    event.preventDefault();
    
    try {
        const response = await fetch("http://localhost:8000/quizs/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formQuiz),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setQuiz(data);
            console.log(formQuiz)
            setTheme(formQuiz.title)
            setIsAddQuestionEnabled(true);

        } else {
            console.log('Une erreur est surdvenue lors de la creation du quiz');
        }
      } catch (error) {
        if (error.response && error.response.data) {
            console.log(error)
        } else {
            console.log(error)
        }
      }
    
  };

  const handleSubmitQuestion = async (event) => {
    event.preventDefault();
    // Add the question from formQuestion to the existing questions state
    

    try {
      const response = await fetch(`http://localhost:8000/quizs/${quiz.id}/question`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formQuestion),
      });

      if (response.ok) {
          const dataQuestion = await response.json();
          console.log(dataQuestion)

          for (const option of formQuestion.options) {
            try {
                const response = await fetch(`http://localhost:8000/question/${dataQuestion.id}/options`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(option),
                });
        
                if (response.ok) {
                    const dataOption = await response.json();

                    console.log(dataOption);
                    
                    if (formQuestion.question_text.trim() !== '') {
                      setExistingQuestions([...existingQuestions, formQuestion]);
                    }
                    // Reset states
                    setIsAddingQuestion(false);
                    setOptions([]);
                    setQuestion('');
                    setFormQuestion({
                      question_text: '',
                      options: []
                    });

        
                } else {
                    console.log('Une erreur est surdvenue lors de la creation de option');
                }
              } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error)
                } else {
                    console.log(error)
                }
              }
          };

      } else {
          console.log('Une erreur est surdvenue lors de la creation de la question');
      }
    } catch (error) {
      if (error.response && error.response.data) {
          console.log(error)
      } else {
          console.log(error)
      }
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-2xl font-bold mb-4">Créer un nouveau quiz</h1>
      <div className='flex justify-center'>
        {theme ? (
          <div className='mx-4'>
            <p>Thème soumis: {theme}</p>
            {/* You can display other details or navigate to another component */}
          </div>
        ) : (
          <div className='flex justify-center'>
            <form onSubmit={handleSubmitQuiz}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="theme">
                  Thème
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  name='title'
                  type="text"
                  placeholder="Entrez un thème"
                  onChange={handleChangeQuiz}
                />
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  name='description'
                  type="text"
                  placeholder="Entrez une description"
                  onChange={handleChangeQuiz}
                />
              </div>
              <button
                className="my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
                type="submit"
                onClick={handleSubmitQuiz}
              >
                Créer le quiz
              </button>
            </form>
          </div>
        )}
        {existingQuestions.length > 0 && (
          <div className='mx-4'>
            <h2>Questions ajoutées:</h2>
            {existingQuestions.map((existingQuestion, index) => (
              <div key={index}>
                <p>Question {index + 1}: {existingQuestion.question_text}</p>
              </div>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmitQuestion}>
        {isAddingQuestion && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question">
              Nouvelle question
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="question_text"
              name='question_text'
              type="text"
              placeholder="Entrez une question"
              value={question}
              onChange={handleQuestionChange}
              readOnly
            />
            <div className="mb-4 my-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="options">
                Option(s) ajoutée(s)
              </label>
              {options.map((opt, index) => (
                <div className='my-4' key={index}>
                  <p>{opt.option_text} :  {opt.is_correct ? "Vrai" : "Faux"}</p>
                </div>
              ))}
              <p>Nouvelle option</p>
              <div className='flex'>
                <label className="block text-gray-700 text-sm font-bold mb-2 mr-2" htmlFor="correct">
                  Bonne réponse ?
                </label>
                <input
                  className="mr-2"
                  type="checkbox"
                  name='correct'
                  id="correct"
                  checked={isCorrect}
                  onChange={handleCheckboxChange}
                />
              </div>
              
              <input
                className="my-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="options"
                type="text"
                placeholder="Entrez une option"
                value={option}
                onChange={handleOptionChange}
              />
              <button
                className="my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
                type="button"
                onClick={handleAddOption}
              >
                Ajouter l'option
              </button>
            </div>
            {options.length > 0 && (
              <button
                className="my-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Valider la question
              </button>
            )}
          </div>
        )}
          {isAddQuestionEnabled && !isAddingQuestion && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question">
                Nouvelle Question
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="question_text"
                name='question_text'
                type="text"
                placeholder="Entrez une question"
                value={question}
                onChange={handleQuestionChange}
              />
              <button
                className="my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
                type="button"
                onClick={handleAddQuestion}
              >
                Ajouter la question
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

  
export default NewQuiz;