using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Newspaper.Models;


namespace Newspaper.Controllers
{
    [ApiController]
    [Route("api/Login")]
    public class LoginController : ControllerBase
    {
        //imports databaseContext to the class
        private readonly DbContextClass _context;
        public LoginController(DbContextClass context)
        {
            _context = context;
        }

        //method needed to login. saves profileName and profileType in the session
        [HttpPost("login")]
        public IActionResult Login([FromBody] ProfileModel profileModel)
        {
            var user = _context.profileModels.FirstOrDefault(u =>
            u.Name == profileModel.Name &&
            u.Password == profileModel.Password);

            if (user == null)
            {
                return Unauthorized(new { Message = "Invalid username or password" });
            }
            // Set session values after successful login
            HttpContext.Session.SetString("LoggedInUser", user.Name);
            HttpContext.Session.SetString("ProfilyeType", user.ProfileType);
            HttpContext.Session.SetString("userRole", user.ProfileType);


            return Ok(new { Message = "Login Sucessful", _context = user });
        }

        //Checking who is logged in
        [HttpGet("currentUser")]
        public IActionResult CurrentUser()
        {
            var username = HttpContext.Session.GetString("LoggedInUser");

            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized(new { Message = "No user is logged in" });
            }

            return Ok(new { Message = "current user", User = username });
        }


        //logging out by clearing session memory
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();

            return Ok(new { Message = "You have logged out" });
        }

    }
}