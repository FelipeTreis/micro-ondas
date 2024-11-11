using Microsoft.EntityFrameworkCore;

namespace MicroondasAPI.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Alimento> Alimentos { get; set; }
        // Outras DbSets para outras entidades

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
