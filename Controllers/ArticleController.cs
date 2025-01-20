using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;
using Newspaper.Models;
using Microsoft.EntityFrameworkCore;

namespace Newspaper.Controllers
{
    // i begynnelsen bare lag basic crud requests.
    [ApiController]
    [Route("api/[controller]")]
    // i begynnelsen bare lag basic crud requests.
    //lag en artikkel også return den i get request så er det good
    public class ArticleController : ControllerBase
    {
        private readonly DbContextClass _context;

        public ArticleController(DbContextClass context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ArticleModel _articles)
        {
            if (_articles == null)
            {
                return BadRequest("You took a wrong turn somewhere");
            }
            _articles.ID = 0;
            _context.articleModels.Add(_articles);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = _articles.ID }, _articles);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var article = await _context.articleModels.ToListAsync();
            return Ok(article);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ArticleModel _updatedArticle)
        {
            var existingArticle = await _context.articleModels.FindAsync(id);
            if (existingArticle == null)
            {
                return NotFound($"The article with ID {id} was not found.");
            }

            //Update the article's values
            existingArticle.Tier = _updatedArticle.Tier;
            existingArticle.Headline = _updatedArticle.Headline;
            existingArticle.Story = _updatedArticle.Story;

            await _context.SaveChangesAsync();
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