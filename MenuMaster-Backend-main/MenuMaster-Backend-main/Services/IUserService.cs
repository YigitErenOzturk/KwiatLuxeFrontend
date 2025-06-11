using MenuMaster.Dtos;
using MenuMaster.Models;

namespace MenuMaster.Services
{
    public interface IUserService
    {
        Task<User> RegisterAsync(RegisterDto registerDto);
        Task<User> LoginAsync(LoginDto loginDto);
        Task<User?> UpdateUserAsync(int userId, UpdateUserDto updatedUserDto);
        Task<bool> DeleteUserAsync(int userId);
        Task<UserInfoDto?> GetUserByIdAsync(int userId);
        Task<bool> IsUsernameTakenAsync(string username);
        Task<bool> IsEmailTakenAsync(string email);


    }
}
