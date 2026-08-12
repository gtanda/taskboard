using TaskBoard.Api.Models;

namespace TaskBoard.Api.DTOs;

public class TaskItemDto
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public TaskState State { get; set; }
    public DateTime Created { get; set; }
    public int Position  { get; set; }
    public Guid ProjectId { get; set; }
}