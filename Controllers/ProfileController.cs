using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;
using Newspaper.Models;


namespace Newspaper.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private static List<ProfileModel> profiles = new List<ProfileModel>()
        {
            new ProfileModel {Name = "Testing", Id = 1, Password = "lol2", ProfileType = "Editor"}

        };



        [HttpPost]
        public IActionResult Post([FromBody] ProfileModel _profileModel)
        {

            if (_profileModel == null)
            {
                return BadRequest("something went wrong");
            }

            _profileModel.Id = profiles.Count + 1;
            profiles.Add(_profileModel);

            return CreatedAtAction(nameof(Get), new { id = _profileModel.Id }, profiles);
        }


        [HttpGet]
        public IEnumerable<ProfileModel> Get()
        {
            return profiles;
        }

    }
}