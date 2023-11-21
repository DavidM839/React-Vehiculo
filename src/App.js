import React from 'react';
import './App.css';
import VehiculoCrud from './componentes/VehiculoCrud';
import ClienteCrud from './componentes/ClienteCrud';
import VentasCrud from './componentes/VentasCrud';
import Navbar from './componentes/Navbar';
import HomePage from './componentes/HomePage';

import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path="/Cliente" element={<ClienteCrud />} />
      <Route path="/Venta" element={<VentasCrud />} />
      <Route path="/Vehiculo" element={<VehiculoCrud />} />
      <Route path="/HomePage" element={<HomePage/>} />
    </Routes>
  </Router>
  );
}

export default App;
