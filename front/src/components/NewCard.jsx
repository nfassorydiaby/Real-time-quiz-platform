import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


function NewCard() {

    const apiUrl = `http://localhost:8000`;

    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    tag: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setSuccessMessage('');
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${apiUrl}/cards/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Card added successfully
        console.log('Card added successfully');
        // Reset form fields after submission
        setFormData({
          question: '',
          answer: '',
          tag: ''
        });
        setSuccessMessage('Card added successfully!');
        } else {
        throw new Error('Failed to add card');
        }
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  const handleBackToCardsList = () => {
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Add a New Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="question" className="block text-gray-700 font-semibold mb-2">Question</label>
          <input
            type="text"
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            placeholder="Enter question"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="answer" className="block text-gray-700 font-semibold mb-2">Answer</label>
          <input
            type="text"
            id="answer"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            placeholder="Enter answer"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tag" className="block text-gray-700 font-semibold mb-2">Tag</label>
          <input
            type="text"
            id="tag"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            placeholder="Enter tag"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Card</button>
      </form>
      {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
      <button onClick={handleBackToCardsList} className="bg-gray-500 rounded mt-4 text-white px-4 py-2 rounded hover:bg-gray-600">Back to Cards List</button>
    </div>
  );
}

export default NewCard;

