using MicroondasAPI.Models;
using System.Collections.Generic;
using System.Linq;

namespace MicroondasAPI.Data
{
    public class ProgramaAquecimentoRepository : IProgramaAquecimentoRepository
    {
        private static List<ProgramaAquecimento> programas = new List<ProgramaAquecimento>
        {
            new ProgramaAquecimento { Id = 1, Nome = "Pipoca", Alimento = "Pipoca (de micro-ondas)", Potencia = 7, Caractere = ".....", Tempo = 180, Instrucoes = "Observar o barulho de estouros do milho, caso houver um intervalo de mais de 10 segundos entre um estouro e outro, interrompa o aquecimento." },
            new ProgramaAquecimento { Id = 2, Nome = "Leite", Alimento = "Leite", Potencia = 5, Caractere = ".....", Tempo = 300, Instrucoes = "Cuidado com aquecimento de líquidos, o choque térmico aliado ao movimento do recipiente pode causar fervura imediata causando risco de queimaduras." },
            new ProgramaAquecimento { Id = 3, Nome = "Carnes de boi", Alimento = "Carne em pedaço ou fatias", Potencia = 4, Caractere = ".....", Tempo = 840, Instrucoes = "Interrompa o processo na metade e vire o conteúdo com a parte de baixo para cima para o descongelamento uniforme." },
            new ProgramaAquecimento { Id = 4, Nome = "Frango", Alimento = "Frango (qualquer corte)", Potencia = 7, Caractere = ".....", Tempo = 480, Instrucoes = "Interrompa o processo na metade e vire o conteúdo com a parte de baixo para cima para o descongelamento uniforme." },
            new ProgramaAquecimento { Id = 5, Nome = "Feijão", Alimento = "Feijão congelado", Potencia = 9, Caractere = ".....", Tempo = 480, Instrucoes = "Deixe o recipiente destampado e em casos de plástico, cuidado ao retirar o recipiente pois o mesmo pode perder resistência em altas temperaturas." }
        };

        public List<ProgramaAquecimento> GetProgramas() => programas;

        public ProgramaAquecimento GetProgramaById(int id)
        {
            var programa = programas.FirstOrDefault(p => p.Id == id);
            if (programa == null)
            {
                throw new KeyNotFoundException($"Programa com ID {id} não encontrado.");
            }
            return programa;
        }

        public void AddPrograma(ProgramaAquecimento programa) => programas.Add(programa);
    }
}
