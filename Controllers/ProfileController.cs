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
    public class ProfileController : ControllerBase
    {
        List<ProfileModel> profiles = new List<ProfileModel>()
        {
            new ProfileModel {Name = "Testing", Id = 1, Password = "lol2", ProfileType = "Editor"}

        };

        [HttpGet("List of profiles")]
        public async Task<IActionResult> GetAllProifles()
        {
            return Ok(profiles);
        }

    }
}