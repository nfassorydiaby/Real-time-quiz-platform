import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:8000/auth/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
            navigate("/login");

        } else {
            setErrorMessage('Une erreur est surdvenue lors de l\'inscription. Nom d\'utilisateur ou email déjà utilisé. Veuillez essayer à nouveau.');
        }
      } catch (error) {
        if (error.response && error.response.data) {
            console.log(error)
            setErrorMessage(error.response.data.detail);
        } else {
            console.log(error)
            setErrorMessage('Une erreur est surdvenue lors de l\'inscription. Nom d\'utilisateur ou email déjà utilisé. Veuillez essayer à nouveau.');
        }
      } 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Inscription</h3>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <div>
            <label htmlFor="username" className="block">Nom d'utilisateur</label>
            <input type="text" name="username" id="username" required onChange={handleChange} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"/>
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="block">Email</label>
            <input type="email" name="email" id="email" required onChange={handleChange} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"/>
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="block">Mot de passe</label>
            <input type="password" name="password" id="password" required onChange={handleChange} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"/>
          </div>
          <div className="flex items-center justify-between mt-4">
            <button type="submit" className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">S'inscrire</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
