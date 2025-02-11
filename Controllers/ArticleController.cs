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
    [Route("api/Article")]
    // i begynnelsen bare lag basic crud requests.
    //lag en artikkel også return den i get request så er det good
    public class ArticleController : ControllerBase
    {
        private readonly DbContextClass _context;

        public ArticleController(DbContextClass context)
        {
            _context = context;
        }

        [HttpPost("add-article")]
        public async Task<IActionResult> AddArticle([FromBody] ArticleModel article)
        {
            // Check session for profile type
            var profileType = HttpContext.Session.GetString("ProfileType");

            // If profileType is not "Editor", return Unauthorized
            if (profileType != "Editor")
            {
                return Unauthorized(new { Message = "You must be an editor to add articles." });
            }

            // Ensure the article is not null
            if (article == null)
            {
                return BadRequest("Invalid article data");
            }

            // Assign a default ID of 0 (or let the database handle it depending on your setup)
            article.ID = 0;

            // Add the article to the database
            _context.articleModels.Add(article);

            // Save changes asynchronously
            await _context.SaveChangesAsync();

            // Return a CreatedAtAction response (along with the newly created article)
            return CreatedAtAction(nameof(Get), new { id = article.ID }, article);
        }



        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var article = await _context.articleModels.ToListAsync();
            return Ok(article);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var article = await _context.articleModels.FirstOrDefaultAsync(a => a.ID == id);
            if (article == null)
            {
                return NotFound();
            }
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
        public async Task<IActionResult> Delete(int id)
        {
            var articleToRemove = await _context.articleModels.FindAsync(id);
            if (articleToRemove == null)
            {
                return NotFound($"Article with ID {id} was not found.");
            }

            _context.articleModels.Remove(articleToRemove);
            await _context.SaveChangesAsync();
            return Ok($"Article with ID {id} has been deleted.");
        }
    }
}