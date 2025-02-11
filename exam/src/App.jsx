import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { Login } from "./components/Login";
import { SignIn } from "./components/SigIn";
import { UserProvider } from "./UserContext";
import { Home } from './components/Home';
import { Inventory } from './components/admin/inventory';
import { Orders } from './components/admin/orders';
import { Menu } from './components/client/menu';
// import { Panel } from './components/admin/panel';



function App() {

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/menu" element={<Menu />} />
          {/* <Route path="/panel" element={<Panel />} /> */}
        </Routes>
      </Router>
      </UserProvider>
  )
}

export default App
