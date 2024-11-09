using MicroondasAPI.Data;
using MicroondasAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace MicroondasAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgramaAquecimentoController : ControllerBase
    {
        private readonly IProgramaAquecimentoRepository _repository;

        public ProgramaAquecimentoController(IProgramaAquecimentoRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public ActionResult GetProgramas()
        {
            var programas = _repository.GetProgramas();
            return Ok(programas);
        }

        [HttpGet("{id}")]
        public ActionResult GetPrograma(int id)
        {
            try
            {
                var programa = _repository.GetProgramaById(id);
                return Ok(programa);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult PostPrograma([FromBody] ProgramaAquecimento programa)
        {
            if (programa == null)
            {
                return BadRequest("Dados inválidos.");
            }

            _repository.AddPrograma(programa);
            return CreatedAtAction(nameof(GetPrograma), new { id = programa.Id }, programa);
        }
    }
}
