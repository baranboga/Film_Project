import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Home from './pages/Home';
import MainLayout from './layout/MainLayout';
import Detail from './pages/Detail';
import FavoriteFilms from './pages/FavoriteFilms';

function App() {
  return (
    
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:filmId" element={<Detail />} />
            <Route path="/FavoriteFilms" element={<FavoriteFilms/>} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </MainLayout>
      </Router>
    
  );
}

export default App;
