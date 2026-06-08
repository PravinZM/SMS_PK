using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SMS_Backend.Data;
using SMS_Backend.DTOs;

namespace SMS_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _context.LmsUsers
                .FirstOrDefaultAsync(x =>
                    x.email == dto.email &&
                    x.password == dto.password &&
                    x.is_deleted == false);

            if (user == null)
            {
                return Unauthorized("Invalid Login");
            }

            return Ok(new
            {
                user.full_name,
                user.email,
                user.role_name
            });
        }
    }
}