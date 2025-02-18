using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using Newspaper.Models;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<DbContextClass>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddControllers();




//use session based saving so that when you login its saved in cookies
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(Options =>
{
    Options.IdleTimeout = TimeSpan.FromMinutes(30);
    Options.Cookie.HttpOnly = true;
    Options.Cookie.IsEssential = true;
});


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
       {
           options.AddPolicy("AllowAll", builder =>
           {
               builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().WithExposedHeaders("Count-Disposition");
           });
       });

builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
            });
        });

var app = builder.Build();

// makes sure we use swagger
if (app.Environment.IsDevelopment())
{
    app.UseSession();
    app.UseSwagger();
    app.UseSwaggerUI();

}

// app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "Frontend")),
    RequestPath = ""
});

app.UseCors(policy =>
        policy.WithOrigins("http://localhost:5500") // Allow requests from the frontend
          .AllowAnyHeader()
          .AllowAnyMethod());


app.UseDefaultFiles();

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

//this makes sure that when you start the program it opens the swagger page
app.MapGet("/", () => Results.Redirect($"http://localhost:5095/index.html"));
app.MapControllers();

app.Run();
