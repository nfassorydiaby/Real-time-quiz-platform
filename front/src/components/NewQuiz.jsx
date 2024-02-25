import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function NewQuiz() {
    const navigate = useNavigate();
  const [theme, setTheme] = useState('');
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isAddQuestionEnabled, setIsAddQuestionEnabled] = useState(false);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState('');

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
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
    }
  };

  const handleAddOption = () => {
    if (option.trim() !== '') {
      setOptions([...options, option]);
      setOption('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Theme:', theme);
    console.log('Questions:', questions);
    console.log('Options:', options);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-2xl font-bold mb-4">Créer un nouveau quiz</h1>
      <div className='flex justify-center'>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="theme">
              Thème
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="theme"
              type="text"
              placeholder="Entrez un thème"
              value={theme}
              onChange={handleThemeChange}
            />
          </div>
          {isAddingQuestion && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question">
                Question
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="question"
                type="text"
                placeholder="Entrez une question"
                value={question}
                onChange={handleQuestionChange}
              />
            </div>
          )}
          {isAddingQuestion && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="options">
                Option
              </label>
              {options.map((opt, index) => (
                <div key={index}>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={`option-${index}`}
                    type="text"
                    placeholder={`Entrez l'option ${index + 1}`}
                    value={opt}
                    readOnly
                  />
                </div>
              ))}
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          )}
          {isAddQuestionEnabled && !isAddingQuestion && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question">
                Question
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="question"
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
          {!isAddQuestionEnabled && (
            <button
              className="my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
              type="button"
              onClick={() => setIsAddQuestionEnabled(true)}
            >
              Créer le quiz
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

  
export default NewQuiz;