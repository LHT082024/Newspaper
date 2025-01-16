using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Newspaper.Models;

namespace Newspaper.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    // i begynnelsen bare lag basic crud requests.
    //lag en artikkel også return den i get request så er det good
    public class ArticleController : ControllerBase
    {
        private static List<ArticleModel> articles = new List<ArticleModel>()
        {
            new ArticleModel{
                ID = 1,
                Tier = 1,
                Headline = "Ten reasons why Illuminati exists and will steal your jobs",
                Story =
                " The Illuminati is always looking for a way to stel your jobs, and with the launch of AI, they have developed to another level. Here are the top ten reasons for how the Illuminati will steal your jobs. 1. Illuminati is always watching, 2. They see when you are sleeping, 3. They know when you're awake, 4.AI caan do everything you can do better, 5. They will steal your life, 6. Illuminati wants total control, 7. Your job isn't actually real, 8. Nothing in society is real, 9. You cannot escape, 10.Tough luck, Those are the 10 top reasons of why Illuminati will steal your job. Naturlly we cannot let that happen, so you need to work even harder and have even less of a life so that they won't steal your job. Good luck."

            }
        };

        [HttpPost]
        public IActionResult Post([FromBody] ArticleModel _articles)
        {
            if (_articles == null)
            {
                return BadRequest("You took a wrong turn somewhere");
            }
            _articles.ID = articles.Count + 1;
            articles.Add(_articles);

            return CreatedAtAction(nameof(Get), new { id = _articles.ID }, articles);
        }

        [HttpGet]
        public IEnumerable<ArticleModel> Get()
        {
            return articles;
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] ArticleModel updatedArticle)
        {
            var existingArticle = articles.FirstOrDefault(a => a.ID == id);

            if (existingArticle == null)
            {
                return NotFound($"The article with ID {id} was not found.");
            }

            //Update the article's values
            existingArticle.Tier = updatedArticle.Tier;
            existingArticle.Headline = updatedArticle.Headline;
            existingArticle.Story = updatedArticle.Story;

            return Ok(existingArticle);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var articleToRemove = articles.FirstOrDefault(app => app.ID == id);

            if (articleToRemove == null)
            {
                return NotFound($"Article with ID {id} was not found.");
            }

            articles.Remove(articleToRemove);
            return Ok($"Article with ID {id} has been deleted.");
        }
    }
}