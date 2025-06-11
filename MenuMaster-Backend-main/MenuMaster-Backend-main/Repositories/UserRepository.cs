using Microsoft.AspNetCore.Identity;
using MenuMaster.Database;
using MenuMaster.Models;
using Microsoft.EntityFrameworkCore;

namespace MenuMaster.Repositories
{
    public class UserRepository : IUserRepository
    {
       private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task AddUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }
        public async Task<bool> DeleteAsync(int UserId)
        {
            var user = await _context.Users.FindAsync(UserId);
            if (user == null) return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> UpdateAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<User?> GetByIdAsync(int UserId)
        {
            return await _context.Users.FindAsync(UserId);
        }
        public async Task<User?> GetByUsernameAsync(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        }
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
        public async Task<User> GetUserByUsernameorEmailAsync(string usernameOrEmail)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Username == usernameOrEmail || u.Email == usernameOrEmail);
        }
        public async Task<bool> UserExistsAsync(string username)
        {
            return await _context.Users.AnyAsync(u => u.Username == username);
        }
        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }
    } 
}
