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
    [ApiController]
    [Route("api/Profile")]
    public class ProfileController : ControllerBase
    {
        //to be able to modify stuff inside the database we use the object created from the
        //dbContext class
        private readonly DbContextClass _context;
        // private readonly IHttpContextAccessor _httpContextAccessor;

        public ProfileController(DbContextClass context)
        {
            _context = context;
        }

        // Add user info from sessions to get role
        [HttpGet("user-info")]
        public IActionResult GetUserInfo()
        {
            var userRole = HttpContext.Session.GetString("userRole");

            if (string.IsNullOrEmpty(userRole))
            {
                return Unauthorized(); //If the user isn't logged in or hasn't got a role
            }

            return Ok(new { role = userRole });
        }

        //this method gives us the ability to create profiles
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ProfileModel _profileModel)
        {
            if (_profileModel == null)
            {
                return BadRequest("You took a wrong turn somewhere");
            }

            //starts with setting the id of the profile to a default zero (this can be changed)
            //we then makes sure that the new entry we make goes to the database and follows the
            //Profilemodel, then we save and return a newly created profile
            _profileModel.Id = 0;
            _context.profileModels.Add(_profileModel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = _profileModel.Id }, _profileModel);
        }


        //here we get the profiles from the db table and return it as a list.
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var profile = await _context.profileModels.ToListAsync();
            return Ok(profile);
        }

        //finds profile via id and lets you update it via the profile model class
        //and returns the updated profile to the database
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ProfileModel _Updateprofile)
        {
            var profile = await _context.profileModels.FindAsync(id);
            if (profile == null)
            {
                return NotFound();
            }

            profile.Id = _Updateprofile.Id;
            profile.Name = _Updateprofile.Name;
            profile.Password = _Updateprofile.Password;
            profile.ProfileType = _Updateprofile.ProfileType;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var profile = await _context.profileModels.FindAsync(id);
            if (profile == null)
            {
                return NotFound();
            }

            _context.profileModels.Remove(profile);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // [Authorize(Roles = "Editor")] //Only allows users with 'Editor' role
        // [HttpPost("add-article")]
        // public IActionResult AddArticle([FromBody] Article article)
        // {
        //     return Ok(new { message = "Article added successfully!" });
        // }

    }
}