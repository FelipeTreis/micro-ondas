using MicroondasAPI.Models;
using System.Collections.Generic;

namespace MicroondasAPI.Data
{
    public interface IProgramaAquecimentoRepository
    {
        List<ProgramaAquecimento> GetProgramas();
        ProgramaAquecimento GetProgramaById(int id);
        void AddPrograma(ProgramaAquecimento programa);
    }
}
