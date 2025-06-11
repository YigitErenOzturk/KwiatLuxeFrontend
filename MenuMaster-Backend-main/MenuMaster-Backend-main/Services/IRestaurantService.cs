using MenuMaster.Dtos;
using MenuMaster.Models;
using MenuMaster.Dtos;

namespace MenuMaster.Services
{
    public interface IRestaurantService
    {
        Task<Restaurant> RegisterAsync(RegisterRestaurantDto registerRestaurantDto);
        Task<Restaurant> LoginAsync(LoginDto loginDto);
        Task<bool?> DeleteRestaurantAsync(int restaurantId);
        Task<RestaurantInfoDto?> GetRestaurantByIdAsync(int restaurantId);
    }
}
