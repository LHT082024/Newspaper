using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using Newspaper.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<DbContextClass>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddControllers();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
       {
           options.AddPolicy("AllowAll", builder =>
           {
               builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().WithExposedHeaders("Count-Disposition");
           });
       });

var app = builder.Build();

// makes sure we use swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

}

app.UseStaticFiles();
app.UseDefaultFiles();

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

//this makes sure that when you start the program it opens the swagger page
app.MapGet("/", () => Results.Redirect($"http://localhost:5095/swagger"));
app.MapControllers();

app.Run();
