using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Newspaper.Models;


namespace Newspaper.Controllers
{
    public class LoginController : ControllerBase
    {
        private readonly DbContextClass _context;

        public LoginController(DbContextClass context)
        {
            _context = context;
        }

        //method needed to login
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
            HttpContext.Session.SetString("LoggedInUser", user.Name);

            return Ok(new { Message = "Login Sucessful", _context = user });
        }

    }
}