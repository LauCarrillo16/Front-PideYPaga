import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { Login } from "./components/Login";
import { SignIn } from "./components/SigIn";
import { UserProvider } from "./UserContext";
import { Home } from './components/Home';



function App() {

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
      </UserProvider>
  )
}

export default App
