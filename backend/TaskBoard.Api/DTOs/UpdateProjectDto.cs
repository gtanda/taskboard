using System.ComponentModel.DataAnnotations;

namespace TaskBoard.Api.DTOs;

public class UpdateProjectDto
{
    [Required]
    [MaxLength(50)]
    public string Title { get; set; }
    [MaxLength(500)]
    public string? Description { get; set; }
}