import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from './components/UserForm.jsx';
import Questionnaire from './components/Questionnaire';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
