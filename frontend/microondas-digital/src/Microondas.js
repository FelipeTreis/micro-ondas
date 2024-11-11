import React, { useState, useEffect } from 'react';
import './Microondas.css';

function Microondas() {
  const [tempo, setTempo] = useState('');
  const [potencia, setPotencia] = useState(10);
  const [mensagem, setMensagem] = useState('');
  const [statusAquecimento, setStatusAquecimento] = useState('Aquecimento não iniciado');
  const [stringAquecimento, setStringAquecimento] = useState('');
  const [tempoRestante, setTempoRestante] = useState(0);
  const [isAquecendo, setIsAquecendo] = useState(false);
  const [intervaloAquecimento, setIntervaloAquecimento] = useState(null);

  // Estado para armazenar os produtos da API
  const [produtos, setProdutos] = useState([]);

  // Função para obter os produtos da API
  useEffect(() => {
    fetch('http://localhost:5186/api/programaaquecimento')
      .then(response => response.json())
      .then(data => {
        setProdutos(data);
      })
      .catch(error => console.error("Erro ao carregar produtos:", error));
  }, []);

  // Função para salvar o produto na API
  const salvarProduto = async () => {
    const produto = {
      nome: "Produto Exemplo", // Nome fixo, você pode modificar para permitir input do usuário
      tempo: parseInt(tempo),
      potencia: parseInt(potencia),
      instrucoes: stringAquecimento || 'Instruções padrão'
    };

    try {
      const response = await fetch('http://localhost:5186/api/alimento/salvar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(produto),
      });

      if (response.ok) {
        setMensagem('Produto salvo com sucesso');
      } else {
        setMensagem('Erro ao salvar o produto');
      }
    } catch (error) {
      setMensagem('Erro ao conectar com o servidor');
      console.error(error);
    }
  };

  // Função para selecionar um produto e iniciar o aquecimento
  const selecionarProduto = (produto) => {
    setTempo(produto.tempo);
    setPotencia(produto.potencia);
    setMensagem(`Produto selecionado: ${produto.nome}`);
    setStringAquecimento(produto.instrucoes || 'Iniciando aquecimento...');
    setStatusAquecimento('Aquecimento iniciado com produto');
  };

  // Função para validar o aquecimento
  const validarAquecimento = async () => {
    const data = {
      tempo: parseInt(tempo),
      potencia: parseInt(potencia),
    };

    try {
      const response = await fetch('http://localhost:5186/api/microondas/validar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const message = await response.json();
        setMensagem(message.mensagem);
        return true;
      } else {
        const error = await response.json();
        setMensagem(error.mensagem);
        return false;
      }
    } catch (error) {
      setMensagem('Erro ao comunicar com o servidor.');
      console.error(error);
      return false;
    }
  };

  // Função para iniciar o aquecimento
  const iniciarAquecimento = async () => {
    const isValid = await validarAquecimento();
    if (!isValid) return;

    let tempoEmSegundos = parseInt(tempo);
    setStatusAquecimento('Aquecimento iniciado');
    setTempoRestante(tempoEmSegundos);
    setIsAquecendo(true);

    const intervalo = setInterval(() => {
      if (tempoEmSegundos > 0) {
        setStringAquecimento('.'.repeat(tempoEmSegundos % potencia));
        tempoEmSegundos--;
      } else {
        clearInterval(intervalo);
        setStatusAquecimento('Aquecimento concluído');
        setStringAquecimento('Aquecimento concluído');
      }
    }, 1000);

    setIntervaloAquecimento(intervalo);
  };

  // Funções de controle de tempo e potência
  const handleTempoChange = (e) => setTempo(e.target.value);
  const handlePotenciaChange = (e) => setPotencia(e.target.value);
  const handleInstrucoesChange = (e) => setStringAquecimento(e.target.value);

  return (
    <div className="microondas">
      <h2>Micro-ondas Digital</h2>

      <div className="status">
        <p>Status: {statusAquecimento}</p>
        <p>{mensagem}</p>
        <p>{stringAquecimento}</p>
      </div>

      <div>
        <label>Tempo (segundos):</label>
        <input
          type="number"
          value={tempo}
          onChange={handleTempoChange}
          min="1"
          max="120"
          placeholder="1-120 segundos"
        />
      </div>

      <div>
        <label>Potência (1-10):</label>
        <input
          type="number"
          value={potencia}
          onChange={handlePotenciaChange}
          min="1"
          max="10"
          placeholder="1-10"
        />
      </div>

      <div>
        <label>Instruções:</label>
        <input
          type="text"
          value={stringAquecimento}
          onChange={handleInstrucoesChange}
          placeholder="Instruções do produto"
        />
      </div>

      <div>
        <button onClick={iniciarAquecimento}>Iniciar Aquecimento</button>
        <button onClick={salvarProduto}>Cadastrar Produto</button>
      </div>

      <div>
        <h3>Produtos Disponíveis</h3>
        {produtos.length > 0 ? (
          produtos.map((produto, index) => (
            <button key={index} onClick={() => selecionarProduto(produto)}>
              {produto.nome}
            </button>
          ))
        ) : (
          <p>Carregando produtos...</p>
        )}
      </div>
    </div>
  );
}

export default Microondas;
