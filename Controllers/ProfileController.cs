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
    public class ProfileController : Controller
    {
        List<ProfileModel> profiles = new List<ProfileModel>()
        {
            new ProfileModel {Name = "Testing", Id = 1, Password = "lol2", ProfileType = "Editor"}

        };


        [HttpGet]
        public IActionResult GetAllProfiles()
        {
            return Ok(profiles);
        }
        [HttpPost]
        public IActionResult CreateProfiles([FromBody] ProfileModel _profileModel)
        {

            if (profiles == null)
            {
                return BadRequest("something went wrong");
            }
            _profileModel.Id = profiles.Count + 1;
            profiles.Add(_profileModel);
            return CreatedAtAction(nameof(GetAllProfiles), new
            {
                name = _profileModel.Name,
                id = _profileModel.Id,
                password = _profileModel.Password,
                _profileModel.ProfileType
            }, _profileModel);
        }

    }
}