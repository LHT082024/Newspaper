using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace Newspaper.Models
{
    public class DbContextClass : DbContext
    {
        public DbContextClass(DbContextOptions<DbContextClass> options)
          : base(options) { }

        public DbSet<ProfileModel> profileModels => Set<ProfileModel>();
        public DbSet<ArticleModel> articleModels => Set<ArticleModel>();

    }
}