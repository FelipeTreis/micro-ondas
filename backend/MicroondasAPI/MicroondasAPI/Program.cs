using MicroondasAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Registrar o repositório
builder.Services.AddScoped<IProgramaAquecimentoRepository, ProgramaAquecimentoRepository>();

// Habilite o CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowReactApp"); // Use a política de CORS
app.MapControllers();

app.Run();
