using MenuMaster.Dtos;
using MenuMaster.Models;

namespace MenuMaster.Repositories
{
    public interface IUserRepository
    {
        Task AddUserAsync(User user);
        Task<User?> GetByIdAsync(int userId);
        Task<User?> GetByUsernameAsync(string username);
        Task<User> GetUserByUsernameorEmailAsync(string username);
        Task<bool> DeleteAsync(int userId);
        Task<bool> UpdateAsync(User user);
        Task<bool> UserExistsAsync(string username);
        Task<bool> EmailExistsAsync(string email);
        Task SaveChangesAsync();

    }
}
