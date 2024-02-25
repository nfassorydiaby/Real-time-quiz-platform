import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import NewCard from './components/NewCard'; // Ajustez le chemin d'importation selon votre structure de dossier
// import userEvent from '@testing-library/user-event';
// import App from './App';
// import { BrowserRouter as Router } from 'react-router-dom';

// // Mock the fetch API to simulate fetching cards
// jest.mock('node-fetch', () => ({
//   fetch: jest.fn(() =>
//     Promise.resolve({
//       ok: true,
//       json: () => Promise.resolve([{ 
//         id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', 
//         question: 'Question 1',
//         answer: 'Answer 1',
//         tag: 'Tag 1'
//       }]), // Mocked response data
//     })
//   ),
// }));

// describe('App', () => {
//   test('renders App component', async () => {
//     render(
//       <Router>
//         <App />
//       </Router>
//     );
//     // Verify that the component renders without crashing
//     expect(screen.getByText('My cards')).toBeInTheDocument();
//     // Verify that the "Add a new card" button is rendered
//     expect(screen.getByText('Add a new card')).toBeInTheDocument();
//     // Verify that the "Start the quiz" button is rendered
//     expect(screen.getByText('Start the quiz')).toBeInTheDocument();
//   });

//   test('renders Cards array when cards is displayed', async () => {
//     render(
//       <Router>
//         <App />
//       </Router>
//     );

//     // Wait for the asynchronous data fetching to complete
//     await waitFor(() => {
//       // Verify that the CardList component is rendered
//       expect(screen.getByText('Question 1')).toBeInTheDocument();
//       expect(screen.getByText('Answer 1')).toBeInTheDocument();
//       expect(screen.getByText('Tag 1')).toBeInTheDocument();
//     });
//   });
// });

// // Mock de useNavigate pour éviter les erreurs liées au routing
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => jest.fn(),
// }));

// describe('NewCard', () => {
//   test('affiche le formulaire de création de carte', () => {
//     render(<NewCard />);
//     expect(screen.getByLabelText(/question/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/answer/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/tag/i)).toBeInTheDocument();
//   });

//   test('permet aux utilisateurs de saisir des informations', () => {
//     render(<NewCard />);
//     const questionInput = screen.getByLabelText(/question/i);
//     fireEvent.change(questionInput, { target: { value: 'Quelle est la capitale de la France ?' } });
//     expect(questionInput.value).toBe('Quelle est la capitale de la France ?');
//   });

//   // Ajoutez plus de tests ici pour couvrir d'autres aspects comme le comportement du formulaire lors de la soumission, la gestion des erreurs, etc.
// });
