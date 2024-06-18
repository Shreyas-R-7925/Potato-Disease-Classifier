import React from 'react'
import {Actions, ImageUpload} from './components'; 
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ImageUpload />} />
        <Route path="/remedy" element={<Actions />} />                  
      </Routes>
    </BrowserRouter>
  )
}

export default App