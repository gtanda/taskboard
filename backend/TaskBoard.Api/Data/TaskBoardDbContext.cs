using Microsoft.EntityFrameworkCore;
using TaskBoard.Api.Models;

namespace TaskBoard.Api.Data;

public class TaskBoardDbContext : DbContext
{
    public DbSet<Project> Projects { get; set; }
    public DbSet<TaskItem> TaskItems { get; set; }
    
    public TaskBoardDbContext(DbContextOptions<TaskBoardDbContext> options) : base(options)
    {
    }
}