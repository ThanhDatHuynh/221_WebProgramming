import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Navbar from "./components/NavBar";

import IndexPage from "./pages/IndexPage";

class App extends React.Component {
  render = () => {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<IndexPage {...this.props} />} />
            {/* Ortherwise redirect to main page */}
            <Route exact path="/products" element={<>Product</>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  };
}

export default App;
