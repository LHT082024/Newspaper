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
        private readonly DbContextClass _context;

        public ProfileController(DbContextClass context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ProfileModel _profileModel)
        {


            _profileModel.Id = 0;
            _context.profileModels.Add(_profileModel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = _profileModel.Id }, _profileModel);
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var profile = await _context.profileModels.ToListAsync();
            return Ok(profile);
        }

    }
}