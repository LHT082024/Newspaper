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
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        //do be able to modify stuff inside the database we use the object created from the
        //dbContext class
        private readonly DbContextClass _context;

        public ProfileController(DbContextClass context)
        {
            _context = context;
        }

        //this method gives us the ability to create profiles
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ProfileModel _profileModel)
        {

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

    }
}