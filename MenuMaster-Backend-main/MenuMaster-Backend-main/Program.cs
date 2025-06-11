using MenuMaster.Database;
using MenuMaster.Models;
using MenuMaster.Repositories;
using MenuMaster.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });
        });
       
        builder.Services.AddScoped<IRestaurantService, RestaurantService>();
        builder.Services.AddScoped<IRestaurantRepository, RestaurantRepository>();
        builder.Services.AddScoped<IUserRepository, UserRepository>();
        builder.Services.AddScoped<IUserService, UserService>();    

        builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
        builder.Services.AddScoped<IPasswordHasher<Restaurant>, PasswordHasher<Restaurant>>();

        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", info: new OpenApiInfo
            {
                Title = "MenuMaster API",
                Version = "v1",
                Description = "MenuMaster API Documentation"
            });
        });

        builder.Services.AddControllers();
        builder.WebHost.ConfigureKestrel(serverOptions =>
        {
            serverOptions.Configure(builder.Configuration.GetSection("Kestrel"));
        });

        var app = builder.Build();

            app.UseCors("AllowAll");
       

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();  
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "MenuMaster API v1");  
            });
        }
        app.UseRouting();
        app.MapControllers(); 

        app.Run();
    }
}
