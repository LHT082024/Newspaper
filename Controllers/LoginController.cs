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
        // [HttpPost("login")]
        // public IActionResult Login([FromBody] ProfileModel profileModel, DbContextClass _context)
        // {
        //     var user = _context.profileModels.FirstOrDefault(u =>

        // }

    }
}