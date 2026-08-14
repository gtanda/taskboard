using System.ComponentModel.DataAnnotations;
using TaskBoard.Api.Models;

namespace TaskBoard.Api.DTOs;

public class TaskReorderDto
{
    [Required]
    public Guid TaskId { get; set; }
    [Range(0, int.MaxValue)]
    public int NewPosition { get; set; }
    
    [EnumDataType(typeof(TaskState))]
    public TaskState NewState { get; set; }
}