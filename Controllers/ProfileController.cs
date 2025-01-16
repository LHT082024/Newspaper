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
        ProfileModel profileModel = new ProfileModel();
        List<ProfileModel> profiles = new List<ProfileModel>()
        {
            new ProfileModel {Name = "Testing", Id = 1, Password = "lol2", ProfileType = "Editor"}

        };

        [HttpGet]
        public IActionResult GetAllProifles()
        {
            return Ok(profiles);
        }

        [HttpPost]
        public IActionResult CreateProfile()
        {
            return CreatedAtAction(nameof(GetAllProifles), new
            {
                name = profileModel.Name,
                id = profileModel.Id,
                password = profileModel.Password,
                profileModel
            .ProfileType
            }, profileModel);
        }

    }
}