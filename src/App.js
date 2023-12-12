// App.js
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BeerList from "./Components/BeerLists";
import BeerDetails from "./Components/BeerDetails";
// import Header from './Components/Header'

function App() {
  return (
    <>
        {/* Setting up the routes */}
      <Router>
        <Routes>
          <Route path="/" exact element={<BeerList />} />
          <Route path="/beer/:id" element={<BeerDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
