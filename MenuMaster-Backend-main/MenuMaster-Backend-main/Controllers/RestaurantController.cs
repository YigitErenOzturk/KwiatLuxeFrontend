using MenuMaster.Services;
using Microsoft.AspNetCore.Mvc;
using MenuMaster.Dtos;

namespace MenuMaster.Controllers
{
    [ApiController]
    [Route("api/restaurants")]
    public class RestaurantController : ControllerBase
    {
        private readonly IRestaurantService _restaurantService;
        public RestaurantController(IRestaurantService restaurantService)
        {
            _restaurantService = restaurantService;
        }
        //post api/restaurant/register
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterRestaurantDto registerRestaurantDto)
        {
            if (registerRestaurantDto == null)
                return BadRequest("Invalid data");
            if (string.IsNullOrEmpty(registerRestaurantDto.ImageUrl))
            {
                registerRestaurantDto.ImageUrl = "default_image_url.jpg";
            }               
            try
            {
                var restaurant = await _restaurantService.RegisterAsync(registerRestaurantDto);
                return Ok(new { Message = "Restaurant registered successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            
        }

        //post api/restaurant/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var restaurant = await _restaurantService.LoginAsync(loginDto);
                return Ok(new { Message = "successfully login" });
            }
            catch (Exception ex)
            {
                return Unauthorized(new { Message = ex.Message });
            }
        }
        //get api/restaurant/{restaurantId}
        [HttpGet("{restaurantId}")]
        public async Task<IActionResult> GetRestaurantById(int restaurantId)
        {
            var restaurant = await _restaurantService.GetRestaurantByIdAsync(restaurantId);
            if (restaurant == null)
                return NotFound("Restaurant not found");
            return Ok(restaurant);
        }
    }
}
