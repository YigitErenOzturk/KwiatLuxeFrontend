using MenuMaster.Dtos;
using MenuMaster.Models;
using MenuMaster.Repositories;
using Microsoft.AspNetCore.Identity;
using MenuMaster.Dtos;
using MenuMaster.Database;

namespace MenuMaster.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context, IUserRepository userRepository, IPasswordHasher<User> passwordHasher)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            _context = context;
        }

        public async Task<User> RegisterAsync(RegisterDto dto)
        {
          if (await _userRepository.EmailExistsAsync(dto.Email))
            {
                throw new Exception("Email already exists");
            }
            if (await _userRepository.UserExistsAsync(dto.Username))
            {
                throw new Exception("Username already exists");
            }

            var user = new User
            {
                Name = dto.Name,
                Username = dto.Username,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                Address = dto.Address,
                CreatedAt = DateTime.UtcNow
            };

            user.PasswordHash = _passwordHasher.HashPassword(user, dto.Password);

            await _userRepository.AddUserAsync(user);
            return user;
        }

        public async Task<User> LoginAsync(LoginDto loginDto)
        {
            var user = await _userRepository.GetUserByUsernameorEmailAsync(loginDto.UsernameOrEmail);

            if (user == null)
            {
                throw new Exception("Invalid username or email");
            }

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, loginDto.Password);

            if (result == PasswordVerificationResult.Failed)
            {
                throw new Exception("Invalid password");
            }
            return user;
        }

        public async Task<User?> UpdateUserAsync(int userId, UpdateUserDto updatedUserDto)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) return null;

            user.Name = updatedUserDto.Name ?? user.Name;
            user.Username = updatedUserDto.Username ?? user.Username;
            user.Email = updatedUserDto.Email ?? user.Email;

           var result = await _userRepository.UpdateAsync(user);
            if (!result) return null;
            return user;
        }
        public async Task<bool> DeleteUserAsync(int userId)
        {
            return await _userRepository.DeleteAsync(userId);
        }

        public async Task<UserInfoDto?> GetUserByIdAsync(int userId)
        {
            var user = await _userRepository.GetByIdAsync(userId); 
            if (user == null) return null; 

            var userInfoDto = new UserInfoDto
            {
                Name = user.Name,
                Username = user.Username,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Address = user.Address,
                CreatedDate = user.CreatedAt
            };

            return userInfoDto;
        }
        public async Task<bool> IsUsernameTakenAsync(string username)
        {
            return await _userRepository.UserExistsAsync(username);
        }
        public async Task<bool> IsEmailTakenAsync(string email)
        {
            return await _userRepository.EmailExistsAsync(email);
        }
    }

}
