using MenuMaster.Database;
using MenuMaster.Dtos;
using MenuMaster.Models;
using MenuMaster.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace MenuMaster.Services
{
    public class RestaurantService : IRestaurantService
    {
        private readonly IPasswordHasher<Restaurant> _passwordHasher;
        private readonly IRestaurantRepository _restaurantRepository;
        private readonly ApplicationDbContext _context;

        public RestaurantService(ApplicationDbContext context, IRestaurantRepository restaurantRepository, IPasswordHasher<Restaurant> passwordHasher)
        {
            _restaurantRepository = restaurantRepository;
            _passwordHasher = passwordHasher;
            //_context = context;
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Restaurant> RegisterAsync(RegisterRestaurantDto dto)
        {

            if (await _restaurantRepository.EmailExistsAsync(dto.Email))
            {
                throw new Exception("Email already exists");
            }
            if (await _restaurantRepository.RestaurantExistsAsync(dto.Name))
            {
                throw new Exception("Restaurant Name already exists");
            }

            var restaurant = new Restaurant
                {
                    Name = dto.Name,
                    Email = dto.Email,
                    PhoneNumber = dto.PhoneNumber,
                    Location = dto.Location,
                    Description = dto.Description,
                    ImageUrl = dto.ImageUrl,
                    CreatedAt = DateTime.UtcNow
                };
                restaurant.PasswordHash = _passwordHasher.HashPassword(restaurant, dto.Password);
                await _restaurantRepository.AddRestaurantAsync(restaurant);
                return restaurant;
                
        }
        public async Task<Restaurant> LoginAsync(LoginDto loginDto)
        {
            var restaurant = await _restaurantRepository.GetRestaurantByEmailAsync(loginDto.UsernameOrEmail);
            if (restaurant == null)
            {
                throw new Exception("Invalid email");
            }
            var result = _passwordHasher.VerifyHashedPassword(restaurant, restaurant.PasswordHash, loginDto.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                throw new Exception("Invalid password");
            }
            return restaurant;
        }
        public async Task<RestaurantInfoDto?> GetRestaurantByIdAsync(int restaurantId)
        {
            var restaurant = await _restaurantRepository.GetRestaurantByIdAsync(restaurantId);
            if (restaurant == null) return null;
            
            var RestaurantInfoDto = new RestaurantInfoDto
            {             
                Name = restaurant.Name,
                Email = restaurant.Email,
                PhoneNumber = restaurant.PhoneNumber,
                Location = restaurant.Location,
                Description = restaurant.Description,
                ImageUrl = restaurant.ImageUrl,
                CreatedAt = restaurant.CreatedAt
            };
            return RestaurantInfoDto;
        }
        public async Task<bool?> DeleteRestaurantAsync(int restaurantId)
        {
            return await _restaurantRepository.DeleteRestaurantAsync(restaurantId);
        }
        public async Task<Restaurant> IsEmailTakenAsync(string email)
        {
            return await _restaurantRepository.GetRestaurantByEmailAsync(email);
        }

    }
}
