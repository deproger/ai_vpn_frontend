import React from "react";
// import TelegramLoginWidget from './Telegram';
import "./App.css";
import Home from "./pages/Home";
import Tariphs from "./pages/Tariphs";
import FAQ from "./pages/FAQ";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tariphs" element={<Tariphs/>}/>
        <Route path="/faq" element={<FAQ/>}/>
      </Routes>
    </Router>
  );
};

export default App;
