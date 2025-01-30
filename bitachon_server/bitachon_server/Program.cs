

using bitachon_server.BL;
using bitachon_server.BL.Interface;
using bitachon_server.DAL;
using bitachon_server.DAL.Interface;


var builder = WebApplication.CreateBuilder(args);

// הוספת שירות CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // התאימי ל-Frontend שלך
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>();
builder.Services.AddScoped<IProductsBL, ProductsBL>();
builder.Services.AddScoped<IProductsDAL, ProductsDAL>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigin");

app.UseAuthorization();

app.MapControllers();

app.Run();
