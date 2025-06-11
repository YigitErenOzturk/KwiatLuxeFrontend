using MenuMaster.Database;
using MenuMaster.Models;
using Microsoft.EntityFrameworkCore;

namespace MenuMaster.Repositories
{
    public class RestaurantRepository : IRestaurantRepository
    {
        private readonly ApplicationDbContext _context;
        public RestaurantRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
        public async Task AddRestaurantAsync(Restaurant restaurant)
        {
            _context.Restaurants.Add(restaurant);
            await _context.SaveChangesAsync();
        }
        public async Task<Restaurant> GetRestaurantByIdAsync(int restaurantId)
        {
            return await _context.Restaurants.FindAsync(restaurantId);
        }
        public async Task<Restaurant> GetRestaurantByEmailAsync(string email)
        {
            return await _context.Restaurants.FirstOrDefaultAsync(r => r.Email == email);
        }
        public async Task<bool> DeleteRestaurantAsync(int restaurantId)
        {
            var restaurant = await _context.Restaurants.FindAsync(restaurantId);
            if (restaurant == null) return false;
            _context.Restaurants.Remove(restaurant);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> UpdateRestaurantAsync(Restaurant restaurant)
        {
            _context.Restaurants.Update(restaurant);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _context.Restaurants.AnyAsync(r => r.Email == email);
        }
        public async Task<bool> RestaurantExistsAsync(string name)
        {
            return await _context.Restaurants.AnyAsync(r => r.Name == name);
        }

    }
}
