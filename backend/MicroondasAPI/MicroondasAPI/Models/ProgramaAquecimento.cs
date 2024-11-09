namespace MicroondasAPI.Models
{
    public class ProgramaAquecimento
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Alimento { get; set; }
        public string? Caractere { get; set; }
        public string? Instrucoes { get; set; }
        public int Potencia { get; set; }
        public int Tempo { get; set; }
    }
}
