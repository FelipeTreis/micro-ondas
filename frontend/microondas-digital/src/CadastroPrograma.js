import React, { useState } from 'react';
import axios from 'axios';
import './CadastroPrograma.css';

const CadastroPrograma = () => {
  const [nome, setNome] = useState('');
  const [alimento, setAlimento] = useState('');
  const [potencia, setPotencia] = useState(0);
  const [caractere, setCaractere] = useState('');
  const [tempo, setTempo] = useState(0);
  const [instrucoes, setInstrucoes] = useState('');

  const handleCadastro = async () => {
    const token = localStorage.getItem('authToken');
    try {
      // Ajuste a URL para o endpoint correto do backend
      const response = await axios.post('http://localhost:5186/api/programaaquecimento', {
          nome, alimento, potencia, caractere, tempo, instrucoes
      }, {
          headers: { Authorization: `Bearer ${token}` }
      });    
      alert('Programa cadastrado com sucesso');
    } catch (error) {
      alert('Erro ao cadastrar programa');
    }
  };

  return (
    <div>
      <h3>Cadastrar Programa Customizado</h3>
      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
      <input type="text" value={alimento} onChange={(e) => setAlimento(e.target.value)} placeholder="Alimento" />
      <input type="number" value={potencia} onChange={(e) => setPotencia(e.target.value)} placeholder="Potência" />
      <input type="text" value={caractere} onChange={(e) => setCaractere(e.target.value)} placeholder="Caractere de Aquecimento" />
      <input type="number" value={tempo} onChange={(e) => setTempo(e.target.value)} placeholder="Tempo (segundos)" />
      <textarea value={instrucoes} onChange={(e) => setInstrucoes(e.target.value)} placeholder="Instruções" />
      <button onClick={handleCadastro}>Cadastrar</button>
    </div>
  );
};

export default CadastroPrograma;
