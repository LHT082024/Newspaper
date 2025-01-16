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

        [HttpGet]
        public IActionResult GetAllProfiles()
        {
            return Ok(profiles);
        }

        [HttpPost]
        public IActionResult CreateProfiles(ProfileModel profileModel)
        {
            if (profiles.Exists(p => p.Id == profileModel.Id))
            {
                return Conflict($"A profile with ID {profileModel.Id} already exists.");
            }

            if (profiles == null)
            {
                profiles = new List<ProfileModel>();
            }

            profiles.Add(profileModel);
            return CreatedAtAction(nameof(GetAllProfiles), new
            {
                name = profileModel.Name,
                id = profileModel.Id,
                password = profileModel.Password,
                profileModel.ProfileType
            }, profileModel);
        }

    }
}