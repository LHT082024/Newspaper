var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// makes sure we use swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

}

app.UseHttpsRedirection();

app.UseAuthorization();

//this makes sure that when you start the program it opens the swagger page
app.MapGet("/", () => Results.Redirect($"http://localhost:5095/swagger"));
app.MapControllers();

app.Run();
