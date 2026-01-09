
using Microsoft.EntityFrameworkCore;
using Product_Management_Sytem.Application.Interface;
using Product_Management_Sytem.Application.Service;
using Product_Management_Sytem.Persistence.ApplicationDbContext;
using Product_Management_Sytem.Persistence.Interface;
using Product_Management_Sytem.Persistence.Repository;

namespace Product_Management_Sytem
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            #region Database Configuration
            var connectionString = builder.Configuration.GetConnectionString("DefultConnection");

            // Register your DbContext with the connection string
            builder.Services.AddDbContext<ProductDbContext>(options =>
                options.UseSqlServer(connectionString));
            #endregion

            builder.Services.AddScoped<IProductRepository, ProductRepository>();
            builder.Services.AddScoped<IProductService, ProductService>();


            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            #region CORS Configuration
            // Add CORS policy local
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp", policy =>
                {
                    policy
                        .WithOrigins("http://localhost:5173") // React URL
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });
            #endregion

            var app = builder.Build();
            app.UseCors("AllowReactApp");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
