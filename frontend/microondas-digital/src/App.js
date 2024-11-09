import React from 'react';
import './App.css';
import Microondas from './Microondas';  // Importa o componente Microondas
import CadastroPrograma from './CadastroPrograma'; // Importa o componente CadastroPrograma

function App() {
  return (
    <div className="App">
      <h1>Microondas App</h1>
      <Microondas />  {/* Usa o componente Microondas */}
      <CadastroPrograma /> Usa o componente CadastroPrograma
    </div>
  );
}

export default App;
