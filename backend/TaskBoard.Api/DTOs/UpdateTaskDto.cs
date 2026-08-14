using System.ComponentModel.DataAnnotations;
using TaskBoard.Api.Models;

namespace TaskBoard.Api.DTOs;

public class UpdateTaskDto
{
    [Required]
    [MaxLength(50)]
    public string Title { get; set; }
    [MaxLength(500)]
    public string? Description { get; set; }
    [EnumDataType(typeof(TaskState))]
    [Range(0, int.MaxValue)]
    public TaskState State { get; set; }
    [Range(0, int.MaxValue)]
    public int Position  { get; set; }
}