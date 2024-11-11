using Microsoft.EntityFrameworkCore;
using MicroondasAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Adiciona o serviço DbContext com a conexão ao banco de dados (ajuste a string de conexão conforme necessário)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IProgramaAquecimentoRepository, ProgramaAquecimentoRepository>();    

// Adiciona os serviços do controlador
builder.Services.AddControllers();

// Configuração de CORS, se necessário (por exemplo, para permitir requisições do frontend React)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Adiciona outros serviços, como Swagger para documentação da API, se necessário
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Habilita o uso do Swagger na aplicação, se estiver configurado
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Permite o uso do CORS se necessário
app.UseCors("AllowAll");

// Habilita o roteamento
app.MapControllers();

// Inicia a aplicação
app.Run();
