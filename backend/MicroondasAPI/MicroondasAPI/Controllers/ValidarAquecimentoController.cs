using Microsoft.AspNetCore.Mvc;

namespace MicroondasAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MicroondasController : ControllerBase
    {
        [HttpPost("validar")]
        public IActionResult ValidarAquecimento([FromBody] AquecimentoRequest request)
        {
            // Validação de tempo
            if (request.Tempo < 1 || request.Tempo > 120)
            {
                return BadRequest(new { mensagem = "Tempo deve ser entre 1 segundo e 120 segundos." });
            }

            // Validação de potência
            if (request.Potencia < 1 || request.Potencia > 10)
            {
                return BadRequest(new { mensagem = "Potência deve ser entre 1 e 10." });
            }

            return Ok(new { mensagem = "Aquecimento validado com sucesso." });
        }
    }

    public class AquecimentoRequest
    {
        public int Tempo { get; set; }
        public int Potencia { get; set; }
    }
}
