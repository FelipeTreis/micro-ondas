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
  
  // Programas pré-definidos (permanecem como estão)
  const programasPreDefinidos = [
    // ... seus programas existentes
  ];

  // Função para obter os produtos da API
  useEffect(() => {
    fetch('http://localhost:5186/api/programaaquecimento')
      .then(response => response.json())
      .then(data => {
        setProdutos(data);
      })
      .catch(error => console.error("Erro ao carregar produtos:", error));
  }, []); 

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
              setMensagem(message.mensagem); // Agora estamos acessando a mensagem do JSON
              return true;
          } else {
              const error = await response.json(); // Esperamos um JSON com a chave 'mensagem'
              setMensagem(error.mensagem); // Exibe a mensagem de erro
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
    const isValid = await validarAquecimento(); // Chama a função de validação

    if (!isValid) {
      return; // Interrompe o processo de aquecimento se a validação falhar
    }

    let tempoEmSegundos = parseInt(tempo);
    
    if (tempoEmSegundos > 60 && tempoEmSegundos < 100) {
      const minutos = Math.floor(tempoEmSegundos / 60);
      const segundos = tempoEmSegundos % 60;
      setMensagem(`Aquecendo por: ${minutos}:${segundos < 10 ? '0' + segundos : segundos}`);
    } else {
      setMensagem(`Aquecendo por: ${tempoEmSegundos} segundos`);
    }

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

  // Função para iniciar o aquecimento rápido
  const iniciarAquecimentoRapido = () => {
    setTempo(30); // 30 segundos para aquecimento rápido
    setPotencia(10); // Potência padrão de 10
    setMensagem('Aquecendo por: 30 segundos');
    setStatusAquecimento('Aquecimento rápido iniciado');
    setTempoRestante(30);
    setIsAquecendo(true);

    const intervalo = setInterval(() => {
      if (tempoRestante > 0) {
        setStringAquecimento('.'.repeat(tempoRestante % 10));
        setTempoRestante(tempoRestante - 1);
      } else {
        clearInterval(intervalo);
        setStatusAquecimento('Aquecimento concluído');
        setStringAquecimento('Aquecimento concluído');
      }
    }, 1000);

    setIntervaloAquecimento(intervalo);
  };

  // Função para selecionar programa pré-definido
  const selecionarPrograma = (programa) => {
    setTempo(programa.tempo);
    setPotencia(programa.potencia);
    setMensagem(`Programa selecionado: ${programa.nome}`);
    setStringAquecimento(programa.stringAquecimento);
    setStatusAquecimento('Programa pré-definido iniciado');
  };

  // Função para selecionar um produto da API
  const selecionarProduto = (produto) => {
    setTempo(produto.tempo);
    setPotencia(produto.potencia);
    setMensagem(`Produto selecionado: ${produto.nome}`);
    setStringAquecimento(produto.instrucoes);
    setStatusAquecimento('Aquecimento iniciado com produto');
  };

  // Função para pausar/cancelar o aquecimento
  const pausarOuCancelar = (acao) => {
    if (acao === 'pausar' && isAquecendo) {
      clearInterval(intervaloAquecimento);
      setIsAquecendo(false);
      setStatusAquecimento('Aquecimento pausado');
    } else if (acao === 'cancelar') {
      setTempo('');
      setPotencia('');
      setMensagem('');
      setStatusAquecimento('Aquecimento não iniciado');
      setStringAquecimento('');
      setIsAquecendo(false);
    }
  };

  const handleTempoChange = (e) => {
    setTempo(e.target.value);
  };

  const handlePotenciaChange = (e) => {
    setPotencia(e.target.value);
  };

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
        <button onClick={iniciarAquecimento}>Iniciar Aquecimento</button>
        <button onClick={iniciarAquecimentoRapido}>Iniciar Aquecimento Rápido</button>
        <button className="pausar-btn" onClick={() => pausarOuCancelar('pausar')}>Pausar</button>
        <button className="cancelar-btn" onClick={() => pausarOuCancelar('cancelar')}>Cancelar</button>
      </div>

      <div>
        <h3>Programas Pré-Definidos</h3>
        {programasPreDefinidos.map((programa, index) => (
          <button key={index} onClick={() => selecionarPrograma(programa)}>
            {programa.nome}
          </button>
        ))}
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
