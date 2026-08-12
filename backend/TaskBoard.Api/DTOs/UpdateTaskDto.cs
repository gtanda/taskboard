using TaskBoard.Api.Models;

namespace TaskBoard.Api.DTOs;

public class UpdateTaskDto
{
    public string Title { get; set; }
    public string? Description { get; set; }
    public TaskState State { get; set; }
    public int Position  { get; set; }
}