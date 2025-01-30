    using Microsoft.EntityFrameworkCore;

namespace bitachon_server.DAL
{

    public class AppDbContext : DbContext
    {
       
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductsCategory> Categories { get; set; }
        private readonly IConfiguration _configuration;

        public AppDbContext(DbContextOptions<AppDbContext> options, IConfiguration configuration)
            : base(options)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var connectionString = _configuration.GetConnectionString("DefaultConnection");
                optionsBuilder.UseSqlServer(connectionString);
            }
        }
       
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .HasOne(p => p.ProductsCategory) 
                .WithMany(c => c.Products) 
                .HasForeignKey(p => p.CategoryId) 
                .OnDelete(DeleteBehavior.Cascade); 
        }
    }

}
