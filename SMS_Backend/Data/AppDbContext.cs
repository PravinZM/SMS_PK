using Microsoft.EntityFrameworkCore;
using SMS_Backend.Models;

namespace SMS_Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(
            DbContextOptions<AppDbContext> options
        ) : base(options)
        {
        }

        public DbSet<LmsUser> LmsUsers { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Parent> Parents { get; set; }
        public DbSet<StudentParentMapping> StudentParentMappings { get; set; }
        public DbSet<StudentAcademic> StudentAcademics { get; set; }
    }
}