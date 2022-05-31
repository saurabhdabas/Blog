import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';


function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/create" element={<CreatePost/>}/>
      </Routes>
    </Router>
  );
}

export default App;
