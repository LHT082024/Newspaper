using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace Newspaper.Models
{
  //this class is created so that the program can communicate via the database. 
  public class DbContextClass : DbContext
  {
    //constructor for the dbcontext class(a method to create objects of a class)
    public DbContextClass(DbContextOptions<DbContextClass> options)
      : base(options) { }

    //creates tables for the database based of the models
    public DbSet<ProfileModel> profileModels => Set<ProfileModel>();
    public DbSet<ArticleModel> articleModels => Set<ArticleModel>();

  }
}