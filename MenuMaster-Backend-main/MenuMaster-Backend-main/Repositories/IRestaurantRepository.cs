using MenuMaster.Models;

namespace MenuMaster.Repositories
{
    public interface IRestaurantRepository
    {
        Task AddRestaurantAsync(Restaurant restaurant);
        Task<Restaurant> GetRestaurantByIdAsync(int restaurantId);
        Task<Restaurant> GetRestaurantByEmailAsync(string email);
        Task<bool> DeleteRestaurantAsync(int RestaurantId);
        Task<bool> UpdateRestaurantAsync(Restaurant restaurant);
        Task<bool> EmailExistsAsync(string email);
        Task<bool> RestaurantExistsAsync(string name);
        Task SaveChangesAsync();
    }
}
