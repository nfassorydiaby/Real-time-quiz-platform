import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/',
});

//export const lireCartes = () => API.get('cards/');
//export const creerCarte = (nouvelleCarte) => API.post('cards/', nouvelleCarte);
//export const obtenirCartesQuizz = () => API.get('cards/quizz/');
//export const verifierReponse = (cardId, cardResponse) => API.patch(`cards/${cardId}/answer/`, cardResponse);

export default API;
