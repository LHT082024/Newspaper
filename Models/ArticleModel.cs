using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Newspaper.Models
{
    public class ArticleModel
    {
        public int Tier { get; set; }
        public string Headline { get; set; }
        public string Story { get; set; }
        public int ID { get; set; }
    }
}