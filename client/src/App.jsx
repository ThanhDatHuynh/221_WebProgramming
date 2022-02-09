import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render = () => {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar {...this.props} />
          <Routes>
            <Route exact path="/" element={<IndexPage {...this.props} />} />
            <Route
              exact
              path="/login"
              element={<LoginPage {...this.props} />}
            />
            <Route
              exact
              path="/register"
              element={<RegisterPage {...this.props} />}
            />
          </Routes>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  };
}

export default App;
