using MicroondasAPI.Data;  // Importa o AppDbContext
using MicroondasAPI.Models; // Certifique-se de que o caminho do modelo Alimento esteja correto
using Microsoft.EntityFrameworkCore;


namespace MicroondasAPI.AlimentoRepository
{
    public class SalvarAlimento
    {
        private readonly AppDbContext _context;

        // Construtor que injeta o contexto do banco de dados (AppDbContext)
        public SalvarAlimento(AppDbContext context)
        {
            _context = context;
        }

        // Método assíncrono para salvar um alimento no banco de dados
        public async Task<bool> SaveAlimentoAsync(Alimento alimento)
        {
            if (alimento == null)
            {
                return false; // Retorna false se o objeto alimento for nulo
            }

            // Adicionando o novo alimento à tabela de Alimentos no banco de dados
            _context.Alimentos.Add(alimento);

            // Salva as alterações no banco de dados
            var result = await _context.SaveChangesAsync();

            // Retorna true se a operação foi bem-sucedida (result > 0 significa que foi salvo)
            return result > 0;
        }
    }
}
