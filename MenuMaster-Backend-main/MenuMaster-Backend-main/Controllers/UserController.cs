using Microsoft.AspNetCore.Mvc;
using MenuMaster.Services;
using MenuMaster.Dtos;
using Microsoft.Identity.Client;
using MenuMaster.Models;  

namespace MenuMaster.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // POST api/user/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if (registerDto == null)
                return BadRequest("Invalid data");

            try
            {
                var user = await _userService.RegisterAsync(registerDto);
                return Ok(new { Message = "User registered successfully"});
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // POST api/user/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var user = await _userService.LoginAsync(loginDto);
                return Ok(new { Message = "successfully login" });
            }
            catch (Exception ex)
            {
                return Unauthorized(new { Message = ex.Message });
            }
        }
        // PUT api/user/update
        [HttpPut("update/{userId}")]
        public async Task<IActionResult> UpdateUser(int userId, [FromBody] UpdateUserDto updatedUserDto)
        {
           var updatedUser = await _userService.UpdateUserAsync(userId, updatedUserDto);
            if (updatedUser == null)
            {
                return NotFound("User not found");
            }
            return Ok(updatedUser);
        }
        // DELETE api/user/{userId}
        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            var result = await _userService.DeleteUserAsync(userId);
            if (!result) return NotFound("User not found");
            
            return Ok("User deleted successfully");
        }

        // GET api/user/{userId}
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserById(int userId)
        {
            var userInfo = await _userService.GetUserByIdAsync(userId);
            if (userInfo == null)
            {
                return NotFound("User not found");
            }
            return Ok(userInfo);
        }

    }
}
